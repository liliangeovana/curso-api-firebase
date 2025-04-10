import express from 'express';
import { UsersControllers } from '../controllers/users.controller';

export const userRoutes = express.Router();

userRoutes.get('/users', UsersControllers.getAll); // GET TODOS OS USUÁRIOS
userRoutes.get('/users/:id', UsersControllers.getById); // GET UM USUÁRIO
userRoutes.post('/users', UsersControllers.create); // POST NOVO USUÁRIO
userRoutes.put('/users/:id', UsersControllers.update); // PUT ATUALIZAR USUÁRIO
userRoutes.delete('/users/:id', UsersControllers.delete); // DELETE REMOVER USUÁRIO
