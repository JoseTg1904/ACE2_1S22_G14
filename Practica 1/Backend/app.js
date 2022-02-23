
const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");

//cambiar el com3 por el de la maquina
const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));

port.on("open", () => {
	console.log("conexion exitosa con el serial");
});

parser.on("data", (data) => {
	console.log("data recibida del arduino en string", data);
    let entrada = JSON.stringify(data);
    console.log("data recibida del arduino en json", entrada);
});