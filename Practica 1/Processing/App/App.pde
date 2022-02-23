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

void setup() {
  size(500, 500);
  //background(100, 133, 161);
  background(255);
  frameRate(60);
}

void draw() {
  //background(100, 133, 161);
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
      if(nextHumidity > prevHumidity){
    
      } else if (nextHumidity < prevHumidity){
    
      } else {
        humidityComplete = true;
      } 
    }
    
    
    if(airComplete == false){
      if(nextAir > prevAir){
    
      } else if (nextAir < prevAir){
    
      } else {
        airComplete = true;
      } 
    }
    
    
    if(lightComplete == false){
      if(nextLight > prevLight){
    
      } else if (nextLight < prevLight){
    
      } else {
        lightComplete = true;
      } 
    }
    
    
    if(externalComplete == false){
      if(nextExternalTemperature > prevExternalTemperature){
        prevExternalTemperature++;
        drawTemperature(120, 80, prevExternalTemperature, prevExternalTemperature);
      } else if (nextExternalTemperature < prevExternalTemperature){
        prevExternalTemperature--;
        drawTemperature(120, 80, prevExternalTemperature, prevExternalTemperature);
      } else {
        externalComplete = true;
      } 
    }
    
    
    if(internalComplete == false){
      if(nextInternalTemperature > prevInternalTemperature){
        prevInternalTemperature++;
        drawTemperature(240, 80, prevInternalTemperature, prevInternalTemperature);
      } else if (nextInternalTemperature < prevInternalTemperature){
        prevInternalTemperature--;
        drawTemperature(240, 80, prevInternalTemperature, prevInternalTemperature);
      } else {
        internalComplete = true;
      } 
    }
    
    //Add && lightComplete == true && airComplete == true && humidityComplete == true
    if(internalComplete == true && externalComplete == true ){
      animationComplete = true;
      internalComplete = false;
      externalComplete = false;
      lightComplete = false;
      airComplete = false;
      humidityComplete = false;
    }
  }
  drawTemperature(120, 80, prevExternalTemperature, prevExternalTemperature);
  drawTemperature(240, 80, prevInternalTemperature, prevInternalTemperature);
}

void drawTemperature(float x, float y, float fillAmount, float temperature){
  strokeWeight(2);
  rect(x, y, 50, 220, 120);
  noStroke();
  float percentage = 220 * (fillAmount/40.0);
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
  text(temperature + "°C", x, y + 250);
  noFill();
}

void getData(){
  db = new SQLite(this, "test.db"); 
  if (db.connect()) {

    db.query("SELECT * FROM data ORDER BY id DESC limit 1");

    while (db.next()) {
      nextHumidity =db.getInt("humedad");
      nextExternalTemperature =db.getInt("exterior");
      nextInternalTemperature = db.getInt("interior");
      nextLight = db.getInt("luz");
      nextAir = db.getInt("aire");
    }
    
  }
  db.close();
}
