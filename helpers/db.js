const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
class DbClient {
  constructor() {
    this._db = null;
  }

  connect() {
    if (this._db !== null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
    
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.database.url, (err, client) => {
        if (err) {
          reject(err);
          return;
        }

        this._db = client.db(config.database.dbName);
        resolve();
      });
    })
  }

  get db() {
    return this._db;
  }
}

const databaseService = new DbClient();

module.exports = databaseService;
