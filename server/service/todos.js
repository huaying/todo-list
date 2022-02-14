import db from "../db";
import { nanoid } from "nanoid";

export function getTodoList() {
  return new Promise((resolve) =>
    db.find({}, function (err, docs) {
      if (err) {
        reject(err);
      }
      resolve(docs);
    })
  );
}

export function createTodo(content) {
  return new Promise((resolve) =>
    db.insert(
      { id: nanoid(), content, isCompleted: false },
      function (err, newDoc) {
        if (err) {
          reject(err);
        }
        resolve(newDoc);
      }
    )
  );
}

export function updateTodo(id, content) {
  return new Promise((resolve) =>
    db.update(
      { id },
      { $set: { content } },
      { returnUpdatedDocs: true },
      function (err, numAffected, docs) {
        if (err) {
          reject(err);
        }
        resolve(docs);
      }
    )
  );
}

export function toggleTodo(id) {
  // for demo purpose, ignore transacion handling
  return new Promise((resolve, reject) =>
    db.findOne({ id }, function (err, docs) {
      if (err) {
        reject(err);
      }
      if (docs) {
        db.update(
          { id },
          { $set: { isCompleted: !docs.isCompleted } },
          { returnUpdatedDocs: true },
          function (err, numAffected, docs) {
            if (err) {
              reject(err);
            }
            resolve(docs);
          }
        );
      }
      resolve(null);
    })
  );
}

export function deleteTodo(id) {
  return new Promise((resolve) =>
    db.remove({ id }, { returnUpdatedDocs: true }, function (err, numAffected) {
      if (err) {
        reject(err);
      }

      resolve(!!numAffected);
    })
  );
}
