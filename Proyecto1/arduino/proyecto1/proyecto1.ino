//pines para fotodiodos
const int pinLedSalida1 = 2;
const int pinLedSalida2 = 3;
const int pinEntradaLed1 = A0;
const int pinEntradaLed2 = A1;

//pines ultrasonico
const int pinEcho = 4;
const int pinTrigger = 5;

//pines para el sensor de humedad
const int pinHumedad = A2;

void setup() {
  Serial.begin(9600);
  pinMode(pinLedSalida1, OUTPUT);
  pinMode(pinLedSalida2, OUTPUT);
  pinMode(pinTrigger, OUTPUT);
  
  pinMode(pinEntradaLed1, INPUT);
  pinMode(pinEntradaLed1, INPUT);
  pinMode(pinEcho, INPUT);
  pinMode(pinHumedad, INPUT);

  digitalWrite(pinLedSalida1, HIGH);
  digitalWrite(pinLedSalida2, HIGH);
}

void loop() {
  float entrada = calcularSuciedad(pinLedSalida1);
  float humedad = calcularHumedad();
  float salida = calcularSuciedad(pinLedSalida2);
  float capacidad = llenado();
  
  Serial.println(obtenerJson(entrada, salida, humedad, capacidad));
  delay(2000);
}

float calcularSuciedad(int pin) {
  int lectura = analogRead(pin);
  return (float) ((lectura * 100.0) / 400.0);
}

float calcularHumedad() {
  int lectura = analogRead(pinHumedad);
  if (lectura >= 700) { return 0.0; }
  float porcentajeSeco = (float) ((lectura * 100.0) / 700.0);
  return 100.0 - porcentajeSeco;
}

float llenado() {
  digitalWrite(pinTrigger, LOW);
  delayMicroseconds(2);
  digitalWrite(pinTrigger, HIGH);

  delayMicroseconds(10);
  digitalWrite(pinTrigger, LOW);

  unsigned int tiempo = pulseIn(pinEcho, HIGH);
  float distancia = (tiempo / 2.9) / 2.0;

  return (90.0 - distancia) / 20.0;
}

String obtenerJson(float entrada, float salida, float humedad, float lleno) {
  String jsonSalida = "{\"entrada\": ";
  jsonSalida.concat(entrada);
  jsonSalida +=  ",\"salida\": ";
  jsonSalida.concat(salida);
  jsonSalida +=  ",\"humedad\": ";
  jsonSalida.concat(humedad);
  jsonSalida +=  ",\"lleno\": ";
  jsonSalida.concat(lleno);
  jsonSalida += "}";
  return jsonSalida;
}
