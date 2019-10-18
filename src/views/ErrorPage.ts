import { html } from "lit-ntml";

import * as BaseTemplate from "app/views/BaseTemplate";

export const render = (title: string, err?: Error) => {
    return BaseTemplate.render(title.toLowerCase(), html`
    <h1>${title}</h1>
    ${err ? html`<div class="alert alert-danger" role="alert">
        ${err.message}
    </div>` : ""}`);
};