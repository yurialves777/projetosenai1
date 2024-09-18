const express = require('express')
const app = express()
const port = 8080
const path = require('path');

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
