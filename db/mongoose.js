import mongoose from "mongoose";
import { readFile } from 'fs/promises';
import debug from "debug";

const DEBUG = debug("dev");

const dbConfig = 
     JSON.parse(await readFile(new URL('./mongo_config.json', import.meta.url)));

const connection_url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(connection_url, options)
  .then( () => { 
      DEBUG("MongoDB is connected")})
  .catch( error => {
      DEBUG("MongoDB connection unsuccessful");
      DEBUG(error);
});