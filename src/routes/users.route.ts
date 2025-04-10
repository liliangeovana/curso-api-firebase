import express, { Request, Response } from 'express';

export const userRoutes = express.Router();

// Tipo de usuário
type User =
  {
    id: number;
    nome: string;
    email: string;
  };
let id = 0;
const usuarios: User[] = [];

// GET TODOS OS USUÁRIOS
userRoutes.get('/users', (req: Request, res: Response) => {
  res.send(usuarios);
});

// POST NOVO USUÁRIO
userRoutes.post('/users', (req: Request, res: Response) => {
  const user = req.body;
  user.id = ++id

  usuarios.push(user);
  res.send({
    message: 'Usuário adicionado com sucesso',
  })
});

// GET UM USUÁRIO
userRoutes.get('/users/:id', (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = usuarios.find(user => user.id === userId);
  res.send(user)
});

// PUT ATUALIZAR USUÁRIO
userRoutes.put('/users/:id', (req: Request, res: Response) => {
  const userId = Number(req.params.id); // pega o id do usuário
  const user = req.body // pega o corpo da requisição

  const indexOf = usuarios.findIndex((u: User) => u.id === userId); // encontra o índice do usuário

  usuarios[indexOf].nome = user.nome; // atualiza o nome do usuário
  usuarios[indexOf].email = user.email; // atualiza o email do usuário

  res.send({
    message: 'Usuário atualizado com sucesso',
  });

});

// DELETE REMOVER USUÁRIO
userRoutes.delete('/users/:id', (req: Request, res: Response) => {
  const userId = Number(req.params.id); // pega o id do usuário

  const indexOf = usuarios.findIndex((u: User) => u.id === userId); // encontra o índice do usuário
  usuarios.splice(indexOf, 1); // remove o usuário do array

  res.send({
    message: 'Usuário removido com sucesso',
  });
});


