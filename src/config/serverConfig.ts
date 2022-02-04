import envVarsSchema from "./envSchema";
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const ServerConfig = {
  Auth: {
    token: envVars.initialToken,
    baseUrl: envVars.AuthServiceUrl,
  },
  SocketServerConfig: {
    url: envVars.SocketUrl,
    token: envVars.SocketClusterAuthToken,
  },
  serverVersion: envVars.AppVersion,
};
export default ServerConfig;
