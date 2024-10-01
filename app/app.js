const express = require('express')
const app = express()
const port = 8080
const path = require('path');
const db = require('../database')

// Middleware para habilitar o parsing de JSON no body
app.use(express.json());

// Serve the 'index.html' file from the root
app.get('/api-tester', (req, res) => {
  res.sendFile(path.join(__dirname, 'publico/index.html'));
});

app.get('/', (req, res) => {
  res.send('Funcionou essa p****!')
})

//Cole sua rota POST aqui
app.post('/dados', (req, res) => {
    const dados = req.body; // Acessa os dados enviados no corpo da requisição
    res.send(`Dados recebidos: ${JSON.stringify(dados)}`);
});
app.post('/', (req, res) => {
    console.log('Dados recebidos no body:', req.body);
    res.json({ message: 'Dados recebidos com sucesso!', body: req.body });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// app.get('/usuario/:id', (req, res, next) => {
//   res.send(req.params.id)
//   db.all()
// })
app.get('/usuario/:id', (req, res) => {
	parametro = req.params.id
  db.get("SELECT * FROM user WHERE id = ?", parametro, (error, row) => {
  	if(error) {
    	res.json(error)
      return
    }
    res.send(row)
  })
})
app.get('/tasks/:id', (req, res) => {
  const parametro = req.params.id
  db.query(`SELECT * FROM tasks WHERE id = ?`, parametro, (err, rows) => {
    if (err) {
      console.log('Error: ' + err)
      return
    }
    res.send(rows)
  })
})
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.log('Error: ' + err)
      return
    }
    res.send(rows)
  })
})
app.post('/tasks', (req, res) => {

//pegar os dados o usuario enviar (req )
var dados = req.body









//salvar no banco de dados 





  db.query(`insert into tasks (titulo, descricao, status) values (${dados.titulo}, ${dados.descricao}, ${dados.status})`, (err, rows) => {
    if (err) {
      console.log('Error: ' + err)
      return
    }
    res.send(rows)
  })
})


