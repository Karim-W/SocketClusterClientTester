import { HttpClient } from "./Services/HttpClient";
import ServerConfig from "./config/serverConfig";
import { stringify } from "querystring";
import { SocketClient } from "./Services/SocketClusterClient";
import { SocketClientOptions } from "./Models/Interfaces/Sockets/SocketClientOptions";
import { AuthTokenResponse } from "./Models/Interfaces/Responses/AuthToken";
import { Seed } from "./seeder";
// const initAuthServerPayload = async (client: HttpClient) => {
//   var data = stringify({
//     Grant_Type: "onBehalfOf",
//     Payload: ServerConfig.Auth.token,
//   });
//   let response = await client.post("/api/v1/token", data, {
//     "Content-Type": "application/x-www-form-urlencoded",
//   });
//   return response;
// };

// const init = async () => {
//   let client = new HttpClient(ServerConfig.Auth.baseUrl);
//   const returnedToken = (await initAuthServerPayload(
//     client
//   )) as AuthTokenResponse;
//   const opt: SocketClientOptions = {
//     token: returnedToken.token,
//     url: ServerConfig.SocketServerConfig.url,
//   };
//   new SocketClient(opt);
// };

// init();
//function to sleep
// const sleep = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };
Seed.forEach(async (item) => {
  let Base64EncodedItem = Buffer.from(JSON.stringify(item)).toString("base64");
  let fullToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5NjZjMjcyODJiZTJhYmQ1YThmNmU3NTFlYzU4MmUzIiwidHlwIjoiSldUIn0." +
    Base64EncodedItem +
    ".PV5qFv8CHYfs982QGvTMSVlYnts1GeuJ9hymLCn1JLFoKyi4LHxd6y8NV7ikg0sbntar1k1MYJkXS9icrsSkxjO0Kbhjbi_lES0xmw9KcZJOnXGmCK7YBGtUXK56FXy2SsJ1ELVsTf_Y8HhFqwUYf9Zt1Do0L4XwW_t5K2PaefsdwthOuYDaSXFhwTk2f5hZFfpZ2tf8YdwUVEV57UayAYRy1HAxgov1CE8hm-9yWE3nIJSeH6blSSI-NeVOI4EGbKaTil6bDXUyEw--h4rs-wnj0Sbge7O7OL2SJUZHDIlzAZOirOG0Dumgm46hXGFuCfk4wVt1aaRYCRR1s5tmg6-X5yyzaeUeQeBAOIhnzK9FehTUKcj2lE_RwtrJ4U5wfLeDOdp1I1BpIZyhm06oBmJMuFZ5TVZ5n2u2UjE4rRKWk-GVEcxZljn7DRD3FJLNGvWDbmo8UIBT9tbKUgBfq6DwO8WSZ6-9yU43Rx46ZK2gHbakUCRAVRvzNU03J1wI";
  const opt: SocketClientOptions = {
    token: fullToken,
    url: ServerConfig.SocketServerConfig.url,
  };
  // await sleep(100);
  new SocketClient(opt);
});
