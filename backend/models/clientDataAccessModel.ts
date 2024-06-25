import ClientData from "../class/ClientData";
import { clients } from "../data/data";

class ClientDataAccessModel {
  /** Clientの追加 */
  public addClient(socketId: string, roomId: string, isHost: boolean = false) {
    clients.push(new ClientData(socketId, roomId, isHost));
  }

  /** Clientの削除 */
  public deleteClient(roomId: string) {
    // roomIdと一致しないデータの抽出
    const newClientData = clients.filter((client) => client.roomId != roomId);

    // Clientデータの初期化
    const length = clients.length;
    for (let i = 0; i < length; i++) {
      clients.pop();
    }

    // Clientデータの再構築
    for (let i = 0; i < newClientData.length; i++) {
      clients.push(newClientData[i]);
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
