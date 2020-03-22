import { Context } from "koa";
import * as _ from "lodash";
import { BodyParam, Ctx, Get, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";

import * as addStudent from "app/views/AddStudent";
import * as errorPage from "app/views/ErrorPage";
import * as index from "app/views/Index";

import { StudentDataRepository } from "app/repositories/mock/StudentDataRepostory";
import { IndexViewModel } from "app/viewmodels/IndexViewModel";

@JsonController()
export class StudentCheckinController {
    @Inject(() => StudentDataRepository)
    private _studentDataRepository: StudentDataRepository;

    @Get("/")
    public async index() {
        const checkedInStudent = await this._studentDataRepository.getCheckedInStudent();
        const indexData: IndexViewModel = {
            studentCount: checkedInStudent.length,
            checkedInId: _(checkedInStudent).map((student) => student.studentId).value()
        };
        return index.render(indexData);
    }

    @Post("/")
    public async checkin(
        @BodyParam("studentId") studentId: string,
        @BodyParam("password") password: string,
        @Ctx() context: Context
    ) {
        if (_(studentId).isEmpty() || _(password).isEmpty()) {
            return errorPage.render("Error", new Error("Student ID or Password is empty or undefined"));
        }
        
        try {
            await this._studentDataRepository.checkin({
                studentId,
                password
            });
            context.redirect("/");
            return context;
        } catch (error) {
            return errorPage.render("Error", error);
        }
    }

    @Get("/add")
    public async studentAddPage() {
        return addStudent.render();
    }

    @Post("/add")
    public async addStudent(
        @BodyParam("studentId") studentId: string,
        @BodyParam("password") password: string,
        @Ctx() context: Context
    ) {
        if (_(studentId).isEmpty() || _(password).isEmpty()) {
            return errorPage.render("Error", new Error("Student ID or Password is empty or undefined"));
        }
        
        await this._studentDataRepository.add({
            studentId,
            password
        });
        context.redirect("/add");
        return context;
    }
}