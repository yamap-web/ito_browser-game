class ClientData {
  public socketId: string = "";
  public roomId: string = "";
  public isHost: boolean = false;

  constructor(socketId: string, roomId: string, isHost: boolean) {
    this.socketId = socketId;
    this.roomId = roomId;
    this.isHost = isHost;
  }
}

export default ClientData;
