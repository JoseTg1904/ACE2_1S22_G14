#include <SoftwareSerial.h>

#define RLOAD 10.0
#define PARA 116.6020682
#define PARB 2.769034857
#define RZERO 76.63

SoftwareSerial BT(2, 3);
const int pinCO2 = A1;
const int pinTemperatura = A0;
const int pinValvula1 = 6;
const int pinValvula2 = 7;
const int pinValvula3 = 8;
const int pinValvula4 = 9;
const int pinChispero = 5;

String lectura = "";

int paso [8][4] = {
  {1, 0, 0, 0},
  {1, 1, 0, 0},
  {0, 1, 0, 0},
  {0, 1, 1, 0},
  {0, 0, 1, 0},
  {0, 0, 1, 1},
  {0, 0, 0, 1},
  {1, 0, 0, 1}
};

void setup() {
  Serial.begin(9600);
  BT.begin(9600);
  pinMode(pinTemperatura, INPUT);
  pinMode(pinCO2, INPUT);
  pinMode(pinValvula1, OUTPUT);
  pinMode(pinValvula2, OUTPUT);
  pinMode(pinValvula3, OUTPUT);
  pinMode(pinValvula4, OUTPUT);
  pinMode(pinChispero, OUTPUT);
}

void loop() {
  if (BT.available()) {
    lectura = BT.read();

    if (lectura == "0c") { digitalWrite(pinChispero, LOW); } 
    else if (lectura == "1c") { digitalWrite(pinChispero, HIGH); } 
    else if (lectura == "0v") { 
      for (int i = 0; i < 8; i++) {
        digitalWrite(pinValvula1, paso[i][0]);
        digitalWrite(pinValvula2, paso[i][1]);
        digitalWrite(pinValvula3, paso[i][2]);
        digitalWrite(pinValvula4, paso[i][3]);
        delay(10);
      }
    } 
    else if (lectura == "1v") { 
      for (int i = 8; i >= 0; i--) {
        digitalWrite(pinValvula1, paso[i][3]);
        digitalWrite(pinValvula2, paso[i][2]);
        digitalWrite(pinValvula3, paso[i][1]);
        digitalWrite(pinValvula4, paso[i][0]);
        delay(10);
      }
    }

    float temperatura = calcularTemperatura(pinTemperatura);
    float CO2 = calcularCO2();
    String salida = "";
    salida.concat(temperatura);
    salida +=  "|";
    salida.concat(CO2);
    BT.write(&salida);
  }
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
