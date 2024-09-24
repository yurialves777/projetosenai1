var sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("db.sqlite", (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err.message);
    return;
  }
  console.log('Banco de dados conectado');

  db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50)
  )`, (error) => {
    if (error) {
      console.error('Erro ao criar tabela', error.message);
      return;
    }
    console.log('Tabela criada com sucesso');
    var insertQuery = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
    db.run(insertQuery, ["usuario1", "usuario1@email.com", "123456"], function(err) {
      if (err) {
        console.error('Erro ao inserir usuario1', err.message);
      }
    });
    db.run(insertQuery, ["admin", "admin@email.com", "123456"], function(err) {
      if (err) {
        console.error('Erro ao inserir admin', err.message);
      }
    });
  });
});
module.exports = db