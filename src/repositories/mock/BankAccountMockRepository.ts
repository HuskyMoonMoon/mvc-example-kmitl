import { BankAccount } from "app/models/BankAccount";
import { Service } from "typedi";

@Service()
export class BankAccountMockRepository {
    public bankAccounts: BankAccount[] = [
        {
            accountId: "2562-34-21-10001",
            passcode: "6969",
            balance: 35285.53,
        },
        {
            accountId: "2562-34-21-10002",
            passcode: "4117",
            balance: 103478.98,
        },
        {
            accountId: "2562-34-21-10003",
            passcode: "8143",
            balance: 1781.25,
        },
    ];
    
    public async findAccountById(accountId: string) {
        const account = this.bankAccounts.find((acc) => {
            return acc.accountId.replace(/-/g, "") === accountId.replace(/-/g, "");
        });

        return account;
    }

    public async updateAccount(account: BankAccount) {
        const index = this.bankAccounts.findIndex((acc) => {
            return acc.accountId.replace(/-/g, "") === account.accountId.replace(/-/g, "");
        });

        this.bankAccounts[index] = account;
    }

}