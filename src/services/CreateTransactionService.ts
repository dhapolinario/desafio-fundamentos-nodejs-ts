import TransactionsRepository from '../repositories/TransactionsRepository';
import ListTransactionService from './ListTransactionService';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    const listTransactionService = new ListTransactionService(
      this.transactionsRepository,
    );

    const transactionsAndBalance = listTransactionService.execute();

    if (
      type === 'outcome' &&
      transactionsAndBalance.balance.total - value < 0
    ) {
      throw Error('There is not enough balance in the account.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
