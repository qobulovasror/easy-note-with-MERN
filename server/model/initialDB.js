import connect, { sql } from "@databases/sqlite";
const db = connect(":memory:");

//create tables
async function initialTables() {
  try {
    await db.query(sql`
      CREATE TABLE IF NOT EXISTS user (
        id VARCHAR NOT NULL PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        created_at INTEGER DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(sql`
      CREATE TABLE IF NOT EXISTS note (
        id VARCHAR NOT NULL PRIMARY KEY,
        title VARCHAR NOT NULL UNIQUE,
        body TEXT NOT NULL,
        created_at INTEGER DEFAULT CURRENT_TIMESTAMP,
        owner VARCHAR REFERENCES user(id) ON DELETE SET NULL,
        FOREIGN KEY (owner) REFERENCES user(id) ON UPDATE CASCADE
      );
    `);

    console.log("Table created successfully!");
  } catch (error) {
    console.log(error);
  }
}

export { initialTables, db };
