import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  privatekey: process.env.PRIVATEKEY,
};

const mongo = {
  mongo_url: process.env.MONGO_URL,
  mongo_name: process.env.MONGO_NAME,
};

export { config, mongo };
