// Carregar as variáveis de ambiente
require('dotenv').config();

const express = require('express');
const pool = require('../database'); // Importa a conexão com o banco de dados
const path = require('path');
const app = express();
const port = 8080;

// Middleware para analisar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (ex: index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Serve o arquivo 'index.html' quando a rota '/api-tester' for acessada
app.get('/api-tester', (req, res) => {
  res.sendFile(path.join(__dirname, 'publico/index.html'));
});

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erro: ', err);
      return res.status(500).send('Erro ao buscar usuários');
    }
    res.json(results); // Retorna a lista de usuários como JSON
  });
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  // O nome será sempre "yuri"
  const nome = 'yuri';

  // Inserir novo usuário no banco de dados
  const sql = 'INSERT INTO users (nome) VALUES (?)';
  pool.query(sql, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }

    console.log('passou aqui', err);

    // Retornar o novo usuário criado
    const newUser = {
      id: result.insertId, // ID gerado automaticamente
      nome, // Retorna "yuri" como nome
    };

    res.status(201).json(newUser); // Retorna o usuário criado com status 201
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


app.put('/users/:id', (req, res) => {
  console.log('Requisição PUT recebida para ID:', req.params.id); // Adicione este log
  const nome = req.body.nome_usuario;
console.log(nome)
  const query = 'UPDATE users SET nome = ? WHERE id = ?';
  pool.query(query, [nome, req.params.id], (err, result) => {
    if (err) {
      console.error('Error: ', err);
      return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }

    res.json({ message: 'Usuário atualizado com sucesso!', id_usuario: req.params.id });
  });
});

// Rota para deletar usuários
app.delete('/users/:id', (req, res) => {
  console.log('Requisição DELETE recebida para ID:', req.params.id);
  
  const query = 'DELETE FROM users WHERE id = ?';
  pool.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error: ', err);
      return res.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário deletado com sucesso!', id_usuario: req.params.id });
  });
});

