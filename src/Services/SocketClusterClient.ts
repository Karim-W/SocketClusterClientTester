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
      console.log(args.token);
      this.token = args.token;
      console.log(args.url);
      this.client = SockerClusterClient.create({ host: args.url });
      this.onSocketConnected();
      this.MessageListener();
      SocketClient.instance = this;
    }
  }
  setAuthToken(token: string) {
    this.authToken = token;
  }

  async MessageListener() {
    (async () => {
      // * Attach listener to commands
      for await (const data of this.client.receiver("command")) {
        console.log(data);
      }
    })();
    // this.client.subscribe("899d92cd-ae4f-4223-b5ba-b9969741261e");
    // for await (let data of this.client.channel(
    //   "899d92cd-ae4f-4223-b5ba-b9969741261e"
    // )) {
    //   console.log(data);
    // }
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
