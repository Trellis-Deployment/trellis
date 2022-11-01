const { w3cwebsocket } = require("websocket");
class WebSocket {
  constructor(userId) {
    this.userId = userId;
    this.socketConn = new w3cwebsocket(`wss://6wyd0jst0i.execute-api.us-east-1.amazonaws.com/dev?userId=${userId}`);
    this.socketConn.addEventListener('open', this.connectionOpened);
    this.socketConn.addEventListener('close', this.connectionClosed);
    this.socketConn.addEventListener('error', this.connectionErrored);
    this.socketConn.addEventListener('message', this.messageReceived);
  }

  connectionOpened(e) {
    console.log('WebSocket is connected');
  }

  connectionClosed(e) {
    console.log({e});
    console.log('WebSocket Connection is closed')
  }

  connectionErrored(e) {
    console.error('WebSocket Connection is in error', e)
  }

  messageReceived(e) {
    console.log(e.data);
  }
  
  endConnection() {
    this.socketConn.close(1001, this.userId);
  }
}

const mySocket = new WebSocket('hello');
setTimeout(() => {
  mySocket.endConnection();
}, 5000);

//export default WebSocket;