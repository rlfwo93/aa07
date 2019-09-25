int  humi =0;
int  temp =0;
int  lux =0;

int ledR =3;
int ledG =5;
int ledB =6;
void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  humi = random(-10,30);
  temp = random(40,90);
  lux = random(150,250);

  pwmLed(ledR, humi);
  pwmLed(ledG, temp);
  pwmLed(ledB, lux);

  Serial.print("AA07, LED_R: ");
  Serial.print(humi);
  Serial.print(" , Humidity: ");
  Serial.print(temp);
  Serial.print(" , Temperature: ");
  Serial.println(lux);
  delay(10);
}
void pwmLed(int led, int pwmValue){
  analogWrite(led, pwmValue);
  delay(10);
}
