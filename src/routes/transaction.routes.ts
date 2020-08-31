import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
      const { title, value, type } = request.body;

      const CreateTransaction = new CreateTransactionService(
        transactionsRepository,
      );

      const transaction = CreateTransaction.execute({
        title,
        value,
        type
      });

      return response.status(400).json(transaction);
    } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
