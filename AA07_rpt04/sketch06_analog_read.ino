void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
int sensorValue=analogRead(A0);
Serial.print("AA07, Present V(0~5.0) : ");
float voltage =sensorValue*(5.0/1023.0);
//정수 범위값을 받아서 실수형으로 환산해주는 함수.
Serial.println(voltage);
delay(500);
}
