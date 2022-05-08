from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'database': 'proyecto2Arqui2',
    'raise_on_warnings': True
}


@app.route("/insertarTiempo", methods=["POST"])
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
        return jsonify({"estado": 0})

    return jsonify({"esado": 1})


@app.route("/insertarDatos", methods=["POST"])
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
            return jsonify({"estado": 0})

    return jsonify({"estado": 1})


@app.route('/getData/<queryType>', methods=["GET"])
def getData(queryType=None):
    date = []
    data = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)
        if queryType == "Recolectado":
            query = """SELECT ROUND((S.metano-D.metano), 2) AS Recolectada, S.Fecha FROM (SELECT id, metano, 
                        DATE_FORMAT(fecha, "%d-%m-%y %H:%i:%s") AS Fecha FROM Data ORDER BY id DESC LIMIT 15) S, medidas
                         D WHERE (S.id - 1) = D.id ORDER BY S.id ASC;"""
        elif queryType == "Tiempo":
            query = """SELECT uso as Tiempo, Fecha FROM (SELECT id, uso, DATE_FORMAT(fecha, "%d-%m-%y %H:%i:%s") AS Fecha FROM 
            tiempos ORDER BY id DESC LIMIT 15) s ORDER BY id ASC;"""
        else:
            query = """SELECT {}, Fecha FROM (SELECT id, {}, DATE_FORMAT(fecha, "%d-%m-%y %H:%i:%s") AS Fecha FROM 
            medidas ORDER BY Id DESC LIMIT 15) s ORDER BY id ASC;""".format(queryType, queryType)

        cursor.execute(query)
        for row in cursor:
            date.append(row['Fecha'])
            data.append(row[queryType])

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify({'Date': date, 'Data': data})


@app.route('/getDates', methods=['GET'])
def getDates():
    dates = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = "SELECT DISTINCT CAST(fecha AS date) AS Fecha FROM medidas;"

        cursor.execute(query)
        for row in cursor:
            dates.append(row['Fecha'].strftime('%y-%m-%d'))

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify({'Dates': dates})


@app.route('/getDataByDate/<dateInput>', methods=['GET'])
def getDataByDate(dateInput=None):
    data = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """SELECT Temperatura, Metano, DATE_FORMAT(Fecha, "%H:%i:%s") AS Hora FROM medidas WHERE 
        CAST(fecha AS date) = CAST("{}" AS date);""".format(dateInput)

        cursor.execute(query)
        for row in cursor:
            data.append(row)

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify({'Data': data})


@app.route('/getLast', methods=['GET'])
def getLast():
    data = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """SELECT Temperatura, Metano FROM medidas ORDER BY id DESC LIMIT 1;"""

        cursor.execute(query)
        for row in cursor:
            data.append(row)

        cursor.close()
        cnx.commit()
        cnx.close()

    except mysql.connector.Error as err:
        print(err)
        return jsonify([])

    return jsonify({'Data': data})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3010)

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
