import { SocketClientOptions } from "src/Models/Interfaces/Sockets/SocketClientOptions";
import SockerClusterClient, { AGClientSocket } from "socketcluster-client";

export class SocketClient {
  token: string;
  client: AGClientSocket;
  authToken: string;
  //making this a singleton
  static instance: SocketClient;
  constructor(args: SocketClientOptions) {
    if (SocketClient.instance instanceof SocketClient) {
      return SocketClient.instance;
    } else {
      this.token = args.token;
      console.log(args.url);
      this.client = SockerClusterClient.create({ host: args.url });
      this.onSocketConnected();
      SocketClient.instance = this;
    }
  }
  setAuthToken(token: string) {
    this.authToken = token;
  }
  async onSocketConnected() {
    for await (const _ of this.client.listener("connect")) {
      this.Login();
    }
  }
  async connect() {}
  async Login() {
    try {
      let ret = await Promise.all([
        this.client.invoke("login", { token: this.token }),
        this.client.listener("authenticate").once(),
      ]);
      this.setAuthToken(ret[1].signedAuthToken);
      if (this.authToken) {
        console.log("Authenticated");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
