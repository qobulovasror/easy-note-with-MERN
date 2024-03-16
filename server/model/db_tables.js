import { v4 as uuidv4 } from "uuid";
import { sql } from "@databases/sqlite";
import { db } from "./initialDB.js";

//add user and notes
async function addUser(name, email, password) {
  const id = uuidv4();
  await db.query(sql`INSERT INTO user 
      (id, name, email, password) VALUES 
      (${id}, ${name}, ${email}, ${password});`);
  return id;
}
async function addNote(title, body, owner) {
  const id = uuidv4();
  await db.query(sql`INSERT INTO note 
        (id, title, body, owner) VALUES 
        (${id}, ${title}, ${body}, ${owner});`);
  return id;
}

//get data from tables
async function getNotes(id, title) {
  try {
    let results;
    if (id) {
      results = await db.query(sql`
        SELECT * FROM note WHERE id=${id};
      `);
    } else if (title) {
      results = await db.query(sql`
        SELECT * FROM note WHERE title=${title};
      `);
    } else {
      results = await db.query(sql`SELECT * FROM note ORDER BY created_at;`);
    }
    if (results.length) {
      return results;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("error by get notes: ", error);
  }
}
async function getUser(id, name, email) {
  try {
    let results;
    if (id) {
      results = await db.query(sql`
        SELECT * FROM user WHERE id=${id};
      `);
    } else if (name) {
      results = await db.query(sql`
        SELECT * FROM user WHERE name=${name};
      `);
    } else if (email) {
      results = await db.query(sql`
        SELECT * FROM user WHERE email=${email};
      `);
    } else {
      results = await db.query(sql`
        SELECT * FROM user;
      `);
    }
    if (results.length) {
      return results;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
}

// update note
// async function updateNote(id, title, body) {
//   try {
//     const oldNote = await getNotes(id);
//     if(!oldNote) return
//     let oldgrade = oldNote[0];
//     await db.query(sql`
//   UPDATE users
//   SET (grade)
//   = (${grade + oldgrade})
//   WHERE id=${id}
//   `);
//     const users = await getUser(null, null, roomId);
//     return users;
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function updateUser(id, ...data) {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// }

//remove
async function removeNote(id) {
  await db.query(sql`
    DELETE FROM note WHERE id=${id};
  `);
}
async function removeUser(id) {
  await db.query(sql`
    DELETE FROM user WHERE id=${id};
  `);
  return id;
}

async function removeNotesByUserID(userID) {
  await db.query(sql`
    DELETE FROM note WHERE owner=${userID};
  `);
  return userID;
}

export {
  addUser,
  addNote,
  getUser,
  getNotes,
//   updateNote,
//   uspdateUser,
  removeUser,
  removeNote,
  removeNotesByUserID
};
