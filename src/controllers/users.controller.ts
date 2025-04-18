import { Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';

// Tipo de usuário
type User = {
  id: number;
  nome: string;
  email: string;
};

export class UsersControllers {

  static async getAll(req: Request, res: Response) {
    try {
      // .get() - Executa a consulta e retorna os resultados como um QuerySnapshot (tipo uma "foto" da coleção no momento da consulta)
      // .get() - retorna uma Promise, logo usamos await para esperar a resposta

      const snapshot = await getFirestore().collection('users').get();

      //docs - o snapshot contém uma lista de documentos (QueryDocumentSnapshot)
      // data - retorna todos os dados do documento
      const users = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      res.send(users);

    } catch (error) {

      res.status(500).send({
        message: 'Erro interno do servidor.'
      });
    }

  }

  static async getById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
    
      const doc = await getFirestore().collection('users').doc(userId).get();

      const user = {
        id: doc.id,
        ...doc.data(),
      }

      res.send(user);
    } catch (error) {
      res.status(500).send({
        message: 'Erro interno do servidor.'
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const user = req.body;
  
      // .add() - Adiciona um novo documento a coleção gerando um id automaticamente
      await getFirestore().collection('users').add(user);

      res.status(201).send({
        message: 'Usuário adicionado com sucesso',
      })
    } catch (error) {
      res.status(500).send({
        message: 'Erro interno do servidor.'
      });
    }
  }

  static update(req: Request, res: Response) {
    try {

      const userId = req.params.id; // pega o id do usuário
      const user = req.body as User // pega o corpo da requisição
  
      // set() - Atualiza o documento com o id do usuário
      getFirestore().collection('users').doc(userId).set({
        nome: user.nome,
        email: user.email,
      });
    
      res.send({
        message: 'Usuário atualizado com sucesso',
      });

    } catch (error) {

      res.status(500).send({
        message: 'Erro interno do servidor.'
      });
    }

  }

  static async delete(req: Request, res: Response) {
    try {
      const userId = req.params.id; // pega o id do usuário
  
      await getFirestore().collection('users').doc(userId).delete(); // deleta o usuário
  
      // retorna 204 (sem conteúdo)
      // .end() - finaliza a resposta sem enviar nada 
      res.status(204).end();

    } catch (error) {
      res.status(500).send({
        message: 'Erro interno do servidor.'
      });
    }
  }
}