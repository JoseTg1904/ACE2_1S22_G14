from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

config = {
    'user': 'root',
    'password': 'root1234',
    'host': 'localhost',
    'database': 'practica1Arqui2',
    'raise_on_warnings': True
}

@app.route("/insertarDatos", methods = ["POST"])
def insertarDatos():
    datos = request.json
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        
        query = ("insert into medidas" 
        "(temperatura1, temperatura2, humedad, lumens, co2, fecha)" 
        "values ({}, {}, {}, {}, {}, STR_TO_DATE(\"{}\",'%d/%m/%Y %H:%i:%s'))").format(datos["temperatura1"], datos["temperatura2"], datos["humedad"], datos["lumens"], datos["co2"], datos["fecha"])
        
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

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 3010)

"""
create table medidas ( 
    id int auto_increment, 
    temperatura1 float, 
    temperatura2 float, 
    humedad float, 
    lumens float, 
    co2 float, 
    fecha datetime, 
    primary key(id) 
);
"""