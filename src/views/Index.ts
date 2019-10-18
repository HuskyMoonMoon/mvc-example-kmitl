import { html } from "lit-ntml";

import { BankAccount } from "app/models/BankAccount";

import * as BaseTemplate from "app/views/BaseTemplate";

export const render = (account: BankAccount) => {
    return BaseTemplate.render("index", html`
    <p>
        <h1>Welcome</h1>
        Account ID: ${account.accountId}<br/>
        Balance: ${account.balance}
    </p>
    <p>
        <h2>History</h2>
        <ul class="list-group">
        ${account.transaction ? account.transaction.map((transaction) => 
        html`<li class="list-group-item">
                <div class="col-md-8">
                    ${transaction.createdAt.toUTCString()} : ${transaction.description}
                </div>
                <div class="col-md-4">
                    ${transaction.amount}
                </div>
            </li>`)
        : "No transaction happened"}
        </ul>
    </p>`);
};