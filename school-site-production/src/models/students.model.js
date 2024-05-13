import axios from "axios"
import { api } from "./config.model"

export class Student {
    constructor(firstName, lastName, uuid, studentClass, studentSchool, email, fathername, verifyCode) {
        this.firstName = firstName
        this.lastName = lastName
        this.studentClass = studentClass
        this.studentSchool = studentSchool
        this.email = email
        this.uuid = uuid
        this.fathername = fathername
        this.verifyCode = verifyCode
    }
    
    create() {
        axios.post(api + "/students", { 
            firstName: this.firstName, 
            lastName: this.lastName, 
            uuid: this.uuid, 
            studentClass: this.studentClass, 
            studentSchool: this.studentSchool, 
            email: this.email, 
            fathername: this.fathername 
        })
        .then(response => {
            console.log('Student created successfully:', response.data);
        })
        .catch(error => {
            console.error('Error creating student:', error);
        });
    }
}