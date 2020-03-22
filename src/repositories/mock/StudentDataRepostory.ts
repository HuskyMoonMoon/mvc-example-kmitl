import { StudentData } from "app/models/StudentData";
import * as _ from "lodash";

export class StudentDataRepository {
    private _collection: StudentData[] = [
        {
            studentId: "59050900",
            password: "1872"
        },
        {
            studentId: "59050911",
            password: "8899"
        }
    ];

    public async add(studentData: StudentData) {
        this._collection.push(studentData);
        console.log(this._collection);
    }

    public async checkin(checkinStudent: StudentData) {
        const studentData = _(this._collection).find((student) => {
            return student.studentId === checkinStudent.studentId 
                && student.password === checkinStudent.password;
        });

        if (studentData) {
            studentData.checkedIn = true;
            console.log(this._collection);
        } else {
            throw Error("Invalid student checkin");
        }
    }

    public async getCheckedInStudent() {
        const studentData = _(this._collection).filter((student) => {
            return student.checkedIn === true;
        }).value();

        return studentData;
    }
}