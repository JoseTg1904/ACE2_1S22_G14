#include <Stepper.h>


#define RLOAD 10.0
#define PARA 116.6020682
#define PARB 2.769034857
#define RZERO 76.63

const int pinCO2 = A1;
const int pinTemperatura = A0;
const int stepsPerRevolution = 2550;
const int pinChispero = 5;
Stepper myStepper = Stepper(stepsPerRevolution, 6, 7, 8, 9);

//String lectura = "";

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
  Serial2.begin(9600);
  pinMode(pinTemperatura, INPUT);
  pinMode(pinCO2, INPUT);

  pinMode(pinChispero, OUTPUT);
    myStepper.setSpeed(5);

}

void loop() {

  if (Serial2.available() > 0) {
    char lectura = Serial2.read();
    if (lectura == '0') { digitalWrite(pinChispero, LOW); } 
    else if (lectura == '1') { digitalWrite(pinChispero, HIGH); } 
    else if (lectura == '2') { 
      myStepper.step(-stepsPerRevolution);
  myStepper.step(-stepsPerRevolution);

    } 
    else if (lectura == '3') { 
       myStepper.step(-stepsPerRevolution);
  myStepper.step(-stepsPerRevolution);

    }
  }
  
  float temperatura = calcularTemperatura(pinTemperatura);
  float CO2 = calcularCO2();
  String salida = "";
  salida.concat(temperatura);
  salida +=  "|";
  salida.concat(CO2);
  Serial2.println(salida);
  delay(1000);
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
