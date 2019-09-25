int pwm=0;
int led =3;
void setup() {
  // put your setup code here, to run once:

}

void loop() {
pwm =random(0,255);
pwmLed(led,pwm);
}

void pwmLed(int led, int pwmValue){

  analogWrite(led,pwmValue);
  delay(200);
}
