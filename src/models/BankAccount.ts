import { Transaction } from "app/models/Transaction";

export interface BankAccount {
    readonly accountId: string;
    passcode: string;
    balance: number;
    transaction?: Transaction[];
}
