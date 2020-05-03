import { response } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import GetTransactionBalanceService from './GetTransactionBalanceService';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;

  outcome: number;

  total: number;
}

interface TransactionAndBalance {
  transactions: Transaction[];

  balance: Balance;
}

class ListTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionAndBalance {
    const transactions = this.transactionsRepository.all();

    const getTransactionBalanceService = new GetTransactionBalanceService(
      transactions,
    );

    const balance = getTransactionBalanceService.execute();

    const transactionsAndBalance = {
      transactions,
      balance,
    };

    return transactionsAndBalance;
  }
}

export default ListTransactionService;
