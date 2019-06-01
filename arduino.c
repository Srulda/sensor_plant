//all relevant libreries
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "DHT.h"

#define DHTTYPE DHT11   // DHT 11

/*my SSID & Password*/
const char* ssid = "Elevation";  // Enter SSID here
const char* password = "AlwaysOn";  //Enter Password here

ESP8266WebServer server(80);

// DHT Sensor and soil sensor
uint8_t DHTPin = 14; 
int sensor_pin = A0;
               
// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);                

float Temperature;
float Humidity;
int moisture ;


void setup() {
  Serial.begin(115200);
  delay(100);
  
  pinMode(DHTPin, INPUT);

  dht.begin();              

  Serial.println("Connecting to ");
  Serial.println(ssid);

  //connect to local wi-fi network
  WiFi.begin(ssid, password);

  //check wi-fi is connected to wi-fi network
  while (WiFi.status() != WL_CONNECTED) {
  delay(1000);
  Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected..!");
  Serial.print("Got IP: ");  Serial.println(WiFi.localIP());

  server.on("/", handle_OnConnect);
  server.onNotFound(handle_NotFound);

  server.begin();
  Serial.println("HTTP server started");

}
void loop() {
    server.handleClient();  
}

void handle_OnConnect() {

  Temperature = dht.readTemperature(); // Gets the values of the temperature
  Humidity = dht.readHumidity(); // Gets the values of the humidity 
  moisture = analogRead(sensor_pin); // Gets the values of the moisture
  moisture = map(moisture, 1024, 300, 0, 100);  // convert values to % 0-100
  server.send(200, "text/html", SendHTML(Temperature,Humidity,moisture)); 
}

void handle_NotFound(){
  server.send(404, "text/plain", "Not found");
}

String SendHTML(float Temperaturestat,float Humiditystat,int moiststat){
  String ptr = "<!DOCTYPE html> <html>\n";
    ptr +="<p>";
    ptr +=(int)Temperaturestat;
    ptr +="</p>";

    ptr +="<p>";
    ptr +=(int)Humiditystat;
    ptr +="</p>";

    ptr +="<p>";
    ptr +=(int)moiststat;
    ptr +="</p>";

 return ptr;
}