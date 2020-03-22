import { html } from "lit-ntml";

import { IndexViewModel } from "app/viewmodels/IndexViewModel";
import * as BaseTemplate from "app/views/BaseTemplate";
import * as _  from "lodash";

export const render = (viewModel: IndexViewModel) => {
    return BaseTemplate.render("index", html`
    <p>
        <h1>Welcome</h1>
    <form action="/" method="POST">
        <div class="form-group">
            <label for="studentId"><b>Student ID</b></label>
            <input type="text" class="form-control" placeholder="Enter Student ID" name="studentId" required>
        </div>
        <div class="form-group">
            <label for="password"><b>Password</b></label>
            <input type="password" class="form-control" placeholder="Enter Password" name="password" required>
        </div>
        <button type="submit" class="btn">Submit</button>
        <button class="btn btn-danger" onClick="window.location = '/'">Cancel</button>
    </form>
    </p>
    <p>
    <h2>Current Checked In: ${viewModel.studentCount}</h2>
    ${
        _(viewModel.checkedInId).map((id) => html`<li>${id}</li>`).value()
    }
    </p>
    `);
};