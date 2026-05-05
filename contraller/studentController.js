import Student from "../models/student.js"

export function getAllstudent (req , res) {
        console.log("get req resived")
        Student.find().then(
            (student) => {
                res.json(student)
            }
        )
    }


export function createStudent(req,res) {

        if(req.user == null){
            res.status(401).json({message : "Unathorized"})
            return
        }

        /* methanin check karanawa req eka ewapu kena admin kenekda kiyla ehema natnam 
           res ekk yawanwa "Only admin can create the Student" */
        if(req.user.isAdmin == false){
            res.status(403).json({message : "Only admin can create the Student"})
            return
        }

        const newStudent = new Student(req.body)

        newStudent.save().then(
            ()=> {
                res.json(
                    {
                        message : "Student Saved successfully"
                    }
                )
            }
        )


    }