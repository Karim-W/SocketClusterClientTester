import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const envVarsSchema = Joi.object()
  .keys({
    AppVersion: Joi.string().required(),
    SocketClusterAuthToken: Joi.string().required(),
    initialToken: Joi.string().required(),
    AuthServiceUrl: Joi.string().required(),
    SocketUrl: Joi.string().required(),
  })
  .unknown();

export default envVarsSchema;
