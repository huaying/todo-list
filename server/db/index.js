import nedb from "nedb";

const db = new nedb({
  filename: "./server/db/data.db",
  autoload: true,
});

export default db;
