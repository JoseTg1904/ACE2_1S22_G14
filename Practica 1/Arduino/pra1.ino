#include <math.h>

//valores definidos para el sensor de CO2
#define RLOAD 10.0
#define PARA 116.6020682
#define PARB 2.769034857
#define RZERO 76.63

//pines de uso para los sensores
const int pinTemperatura1 = A0;
const int pinTemperatura2 = A1;
const int pinHumedad = A2;
const int pinLDR = A3;
const int pinCO2 = A4;

void setup() {
  Serial.begin(9600);
  pinMode(pinTemperatura1, INPUT);
  pinMode(pinTemperatura2, INPUT);
  pinMode(pinHumedad, INPUT);
  pinMode(pinLDR, INPUT);
}

void loop() {
  //lectura de sensores
  float temperatura1 = calcularTemperatura(pinTemperatura1);
  float temperatura2 = calcularTemperatura(pinTemperatura2);
  float humedad = calcularHumedad();
  double lumens = calcularLumens();
  float CO2 = calcularCO2();

  Serial.println(obtenerJson(temperatura1, temperatura2, humedad, lumens, CO2));
  delay(2000);
}

float calcularTemperatura(int pin) {
  int lectura = analogRead(pin);
  float farenheit =  (float)((lectura * (5.0/1024.0)) / 0.01);
  float conversion = (float)((farenheit - 32) * (5/9));
  Serial.println(farenheit);
  Serial.println(conversion);
  return conversion; 
}

float calcularHumedad() {
  int lectura = analogRead(pinHumedad);
  if (lectura >= 700) { return 0.0; }
  float porcentajeSeco =  (lectura * 100) / 700;
  return 100.0 - porcentajeSeco;
}

double calcularLumens() {
  int lectura = analogRead(pinLDR);
  double lux = 12500000 * pow(lectura, -1.4059);
  return lux * 0.00002;
}

float calcularCO2() {
  int lectura = analogRead(pinCO2);
  float resistencia = ((1023./(float)lectura) * 5. - 1.)*RLOAD;
  return PARA * pow((resistencia/RZERO), -PARB);
}

String obtenerJson(float temp1, float temp2, float hum, double lum, float co2) {
  String jsonSalida = "{\"temperatura1\": ";
  jsonSalida.concat(temp1);
  jsonSalida +=  ",\"temperatura2\": ";
  jsonSalida.concat(temp2);
  jsonSalida +=  ",\"humedad\": ";
  jsonSalida.concat(hum);
  jsonSalida +=  ",\"lumens\": ";
  jsonSalida.concat(lum);
  jsonSalida +=  ",\"co2\": ";
  jsonSalida.concat(co2);
  jsonSalida += "}";
  return jsonSalida;
}
