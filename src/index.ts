import { HttpClient } from "./Services/HttpClient";
import ServerConfig from "./config/serverConfig";
import { stringify } from "querystring";
import { SocketClient } from "./Services/SocketClusterClient";
import { SocketClientOptions } from "./Models/Interfaces/Sockets/SocketClientOptions";
import { AuthTokenResponse } from "./Models/Interfaces/Responses/AuthToken";

const initAuthServerPayload = async (client: HttpClient) => {
  var data = stringify({
    Grant_Type: "onBehalfOf",
    Payload: ServerConfig.Auth.token,
  });
  let response = await client.post("/api/v1/token", data, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
  return response;
};

const init = async () => {
  let client = new HttpClient(ServerConfig.Auth.baseUrl);
  const returnedToken = (await initAuthServerPayload(
    client
  )) as AuthTokenResponse;
  const opt: SocketClientOptions = {
    token: returnedToken.token,
    url: ServerConfig.SocketServerConfig.url,
  };
  new SocketClient(opt);
};

init();
