import { html } from "lit-ntml";

import * as BaseTemplate from "app/views/BaseTemplate";

export const render = (err?: Error) => {
    return BaseTemplate.render("Transfer", html`
    <h1>Transfer</h1>
    ${err ? html`<div class="alert alert-danger" role="alert">
        ${err.message}
    </div>` : ""}
    <form action="/transfer" method="POST">
        <div class="form-group">
            <label for="amount"><b>Amount</b></label>
            <input type="text" class="form-control" placeholder="Enter amount" name="amount" required>
        </div>
        <div class="form-group">
            <label for="toAccount"><b>To account</b></label>
            <input type="text" class="form-control" placeholder="account id" name="toAccount" required>
        </div>
        <br/>
        <button class="btn" type="submit">Submit</button>
        <button class="btn btn-danger" onClick="window.history.back()">Cancel</button>
    </form>`);
};