import { html } from "lit-ntml";

import { BankAccount } from "app/models/BankAccount";

export const render = () => {
    return html`<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="/favicon.ico">

        <title>Sign In</title>

        <!-- Bootstrap core CSS -->
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="/assets/signin.css" rel="stylesheet">
    </head>

    <body class="text-center">
        <form class="form-signin" action="/login" method="POST">
        <img class="mb-4" src="/assets/bank-flat.png" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please login</h1>
        <label for="accountId" class="sr-only">Account Id</label>
        <input type="text" id="accountId" name="accountId"
            class="form-control" placeholder="Account ID" required autofocus>
        <label for="passcode" class="sr-only">Passcode</label>
        <input type="password" id="passcode" name="passcode"
        class="form-control" placeholder="Passcode" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    </body>
    </html>`;
};