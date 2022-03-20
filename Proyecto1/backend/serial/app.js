
const SerialPort = require("serialport");
const fetch = require('node-fetch');
const ReadLine = require("@serialport/parser-readline");

//cambiar el com3 por el de la maquina
const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));

port.on("open", () => {
	console.log("conexion exitosa con el serial");
});

parser.on("data", async (data) => {
    let now = new Date();
    let fecha = "" + now.getDate() + "/" + (now.getMonth() + 1) + "/" +  now.getFullYear()
    fecha += " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    data.fecha = fecha
    
    await fetch("http://34.125.68.76:5000/insertarDatos", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(json => console.log(json))
});