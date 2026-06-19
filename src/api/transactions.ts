import transactionsData from '../dummy/transactions.json';

let transactions = [...transactionsData];

type Transaction = {
  id: number;
  name: string;
  type: string;
  createdBy: string;
  createdAt: string;
  description: string;
};

export const fetchTransactions = async () => {
  return new Promise<Transaction[]>((resolve) => {
    setTimeout(() => resolve(transactions), 300);
  });
};

export const addTransaction = async (txn: {
  name: string;
  type: string;
  createdBy: string;
  createdAt: string;
  description: string;
}) => {
  return new Promise((resolve) => {
    const newTxn = { id: transactions.length + 1, ...txn };
    transactions.push(newTxn);
    setTimeout(() => resolve(newTxn), 300);
  });
};

export const deleteTransaction = async (id: number) => {
  return new Promise((resolve) => {
    transactions = transactions.filter((t) => t.id !== id);
    setTimeout(() => resolve(true), 300);
  });
};
