import { Inject, Service } from "typedi";

import { BankAccount } from "app/models/BankAccount";
import { BankAccountMockRepository } from "app/repositories/mock/BankAccountMockRepository";
import { TokenMockRepository } from "app/repositories/mock/TokenMockRepository";
import { TransactionMockRepository } from "app/repositories/mock/TransactionMockRepository";

@Service()
export class BankingService {

    @Inject(() => BankAccountMockRepository) 
    private _bankAccountRepository: BankAccountMockRepository;

    @Inject(() => TokenMockRepository)
    private _tokenRepository: TokenMockRepository;
    
    @Inject(() => TransactionMockRepository)
    private _transactionRepository: TransactionMockRepository;

    public async login(accountId: string, passcode: string) {
        try {
            const account = await this.findAccountById(accountId);
            if (account.passcode !== passcode) {
                throw {
                    message: "Unauthorized",
                };
            }
            return this.issueToken(account.accountId);
        } catch (error) {
            console.log(error);
            throw {
                message: `Unauthorized`,
                status: 401,
            };
        }
    }

    public async deposit(token: string, depositAmount: number) {
        const account = await this.validateToken(token);
        this.validateDepositWithdrawAmount(depositAmount);
        account.balance += depositAmount;
        this._bankAccountRepository.updateAccount(account);
        this.recordTransaction(account, depositAmount, `Deposit`);
    }

    public async withdraw(token: string, withdrawAmount: number) {
        const account = await this.validateToken(token);
        this.validateDepositWithdrawAmount(withdrawAmount);
        if (account.balance < withdrawAmount) {
            throw {
                message: "Insufficient balance.",
                status: 409
            };
        }
        account.balance -= withdrawAmount;
        this._bankAccountRepository.updateAccount(account);
        this.recordTransaction(account, -withdrawAmount, `Withdraaw`);
    }

    public async transfer(token: string, toAccountId: string, transferAmount: number) {
        const account = await this.validateToken(token);
        const toAccount = await this.findAccountById(toAccountId);

        if (account.accountId === toAccount.accountId) {
            throw {
                message: "Cannot transfer to the origin account",
            };
        }
        if (account.balance < transferAmount) {
            throw {
                message: "Insufficient balance.",
            };
        }
        account.balance -= transferAmount;
        toAccount.balance += transferAmount;
        this._bankAccountRepository.updateAccount(account);
        this._bankAccountRepository.updateAccount(toAccount);
        this.recordTransaction(account, transferAmount, `Transfer to account ${toAccount.accountId}`);
        this.recordTransaction(toAccount, transferAmount, `Transfer from account ${account.accountId}`);
    }

    private validateDepositWithdrawAmount(amount: number) {
        if (amount % 100 !== 0) {
            throw {
                message: "Amount should be ended with 00",
                status: 400
            };
        }
    }

    public async findAccountById(accountId: string) {
        const account = await this._bankAccountRepository.findAccountById(accountId);

        if (!account) {
            throw {
                message: `Account ${accountId} is not exist`,
                status: 404,
            };
        }
        return account;
    }

    public async getAccountWithTransaction(accountId: string) {
        const account = await this.findAccountById(accountId);
        account.transaction = await this._transactionRepository.getTransactions(account);

        return account;
    }

    private async issueToken(accountId: string) {
        const token = await this._tokenRepository.issueToken(accountId);
        return token;
    }

    private async findAccountByToken(token: string) {
        const accountId = await this._tokenRepository.getAccountIdFromToken(token);
        if (accountId) {
            return this.findAccountById(accountId);
        }
    }

    public async validateToken(token: string) {
        const account = await this.findAccountByToken(token);
        if (!account) {
            throw {
                message: "Unauthorized",
                status: 401,
            };
        }
        return account;
    }

    private async recordTransaction(account: BankAccount, amount: number, description: string) {
        await this._transactionRepository.recordTransaction(account, amount, description);
    }
}
