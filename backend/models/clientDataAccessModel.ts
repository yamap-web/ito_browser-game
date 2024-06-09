import { clients } from "../data/data";
import ClientData from "../class/ClientData";

class ClientDataAccessModel {
  /** Clientの追加 */
  public addClient(socketId: string, roomId: string, isHost: boolean = false) {
    clients.push(new ClientData(socketId, roomId, isHost));
  }

  /** Clientの削除 */
  public deleteClient(socketId: string) {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].socketId == socketId) {
        clients.splice(i, 1);
      }
    }
  }

  /** roomIdの取得 */
  public getRoomId(socketId: string): string {
    const client = clients.find((client) => client.socketId === socketId);

    if (client) {
      return client.roomId;
    } else {
      return "";
    }
  }
}

export default ClientDataAccessModel;
