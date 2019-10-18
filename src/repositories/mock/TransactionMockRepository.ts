import { BankAccount } from "app/models/BankAccount";
import { Transaction } from "app/models/Transaction";
import { Service } from "typedi";

@Service()
export class TransactionMockRepository {
    private transactions: { [key: string]: Transaction[] } = {};

    public async recordTransaction(account: BankAccount, amount: number, description: string) {
        if (!this.transactions[account.accountId]) {
            this.transactions[account.accountId] = [];
        }

        this.transactions[account.accountId].push({
            createdAt: new Date(),
            amount,
            description,
        });
    }

    public async getTransactions(account: BankAccount) {
        return this.transactions[account.accountId];
    }
}