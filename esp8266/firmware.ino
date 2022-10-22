
// LIBRARYS
#include <Wire.h>  //INCLUSÃO DE BIBLIOTECA
#include <LiquidCrystal_I2C.h> //INCLUSÃO DE BIBLIOTECA
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <MFRC522.h>
int buzzer = D0;

LiquidCrystal_I2C lcd(0x3F, 16, 2); //FUNÇÃO DO TIPO "LiquidCrystal_I2C"
// DEFINES
#define RST_PIN D3
#define SS_PIN D4

// VARIABLES
const char* SSID = ""; // rede wifi
const char* PASSWORD = ""; // senha da rede wifi

const char* BROKER_MQTT = ""; // ip/host do broker
int BROKER_PORT = 1883; // porta do broker

const char* TOPIC_PING = "ping";

const char* TOPIC_PONG = "pong";

// PROTOTYPES//
void initPins();
void initSerial();
void initRfid();
void initWiFi();
void initMQTT();

// OBJECTS
WiFiClient client;
PubSubClient MQTT(client); // instancia o mqtt
MFRC522 mfrc522(SS_PIN, RST_PIN); // instancia o rfid

// setup
void setup() {
  pinMode(buzzer, OUTPUT);
  lcd.begin(16, 2);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Aproxime o seu");
  lcd.setCursor(0, 1);
  lcd.print("cartao do leitor...");

  
  initSerial();
  initWiFi();
  initMQTT();
  initRfid();

}

void loop() {
  if (!MQTT.connected()) {
    reconnectMQTT();
  }
  recconectWiFi();
  MQTT.loop();

  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    delay(500);
    return;
  }

  if ( ! mfrc522.PICC_ReadCardSerial()) {
    delay(500);
    return;
  }

  rfidProcess();

}

// implementacao dos prototypes

void initSerial() {
  Serial.begin(115200);
}

void initRfid() {
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("Aproxime o seu cartao do leitor...");
  Serial.println();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Aproxime o seu");
  lcd.setCursor(0, 1);
  lcd.print("cartao do leitor...");
}

void initWiFi() {
  delay(10);
  Serial.println("Conectando-se em: " + String(SSID));
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Conectando-se em: ");
  lcd.setCursor(0,1);
  lcd.print(String(SSID));
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Conectado na Rede " + String(SSID) + " | IP => ");
  Serial.println(WiFi.localIP());
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Conect na Rede:");
  lcd.setCursor(0,1);
  lcd.print(String(SSID));
  delay(100);
}

// Funcão para se conectar ao Broker MQTT
void initMQTT() {
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(mqtt_callback);
}

//Função que recebe as mensagens publicadas
void mqtt_callback(char* topic, byte* payload, unsigned int length) {

  String message;
  for (int i = 0; i < length; i++) {
    char c = (char)payload[i];
    message += c;
  }

  if (String(message) == "1") //UID 1 - Chaveiro
  {
    tone(buzzer, 2000, 100);
    Serial.println("Ola Vinicius !");
    Serial.println();
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Presente");
    delay(3000);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Aproxime o seu");
    lcd.setCursor(0, 1);
    lcd.print("cartao do leitor...");
  } else {
    tone(buzzer, 5000, 100);
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Tag sem cadastro!");
    lcd.setCursor(0,1);
    delay(3000);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Aproxime o seu");
    lcd.setCursor(0, 1);
    lcd.print("cartao do leitor...");
  }
  Serial.println("Tópico => " + String(topic) + " | Valor => " + String(message));

  Serial.flush();
}

void reconnectMQTT() {
  while (!MQTT.connected()) {
    Serial.println("Tentando se conectar ao Broker MQTT: " + String(BROKER_MQTT));
    if (MQTT.connect("ESP8266-ESP12-E")) {
      Serial.println("Conectado");
      MQTT.subscribe("pong");

    } else {
      Serial.println("Falha ao Reconectar");
      Serial.println("Tentando se reconectar em 2 segundos");
      delay(2000);
    }
  }
}

void recconectWiFi() {
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
}

void rfidProcess()
{
  Serial.print("UID da tag : ");
  String conteudo = "";
  byte letra;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
    conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  char UUID[9];
  conteudo.toCharArray(UUID, 9);
  Serial.println(conteudo);
  lcd.clear();
  lcd.setCursor(0,1);
  lcd.print(conteudo);
  delay(2000);
  MQTT.publish(TOPIC_PING, UUID);
}
