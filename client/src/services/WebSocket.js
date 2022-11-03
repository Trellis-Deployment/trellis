const { w3cwebsocket } = require("websocket");
class WebSocket {
  constructor({userId, setStages, appId}) {
    this.userId = userId;
    this.setStages = setStages;
    this.appId = appId;
    this.socketConn = new w3cwebsocket(`${process.env.REACT_APP_Websocket_URL}?userId=${userId}`);
    this.socketConn.addEventListener('open', this.connectionOpened);
    this.socketConn.addEventListener('close', this.connectionClosed);
    this.socketConn.addEventListener('error', this.connectionErrored);
    this.socketConn.addEventListener('message', this.messageReceived(this));
  }

  connectionOpened(e) {
    console.log('WebSocket is connected');
  }

  connectionClosed(e) {
    console.log('WebSocket Connection is closed')
  }

  connectionErrored(e) {
    console.error('WebSocket Connection is in error', e)
  }

  messageReceived(currentClass) {
    return (e) => {
      console.log("messaged received");
      const updatedStages = JSON.parse(e.data);
      if (currentClass.appId !== updatedStages[0].appId) {
        return;
      }
      currentClass.setStages(updatedStages);
    }
  }

  endConnection() {
    this.socketConn.close();
  }
}

export default WebSocket;