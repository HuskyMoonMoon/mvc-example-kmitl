import { html } from "lit-ntml";

export const render = (page: string, child: Promise<string>) => {
    return html`<!doctype html>
    <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="/assets/favicon.ico">

        <title>MVC Bank</title>

        <!-- Bootstrap core CSS -->
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="/assets/navbar-top-fixed.css" rel="stylesheet">
        </head>

        <body>

        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a class="navbar-brand" href="#">MVC Bank</a>
            <button
            class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item ${page.toLowerCase() === "index" ? "active" : ""}">
                <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item ${page.toLowerCase() === "add" ? "active" : ""}">
                <a class="nav-link" href="/add">Add</a>
                </li>
            </ul>
            </div>
        </nav>

        <main role="main" class="container">
        ${child}
        </main>

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
        <script>
            window.jQuery || 
                document.write('<script src="/assets/assets/js/vendor/jquery-slim.min.js"><\\/script>')
        </script>
        <script src="/assets/js/vendor/popper.min.js"></script>
        <script src="/assets/js/bootstrap.min.js"></script>
        </body>
    </html>`;
};