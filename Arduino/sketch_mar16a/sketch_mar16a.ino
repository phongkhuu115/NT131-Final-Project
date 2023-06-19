/*********
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp8266-nodemcu-hc-sr04-ultrasonic-arduino/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*********/
#include <Wire.h>
#include "Adafruit_SHTC3.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>


//esp8266 variable
const char* ssid = "UIT Public";
const char* password = "";
const char* serverName = "http://localhost:3333/v1/api/userCollection";

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

//shtc3 sensor
Adafruit_SHTC3 shtc3 = Adafruit_SHTC3();

//hc-sr04 sensor
const int trigPin = 12;
const int echoPin = 14;

//define sound velocity in cm/uS
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.393701
long duration;
float distanceCm;

void setup() {
  Serial.begin(9600); // Starts the serial communication

  //Get HC-SR04 pin
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

  //SHTC3 Sensor Discovery
  Serial.println("SHTC3 test");
  if (! shtc3.begin()) {
    Serial.println("Couldn't find SHTC3");
    while (1) delay(1);
  }
  Serial.println("Found SHTC3 sensor");

  //ESP8266 Wifi Discovery
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  //HC-SR04 Get Sensor value
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance
  distanceCm = duration * SOUND_VELOCITY/2;

  //SHTC3 Get Sensor value
  sensors_event_t humidity, temp;
  
  shtc3.getEvent(&humidity, &temp);// populate temp and humidity objects with fresh data

  float temperature = temp.temperature;
  float humid = humidity.relative_humidity;

  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client; 
      HTTPClient http;

      http.begin(client, serverName);

      int status = 0;
      if (distanceCm > 20) {
        status = 1;
      }
  
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      String httpRequestData = "userToken=c8455c766e2ca67550b3279253d19b76&waterLevel=" + String(distanceCm) + "&humidity=" + String(humid) + "&tempature=" + String(temperature) + "&status=" + String(status);
      Serial.println("Data: " + httpRequestData);     
      int httpResponseCode = http.POST(httpRequestData);
      String response = http.getString();
     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }

  
  delay(1000);
}
