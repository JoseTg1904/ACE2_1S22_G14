import de.bezier.data.sql.*;
import de.bezier.data.sql.mapper.*;
import de.bezier.data.sql.*;

SQLite db;
float nextHumidity = 0;
float nextExternalTemperature = 0;
float nextInternalTemperature = 0;
float nextLight = 0;
float nextAir = 0;
float prevHumidity = 0;
float prevExternalTemperature = 0;
float prevInternalTemperature = 0;
float prevLight = 0;
float prevAir = 0;

boolean animationComplete = false;
boolean externalComplete = false;
boolean internalComplete = false;
boolean lightComplete = false;
boolean airComplete = false;
boolean humidityComplete = false;

float externalXPOS = 120.0;
float internalXPOS = 350.0;
float temperatureYPOS = 30.0;
float maxTemperature = 40.0;

float luminosityXPOS = 650;
float luminosityYPOS = 140;
float luminositySize = 150;
float maxLuminosity = 2;

float dropXPOS = 285;
float dropYPOS = 500;
float maxHumidity = 100;

float particleMinHeight = 560;
float particleMaxHeight = 370;
float particleXPOS = 550;
float maxAir = 20;

void setup() {
  size(850, 650);
  background(255);
  frameRate(60);
}

void draw() {
  background(255);
  if(animationComplete == true){
    animationComplete = false;
    prevHumidity = nextHumidity;
    prevExternalTemperature = nextExternalTemperature;
    prevInternalTemperature = nextInternalTemperature;
    prevLight = nextLight;
    prevAir = nextAir;
    getData();
  } else {
    if(humidityComplete == false){
      if (abs(nextHumidity - prevHumidity) < 0.25){
        humidityComplete = true;
      } else if (nextHumidity > prevHumidity){
        prevHumidity += 0.25;
        drawHumidity();
      } else if (nextHumidity < prevHumidity){
        prevHumidity -= 0.25;
        drawHumidity();
      }
    }
    
    
    if(airComplete == false){
      if (abs(nextAir - prevAir) < 0.03){
        airComplete = true;
      } else if(nextAir > prevAir){
        prevAir += 0.03;
        drawParticles();
      } else if (nextAir < prevAir){
        prevAir -= 0.03;
        drawParticles();
      }
    }
    
    
    if(lightComplete == false){
      if (abs(nextLight - prevLight) < 0.018){
        lightComplete = true;
      } else if(nextLight > prevLight){
        prevLight += 0.018;
        drawLuminosity();
      } else if (nextLight < prevLight){
        prevLight -= 0.018;
        drawLuminosity();
      }
    }
    
    
    if(externalComplete == false){
      if (abs(nextExternalTemperature - prevExternalTemperature) < 0.21){
        externalComplete = true;
      } else if(nextExternalTemperature > prevExternalTemperature){
        prevExternalTemperature += 0.21;
        drawTemperature(externalXPOS, temperatureYPOS, prevExternalTemperature, prevExternalTemperature);
      } else if (nextExternalTemperature < prevExternalTemperature){
        prevExternalTemperature -= 0.21;
        drawTemperature(externalXPOS, temperatureYPOS, prevExternalTemperature, prevExternalTemperature);
      }
    }
    
    
    if(internalComplete == false){
      if (abs(nextInternalTemperature - prevInternalTemperature) < 0.21){
        internalComplete = true;
      }
      if(nextInternalTemperature > prevInternalTemperature){
        prevInternalTemperature += 0.21;
        drawTemperature(internalXPOS, temperatureYPOS, prevInternalTemperature, prevInternalTemperature);
      } else if (nextInternalTemperature < prevInternalTemperature){
        prevInternalTemperature -= 0.21;
        drawTemperature(internalXPOS, temperatureYPOS, prevInternalTemperature, prevInternalTemperature);
      }
    }
    
    if(internalComplete == true && externalComplete == true && lightComplete == true && airComplete == true && humidityComplete == true){
      animationComplete = true;
      internalComplete = false;
      externalComplete = false;
      lightComplete = false;
      airComplete = false;
      humidityComplete = false;
    }
  }
  drawTemperature(externalXPOS, temperatureYPOS, prevExternalTemperature, prevExternalTemperature);
  drawTemperature(internalXPOS, temperatureYPOS, prevInternalTemperature, prevInternalTemperature);
  drawLuminosity();
  drawHumidity();
  drawParticles();
}

void drawParticles(){
  float percentage = particleMinHeight - ((abs(particleMaxHeight - particleMinHeight) * (prevAir/maxAir)));
  stroke(87);
  line(particleXPOS, particleMaxHeight, particleXPOS, particleMinHeight);
  beginShape();
  stroke(0);
  fill(0);
  vertex(particleXPOS - 27, percentage - 10);
  vertex(particleXPOS - 7, percentage - 10);
  vertex(particleXPOS - 2, percentage - 5);
  vertex(particleXPOS - 7, percentage);
  vertex(particleXPOS - 27, percentage);
  vertex(particleXPOS - 27, percentage - 10);
  endShape();
  noFill();
  text(nf(prevAir, 2, 2) + " PPM", particleXPOS - 60, particleMinHeight + 40);
}

void drawHumidity(){
  arc(dropXPOS, dropYPOS, 120, 120, 1 - PI * 0.5, 2 + PI * 0.5, OPEN);
  line(dropXPOS - 54, dropYPOS - 27, dropXPOS, dropYPOS - 133);
  line(dropXPOS + 54, dropYPOS - 27, dropXPOS, dropYPOS - 133);
  fill(135, 206, 235);
  float ratio = prevHumidity/maxHumidity;
  if(ratio <= 0.5){
    arc(dropXPOS, dropYPOS, 120, 120, 1 - PI * ratio, 2 + PI * ratio, OPEN);
  } else {
    arc(dropXPOS, dropYPOS, 120, 120, 1 - PI * 0.5, 2 + PI * 0.54, OPEN);
    int altura = (int)dropYPOS - 27;
    int largo = 54;
    stroke(135, 206, 235);
    ratio =  altura - 98 * ((prevHumidity - 50)/(maxHumidity / 2));
    for(int i = (int)dropXPOS - 54; i < (int)dropXPOS; i++){
      if(largo - 5 >= 0){
        line(i + 5, altura, dropXPOS + largo - 5, altura);
        altura -= 2;
        largo--;
      }
      if(altura < ratio){
        break;
      }
    }
  }
  fill(0);
  stroke(0);
  text(nf(prevHumidity, 2, 2) + " %", dropXPOS - 40, dropYPOS + 100);
  noFill();
}

void drawLuminosity(){
  float percentage = 255 * prevLight/maxLuminosity;
  fill(percentage, percentage, 0);
  circle(luminosityXPOS, luminosityYPOS, luminositySize);
  line(luminosityXPOS, luminosityYPOS - 85, luminosityXPOS, luminosityYPOS - 100);
  line(luminosityXPOS + 85, luminosityYPOS, luminosityXPOS + 100, luminosityYPOS);
  line(luminosityXPOS + 30, luminosityYPOS - 80, luminosityXPOS + 35, luminosityYPOS - 95);
  line(luminosityXPOS + 60, luminosityYPOS - 60, luminosityXPOS + 70, luminosityYPOS - 75);
  line(luminosityXPOS + 80, luminosityYPOS - 35, luminosityXPOS + 95, luminosityYPOS - 45);
  line(luminosityXPOS - 30, luminosityYPOS - 80, luminosityXPOS - 35, luminosityYPOS - 95);
  line(luminosityXPOS - 60, luminosityYPOS - 60, luminosityXPOS - 70, luminosityYPOS - 75);
  line(luminosityXPOS - 80, luminosityYPOS - 35, luminosityXPOS - 95, luminosityYPOS - 45);
  line(luminosityXPOS + 80, luminosityYPOS + 35, luminosityXPOS + 95, luminosityYPOS + 45);
  line(luminosityXPOS + 60, luminosityYPOS + 60, luminosityXPOS + 70, luminosityYPOS + 75);
  line(luminosityXPOS + 30, luminosityYPOS + 80, luminosityXPOS + 35, luminosityYPOS + 95);
  line(luminosityXPOS - 80, luminosityYPOS + 35, luminosityXPOS - 95, luminosityYPOS + 45);
  line(luminosityXPOS - 60, luminosityYPOS + 60, luminosityXPOS - 70, luminosityYPOS + 75);
  line(luminosityXPOS - 30, luminosityYPOS + 80, luminosityXPOS - 35, luminosityYPOS + 95);
  line(luminosityXPOS - 85, luminosityYPOS, luminosityXPOS - 100, luminosityYPOS);
  line(luminosityXPOS, luminosityYPOS + 85, luminosityXPOS, luminosityYPOS + 100);
  textSize(30);
  fill(24);
  text(nf(prevLight, 1, 2) + " Lumens", luminosityXPOS - 70, luminosityYPOS + 140);
  noFill();
}

void drawTemperature(float x, float y, float fillAmount, float temperature){
  strokeWeight(2);
  rect(x, y, 50, 220, 120);
  noStroke();
  float percentage = 220 * (fillAmount/maxTemperature);
  if(temperature < 12){
    fill(150, 200, 255);
  } else if (temperature >= 12 && temperature < 15){
    fill(255, 251, 45);
  } else if (temperature >= 15 && temperature < 18){
    fill(255, 150, 45);
  } else if (temperature >= 18 && temperature < 23){
    fill(255, 100, 20);
  } else if (temperature >= 23 && temperature < 25){
    fill(255, 50, 10);
  } else if (temperature >= 25 && temperature < 30){
    fill(255, 25, 5);
  } else if (temperature > 30){
    fill(255, 0, 0);
  }
  rect(x, y + (220 - percentage), 50, percentage, 120);
  noFill();
  stroke(0);
  strokeWeight(4);
  for(int i = 1; i < 7; i++){
    line(x + 2, y + (30 * i), x + 20, y + (30 * i));
  }
  textSize(30);
  fill(24);
  text(nf(temperature, 2, 2) + "°C", x, y + 250);
  noFill();
}

void getData(){
  /*db = new SQLite(this, "test.db"); 
  if (db.connect()) {

    db.query("SELECT * FROM datos ORDER BY id DESC limit 1");

    while (db.next()) {
      nextHumidity =db.getInt("humedad");
      nextExternalTemperature =db.getInt("temperatura1");
      nextInternalTemperature = db.getInt("temperatura2");
      nextLight = db.getInt("luz");
      nextAir = db.getInt("aire");
    }
    
  }
  db.close();*/
  String[]json = loadStrings("http://34.125.201.170:3010/obtenerMetricas");
  saveStrings("data.json", json);
  JSONObject jobj = loadJSONObject("data.json");
  nextHumidity = jobj.getFloat("humedad");
  nextExternalTemperature = jobj.getFloat("temperatura1");
  nextInternalTemperature = jobj.getFloat("temperatura2");
  nextLight = jobj.getFloat("lumens");
  nextAir = jobj.getFloat("co2");
}
