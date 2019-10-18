import { html } from "lit-ntml";

import * as BaseTemplate from "app/views/BaseTemplate";

export const render = (title: string, err?: Error) => {
    return BaseTemplate.render(title.toLowerCase(), html`
    <h1>${title}</h1>
    ${err ? `<div class="alert alert-danger" role="alert">
        ${err.message}
    </div>` : ""}
    <form action="/${title.toLowerCase()}" method="POST">
        <div class="form-group">
            <label for="amount"><b>Amount</b></label>
            <input type="text" class="form-control" placeholder="Enter amount" name="amount" required>
        </div>
        <button type="submit" class="btn">Submit</button>
        <button class="btn btn-danger" onClick="window.location = '/'">Cancel</button>
    </form>`);
};