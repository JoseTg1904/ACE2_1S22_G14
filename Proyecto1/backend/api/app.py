from crypt import methods
from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv(find_dotenv())

config = {
    'user': 'root',
    'password': 'root1234',
    'host': 'localhost',
    'database': 'Proyecto1',
    'raise_on_warnings': True
}

@app.route("/insertarDatos", methods=["POST"])
def insertarDatos():
    datos = request.json
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()

        query = ("insert into Data" 
        "(Antes, Despues, Humedad, Agua, Fecha)" 
        "values ({}, {}, {}, {}, STR_TO_DATE(\"{}\",'%d/%m/%Y %H:%i:%s'))").format(datos["entrada"], datos["salida"], datos["humedad"], datos["lleno"], datos["fecha"])
        cursor.execute(query)
    
        cursor.close()
        cnx.commit()
        cnx.close()
    except mysql.connector.Error as err:
        print(err)
        return jsonify({ "estado": 0 })

    return jsonify({ "estado": 1 })

@app.route('/getData/<queryType>', methods=["GET"])
def getData(queryType=None):
    date = []
    data = []
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor(dictionary=True)

        query = """SELECT {}, Fecha FROM (SELECT Id, {}, DATE_FORMAT(Fecha, "%H:%i:%s") AS Fecha FROM Data 
        ORDER BY Id DESC LIMIT 10) s ORDER BY Id ASC;""".format(queryType, queryType)

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


if __name__ == '__main__':
    app.run()

'''
CREATE DATABASE Proyecto1;

USE Proyecto1;

CREATE TABLE Data (
  Id INT NOT NULL AUTO_INCREMENT,
  Antes FLOAT NULL,
  Despues FLOAT NULL,
  Humedad FLOAT NULL,
  Agua FLOAT NULL,
  Fecha DATETIME NULL,
  PRIMARY KEY (`Id`)
);
  
SELECT Antes, Fecha FROM (SELECT Id, Antes, DATE_FORMAT(Fecha, "%H:%i:%s") AS Fecha 
    FROM Data ORDER BY Id DESC IMIT 10) s ORDER BY Id ASC;
'''
