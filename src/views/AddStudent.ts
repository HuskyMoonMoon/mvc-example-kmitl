import { html } from "lit-ntml";

import * as BaseTemplate from "app/views/BaseTemplate";

export const render = () => {
    return BaseTemplate.render("index", html`
    <p>
        <h1>Add Student</h1>

    <form action="/add" method="POST">
        <div class="form-group">
            <label for="studentId"><b>Student ID</b></label>
            <input type="text" class="form-control" placeholder="Enter Student ID" name="studentId" required>
        </div>
        <div class="form-group">
            <label for="password"><b>Password</b></label>
            <input type="password" class="form-control" placeholder="Enter Password" name="password" required>
        </div>
        <button type="submit" class="btn">Submit</button>
        <button class="btn btn-danger" onClick="window.location = '/add'">Cancel</button>
    </form>
    </p>
    `);
};