from crypt import methods
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

config = {
    'user': 'root',
    'password': 'root1234',
    'host': 'localhost',
    'database': 'proyecto2Arqui2',
    'raise_on_warnings': True
}

@app.route("/insertarTiempo", methods = ["POST"])
def insertarTiempo():
    datos = request.json
    print(datos)
    inicio = datetime.strptime(datos['inicia'], '%d/%m/%Y %H:%M:%S')
    fin = datetime.strptime(datos['finaliza'], '%d/%m/%Y %H:%M:%S')

    diferencia = fin - inicio
    diferencia = diferencia.total_seconds()
    print(diferencia)

    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()

        query = ("insert into tiempos"
        "(uso, fecha) values ({}, STR_TO_DATE(\"{}\",'%d/%m/%Y %H:%i:%s'))"
        ).format(diferencia, datos['medido'])
        print(query)

        cursor.execute(query)

        cursor.close()
        cnx.commit()
        cnx.close()
    except mysql.connector.Error as err:
        print(err)
        return jsonify({ "estado": 0 })
    
    return jsonify({ "esado": 1 })

@app.route("/insertarDatos", methods = ["POST"])
def insertarDatos():
    datos = request.json
    if datos['medidas'] != "":
        try:
            medidas = datos['medidas'].split("|")
            cnx = mysql.connector.connect(**config)
            cursor = cnx.cursor()
            
            query = ("insert into medidas" 
            "(temperatura, metano, fecha)" 
            "values ({}, {}, STR_TO_DATE(\"{}\",'%d/%m/%Y %H:%i:%s'))"
            ).format(medidas[0], medidas[1], datos["fecha"])
            
            print(query)

            cursor.execute(query)
        
            cursor.close()
            cnx.commit()
            cnx.close()
        except mysql.connector.Error as err:
            print(err)
            return jsonify({ "estado": 0 })

    return jsonify({ "estado": 1 })

@app.route("/obtenerMetricas", methods = ["GET"])
def obtenerMetricas():
    metrica = {
        "temperatura1": 0,
        "temperatura2": 0,
        "humedad": 0,
        "lumens": 0,
        "co2": 0
    }

    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """select * from medidas order by fecha desc limit 1"""

        cursor.execute(query)
        for row in cursor:
            metrica = {
                "temperatura1": row["temperatura1"],
                "temperatura2": row["temperatura2"],
                "humedad": row["humedad"],
                "lumens": row["lumens"],
                "co2": row["co2"],
            }

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify(metrica)

    return jsonify(metrica)

@app.route("/grafica1", methods = ["GET"])
def grafica1():
    metricas = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """select avg(temperatura1) as afuera, 
        avg(temperatura2) as adentro, date(fecha) as fecha 
        from medidas group by date(fecha) order by date(fecha)"""

        cursor.execute(query)
        for row in cursor:
            metricas.append(row)

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify(metricas)

@app.route("/grafica2", methods = ["GET"])
def grafica2():
    metricas = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """select avg(temperatura2) as adentro, 
        avg(humedad) as humedad, date(fecha) as fecha from medidas 
        group by date(fecha) order by date(fecha)"""

        cursor.execute(query)
        for row in cursor:
            metricas.append(row)

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify(metricas)

@app.route("/grafica3", methods = ["GET"])
def grafica3():
    metricas = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """select avg(temperatura2) as adentro, 
        avg(lumens) as clima, date(fecha) as fecha from medidas 
        group by date(fecha) order by date(fecha)"""

        cursor.execute(query)
        for row in cursor:
            metricas.append(row)

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify(metricas)

@app.route("/grafica4", methods = ["GET"])
def grafica4():
    metricas = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """select avg(humedad) as humedad, 
        avg(co2) as aire, date(fecha) as fecha from medidas 
        group by date(fecha) order by date(fecha)"""

        cursor.execute(query)
        for row in cursor:
            metricas.append(row)

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify(metricas)

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 3010)

"""
create table tiempos (
    id int auto_increment,
    uso float,
    fecha datetime,
    primary key(id)
);

create table medidas ( 
    id int auto_increment, 
    temperatura float, 
    metano float,
    fecha datetime, 
    primary key(id) 
);
"""