// 'use strict';
// tmp36_node.js

var serialport = require('serialport'); //시리얼통신을 위해서 
var portName = 'COM7';  // check your COM port!! 내가쓰는 port이름으로 바꿔야함.
var port    =   process.env.PORT || 3000; //포트를 지정하거나 3000번으로 지정해줌.

var io = require('socket.io').listen(port); //인터넷으로 자료를 뿌려주는 역활.  소켓으로 3000번으로 접속하면 데이터를 받을수있다.

// serial port object
var sp = new serialport(portName,{ //이설정으로 되어있는 sp가 데이터를 받음.
    baudRate: 9600,   // 9600  38400
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline('\r\n')  // new serialport.parsers.Readline 직렬순서로 들어오는 데이터를 읽어라.
});
var dStr="";
var tdata = [];  // temperature 들어오는 온더데이터를 담기위한 변수 .

sp.on('data', function (data) { // call back when data is received 시리얼포트로 데이터가 들어오면 들어온 데이터를 콜백함수로 처리해줌.
    // raw data only 
        //console.log(data);
        dStr = getDateString()        
        tdata[0]= dStr;
        tdata[1]= data;  // data
        console.log('AA07, ' + tdata);
        io.sockets.emit('message', tdata);  // send data to all clients   tdata를 message로 전해주라는것.
});


io.sockets.on('connection', function (socket) {  //소켓이 연결되었을때
    // If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on('message', function (msg) {
        console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {  //소켓이 분리되었을때
        console.log('disconnected');
    });
});

// helper function to get a nicely formatted date string for IOT
function getDateString() { //IOT표준시간형식으로 바꿔줌.
    var time = new Date().getTime();
    // 32400000 is (GMT+9 Korea, GimHae)
    // for your timezone just multiply +/-GMT by 3600000
    var datestr = new Date(time +32400000). //우리시간이 표준시간보다 9시간 보다 빠르기떄문에 9시간을 밀리초로 바꿔줌.
    toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}