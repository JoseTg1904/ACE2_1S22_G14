#include <SoftwareSerial.h>
#include <Stepper.h>

#define RLOAD 10.0
#define PARA 116.6020682
#define PARB 2.769034857
#define RZERO 76.63
#define steps 100

SoftwareSerial BT(2, 3); //rx, tx
Stepper stepper(steps, 6, 7, 8, 9);
Stepper stepperR(steps, 9, 8, 7, 6);
const int pinCO2 = A1;
const int pinTemperatura = A0;
const int pinChispero = 5;

//String lectura = "";

void setup() {
  Serial.begin(9600);
  BT.begin(9600);
  pinMode(pinTemperatura, INPUT);
  pinMode(pinCO2, INPUT);
  pinMode(pinChispero, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char lectura = Serial.read();
    BT.print(lectura);
    if (lectura == '0') { digitalWrite(pinChispero, LOW); } 
    else if (lectura == '1') { digitalWrite(pinChispero, HIGH); } 
    else if (lectura == '2') { 
      stepper.setSpeed(30);
      stepper.step(100);
    } 
    else if (lectura == '3') { 
      stepperR.setSpeed(30);
      stepperR.step(100);
    }
  }
  if (BT.available() > 0) {
    char lectura = BT.read();
    Serial.print(lectura);
    if (lectura == '0') { digitalWrite(pinChispero, LOW); } 
    else if (lectura == '1') { digitalWrite(pinChispero, HIGH); } 
    else if (lectura == '2') { 

    } 
    else if (lectura == '3') { 

    }
  }
  /*float temperatura = calcularTemperatura(pinTemperatura);
  float CO2 = calcularCO2();
  String salida = "";
  salida.concat(temperatura);
  salida +=  "|";
  salida.concat(CO2);
  BT.println(salida);*/
}

float calcularCO2() {
  int lectura = analogRead(pinCO2);
  float resistencia = ((1023.0 / (float)lectura) * 5.0 - 1.0) * RLOAD;
  return PARA * pow((resistencia / RZERO), -PARB);
}

float calcularTemperatura(int pin) {
  int lectura = analogRead(pin);
  float farenheit =  (float)((lectura * (5.0 / 1024.0)) / 0.01);
  float conversion = (float)((farenheit - 32.0) * (5.0 / 9.0));
  return conversion;
}
