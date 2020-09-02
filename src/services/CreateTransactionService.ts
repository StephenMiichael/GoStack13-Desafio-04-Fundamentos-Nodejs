import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid!');
    };

    if (!Number.isFinite(value)) {
      throw new Error('Transaction value is invalid!');
    };

    const { total } = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value){
      throw new Error('Transaction value is bigger then your total!');
    }

    // If outcome > total. MSG ERRO

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;

  }
}

export default CreateTransactionService;
