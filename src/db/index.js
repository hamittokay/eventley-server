import { MongoClient } from 'mongodb';

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-2zc8c.gcp.mongodb.net?retryWrites=true&w=majority`;

class Database {
  constructor() {
    this.client = null;
  }

  connect(cb) {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, database) => {
        if (err) throw err;
        const client = database.db(process.env.DB_NAME);

        this.client = client;
        cb();
      }
    );
  }
}

export default new Database();
