const express = require("express");
const path = require("path");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// import bodyParser from "body-parser";
app.use(bodyParse.urlencoded({ extended: true }))
// import _ from "lodash";

// to run static files (eg: CSS > styles.css)
app.use(express.static("public"));
app.set('view engine', 'ejs');
// for avaiding the warning for strickQuery
mongoose.set('strictQuery', true);

// mongoDB Connection
mongoose.connect('mongodb://localhost:27017/collegeERP');

// the mongoose schema and model 
const stdEduSchema = mongoose.Schema({
    edu_type: { type: String, required: true },
    board: { type: String, required: true },
    inst: { type: String, required: true },
    edu_score: { type: Number, required: true }
});

const examSubject = mongoose.Schema({
    name: { type: String, required: true },
    max_mark: { type: Number, required: true },
    obt_mark: { type: Number, required: true }
});

const stdResutl = mongoose.Schema({
    sem: { type: Number, required: true },
    exam_name: { type: String, required: true },
    exam_date: { type: Date, required: true },
    score: [examSubject]
});

const feeType = mongoose.Schema({
    tuition: { type: Number, required: true },
    lib: { type: Number, required: true },
    canteen: { type: Number, required: true },
    sports: { type: Number, required: true }
});

const stdFee = mongoose.Schema({
    fee_type: feeType,
    paid: feeType,
    pay_date: { type: Date, required: true }
});

// Student Schema
const studentSchema = mongoose.Schema({
    std_roll: { type: Number, required: true },
    std_dob: { type: String, required: true },
    std_name: { fname: { type: String, required: true }, lname: { type: String } },
    course: { name: { type: String, required: true }, year: { type: Number, required: true } },
    std_contact: { type: Number, required: true },
    std_email: { type: String, required: true },
    std_addr: { type: String, required: true },
    std_family: {
        father: { name: { type: String, required: true }, contact: { type: Number, required: true }, occupation: String },
        mother: { name: { type: String, required: true }, contact: Number, occupation: String }
    },
    std_edu: [stdEduSchema],
    std_result: stdResutl,
    std_fee: stdFee
});

// mongoose model for schema working
const StdEducation = mongoose.model("Education", stdEduSchema);
const ExamSubject = mongoose.model("ExamSubject", examSubject);
const StdResult = mongoose.model("StdResult", stdResutl);
const FeeType = mongoose.model("FeeType", feeType);
const StdFee = mongoose.model("StdFee", stdFee);
const Student = mongoose.model("Student", studentSchema);

// the student here have been saved into the database
{
// some student data
const AnkitEdu_10 = new StdEducation({ edu_type: "highSch", board: "Delhi Board", inst: "Kamla Nahru Kersi, Degree College", edu_score: 80 });
const AnkitEdu_12 = new StdEducation({ edu_type: "interSch", board: "Delhi Board", inst: "Kamla Nehru Kersi, Degree College", edu_score: 78 });
const AnkitEdu_grad = new StdEducation({ edu_type: "grad", board: "Rajasthan Board", inst: "Jaipur College, Rajasthan University", edu_score: 79 })

// Student Ankit Details
const Ankit = new Student({
    std_roll: 2101920140027,
    std_dob: '2000-01-01',
    std_name: { fname: "Ankit", lname: "Aggrawal" },
    course: { name: "MCA", year: 2 },
    std_contact: 976109908,
    std_email: "agrawalankit129@gmail.com",
    std_addr: "Sarita Vihar, Gurugram, UP",
    std_family: {
        father: { name: "Naresh Chandra", contact: 908998768, occupation: "Business" },
        mother: { name: "Pusha Devi", contact: 908998768, occupation: "Housewife" }
    },
    std_edu: [AnkitEdu_10, AnkitEdu_12, AnkitEdu_grad],
    std_result: {
        sem: 2, exam_name: "PUT", exam_date: '2022-12-09',
        score: [
            { name: "Automata", max_mark: 100, obt_mark: 76 },
            { name: "Object Oriented Programming", max_mark: 100, obt_mark: 70 },
            { name: "Operating System", max_mark: 100, obt_mark: 68 },
            { name: "Data Structure", max_mark: 100, obt_mark: 79 },
            { name: "DBMS", max_mark: 100, obt_mark: 87 },
            { name: "Cyber Security", max_mark: 100, obt_mark: 80 }
        ]
    },
    std_fee: {
        fee_type: { tuition: 106120, lib: 1200, canteen: 600, sports: 200 },
        paid: { tuition: 100000, lib: 1200, canteen: 500, sports: 0 },
        pay_date: '2022-12-19'
    }
})

// Student Tushar Details
const TusharEdu_10 = new StdEducation({ edu_type: "highSch", board: "UP Board", inst: "Saraswati Shishu Mandir, Inter College", edu_score: 89.67 });
const TusharEdu_12 = new StdEducation({ edu_type: "interSch", board: "UP Board", inst: "Saraswati Shishu Mandir, Inter College", edu_score: 86.00 });
const TusharEdu_grad = new StdEducation({ edu_type: "grad", board: "Delhi Board", inst: "Shivaji College, Delhi University", edu_score: 70.8 })

const Tushar = new Student({
    std_roll: 2101920140180,
    std_dob: '2001-02-21',
    std_name: { fname: "Tushar", lname: "Dhiman" },
    course: { name: "MCA", year: 2 },
    std_contact: 7668158805,
    std_email: "tushardhiman123@gmail.com",
    std_addr: "Rampuri, Muzaffarnagar, UP",
    std_family: {
        father: { name: "Bhisham Singh Dhiman", contact: 9831223453, occupation: "Carpenter" },
        mother: { name: "Uma Devi", contact: 7252342434, occupation: "Housewife" }
    },
    std_edu: [TusharEdu_10, TusharEdu_12, TusharEdu_grad],
    std_result: {
        sem: 3, exam_name: "ST 2", exam_date: '2021-11-27',
        score: [
            { name: "Artificial Intelligence", max_mark: 100, obt_mark: 74 },
            { name: "Software Engineering", max_mark: 100, obt_mark: 80 },
            { name: "Cloud Computing", max_mark: 100, obt_mark: 65 },
            { name: "Web Technologies", max_mark: 100, obt_mark: 89 },
            { name: "Computer Networks", max_mark: 100, obt_mark: 77 },
            { name: "Cyber Security", max_mark: 100, obt_mark: 83 }
        ]
    },
    std_fee: {
        fee_type: { tuition: 106120, lib: 1200, canteen: 600, sports: 200 },
        paid: { tuition: 100000, lib: 1200, canteen: 500, sports: 0 },
        pay_date: '2022-12-19'
    }
})

// Student Atul Details
const AtulEdu_10 = new StdEducation({ edu_type: "highSch", board: "UP Board", inst: "Madhyamik Shiksha Parishad, Inter College", edu_score: 83.67 });
const AtulEdu_12 = new StdEducation({ edu_type: "interSch", board: "UP Board", inst: "Madhyamik Shiksha Parishad, Inter College", edu_score: 80.13 });
const AtulEdu_grad = new StdEducation({ edu_type: "grad", board: "UP Board", inst: "Thomas College, Lucknow University", edu_score: 78.18 })

const Atul = new Student({
    std_roll: 2101920140114,
    std_dob: '1999-01-02',
    std_name: { fname: "Atul", lname: "Sharma" },
    course: { name: "MCA", year: 2 },
    std_contact: 8373774637,
    std_email: "saraswatatul001@gmail.com",
    std_addr: "Greater Noida, UP",
    std_family: {
        father: { name: "Lalta Prasad Sharma", contact: 9831223453, occupation: "Business" },
        mother: { name: "Saroj Devi", contact: 7252342434, occupation: "Housewife" }
    },
    std_edu: [AtulEdu_10, AtulEdu_12, AtulEdu_grad],
    std_result: {
        sem: 1, exam_name: "ST 1", exam_date: '2021-08-15',
        score: [
            { name: "Problem Solving using C", max_mark: 100, obt_mark: 75 },
            { name: "Fundamental of Computer & Emerging Technologies", max_mark: 100, obt_mark: 76 },
            { name: "Principles of Management & Communication", max_mark: 100, obt_mark: 65 },
            { name: "Discrete Mathematics", max_mark: 100, obt_mark: 80 },
            { name: "Computer Organisation & Architecture", max_mark: 100, obt_mark: 83 }
        ]
    },
    std_fee: {
        fee_type: { tuition: 106120, lib: 1200, canteen: 600, sports: 200 },
        paid: { tuition: 100000, lib: 1200, canteen: 500, sports: 0 },
        pay_date: '2021-11-11'
    }
})

// has been saved previously (db: collegeERP/students)
// Ankit.save();
// Tushar.save();
// Atul.save();
}

// making the course schema
const courseSchema = mongoose.Schema({
    name: {type: String, require: true},
    duration: {type: String, require: true},
    c_code: {type: Number, require: true}
});

const Course = mongoose.model('Course', courseSchema);

// making a Teacher Schema
const teacherSchema = mongoose.Schema({
    tec_id: {type: Number, require: true},
    tec_dob: {type: Number, require: true},
    tec_name: {fname: {type: String, require: true}, lname: {type: String}},
    tec_email: {type: String, require: true},
    tec_contact: {type: String, require: true},
    ted_joinyr: {type: String, require: true},
    tec_subj: [{type: String}],
    tec_spcl: {type: String, require: true},
    tec_addr: {type: String, required: true}
})

const Teacher = mongoose.model('Teacher', teacherSchema);

var user;
var formName;
var headerName;
var headerGreet;


// Admin manager
app.route("/admin")
    .get((req, res)=>{
        user = "Admin";
        formName = "/admin";
        headerName = "admin_home_opt";
        headerGreet = "The Admin panel";

        res.render('admin/admin-login', {
            header_title: user, 
            user_type: user,
            form_name: formName, 
            header_name: headerName, 
            header_greet: headerGreet
        })
    })
    .post((req, res)=>{
        const adminId = req.body.adminId;
        const adminPass = req.body.adminPass;

        if(adminId == "admin" && adminPass == "admin") {
            
            console.log("admin-post");
            formName = "/admin-home";
            
            res.render('admin/admin-home', {
                header_title: user, 
                form_name: formName, 
                header_name: headerName, 
                header_greet: headerGreet
            });
        } else {
            console.log("admin-post-fails");
            res.send("<h3>Something is not Right!</h3><h4>Try Again!</h4>")
        }
    });


// admin header options
let adminHeader = ['form', 'but-text'];
app.route('/admin-home')
    .get((req, res)=>{
        // console.log("redirect looks for the get method");
        user = "Admin";
        formName = "/admin";
        headerName = "admin_home_opt";
        headerGreet = "The Admin panel";

        res.render('admin/admin-home', {
            header_title: user, 
            user_type: user,
            form_name: formName, 
            header_name: headerName, 
            header_greet: headerGreet
        }) 
    })
    .post((req, res)=>{
        console.log(req.body);
        if(req.body.admin_home_opt == "student" || req.body.adminAction == "admin-student") {
            user = "Admin",
            headerGreet = "Manage Students",
            adminHeader = ['/admin-student', 'Student']

            Student.find((err, students)=>{
                console.log("we are getting the students");
                
                res.render('admin/show/show-student', {
                    students: students,
                    adminHeader: adminHeader,
                    header_title: user, 
                    form_name: formName, 
                    header_name: headerName, 
                    header_greet: headerGreet
                });
            })
        }else if(req.body.admin_home_opt == "teacher" || req.body.adminAction == "admin-teacher") {
            user = "Admin",
            headerGreet = "Manage Teacher"
            adminHeader = ['/admin-teacher', 'Teacher']

            res.render('admin/show/show-teacher', {
                adminHeader: adminHeader,
                header_title: user, 
                form_name: formName, 
                header_name: headerName, 
                header_greet: headerGreet
            });
        }else if(req.body.admin_home_opt == "course" || req.body.adminAction == "admin-course") {
            user = "Admin",
            headerGreet = "Manage Course"
            adminHeader = ['/admin-course', 'Course']

            res.render('admin/show/show-course', {
                adminHeader: adminHeader,
                header_title: user, 
                form_name: formName, 
                header_name: headerName, 
                header_greet: headerGreet
            });
        }else if(req.body.admin_home_opt == "logout") {
            res.redirect('/');
        }else if(req.body.admin_home = "home"){
            res.redirect("/admin-home");
            // both 'admin-home' and '/admin-home' are same for redirect routing
        }
    });

// admin student handler
app.route('/admin-student')
    .get((req, res)=>{
        console.log("get the students");
        Student.find((err, students)=>{
            console.log("we are getting the students");
            
            res.render('admin/show/show-student', {
                students: students,
                adminHeader: adminHeader,
                header_title: user, 
                form_name: formName, 
                header_name: headerName, 
                header_greet: headerGreet
            });
        })
    })
    .post((req, res)=>{
        console.log(req.body);
        if(req.body.admin_rest_header_opt == "get-std"){
            Student.find((err, students)=>{
                console.log("we are getting the students");
                console.log(stds);
                res.render('admin/show/show-student', {
                    students: students,
                    adminHeader: adminHeader,
                    header_title: user, 
                    form_name: formName, 
                    header_name: headerName, 
                    header_greet: headerGreet
                });
            })
        }else if(req.body.admin_rest_header_opt == "add-std"){
            console.log("add-student");
            res.render("admin/add/add-student", {
                adminHeader: adminHeader,
                header_title: user, 
                form_name: formName, 
                header_name: headerName, 
                header_greet: headerGreet
            });
        }else if(req.body.admin_rest_header_opt == "dlt-std"){
            console.log("delete-student");
            res.render("admin/remove/remove-student", {
                adminHeader: adminHeader,
                header_title: user, 
                form_name: formName, 
                header_name: headerName, 
                header_greet: headerGreet
            });
        }
    })


// add new student
const stds = [2101920140180, 2101920140027, 2101920140114, 2101920140181];
app.post('/new-student', (req, res)=>{
    console.log(req.body);

    const newEdu_10 = new StdEducation({
        edu_type: req.body.edu_type[0],
        board: req.body.high_board,
        inst: req.body.high_inst,
        edu_score: req.body.high_perc
    });
    const newEdu_12 = new StdEducation({
        edu_type: req.body.edu_type[1],
        board: req.body.inter_board,
        inst: req.body.inter_inst,
        edu_score: req.body.inter_perc
    });
    const newEdu_grad = new StdEducation({
        edu_type: req.body.edu_type[2],
        board: req.body.grad_board,
        inst: req.body.grad_inst,
        edu_score: req.body.grad_perc
    });
    const newStudent = new Student({
        std_roll: req.body.roll,
        std_dob: req.body.dob,
        std_name: { fname: req.body.fname, lname: req.body.lname },
        course: { name: req.body.course, year: req.body.course_year },
        std_contact: req.body.contact,
        std_email: req.body.email,
        std_addr: req.body.addr,
        std_family: {
            father: { name: req.body.father_name, contact: req.body.father_contact, occupation: req.body.father_occu },
            mother: { name: req.body.mother_name, contact: req.body.mother_contact, occupation: req.body.mother_occu }
        },
        std_edu: [newEdu_10, newEdu_12, newEdu_grad]
    });
    Student.find({std_roll: req.body.roll}, (err, result)=>{
        if(result){
            console.log("student already exists!");
            res.redirect('/admin-student');
        } else {
            console.log("new student added!");
            stds.push(req.body.roll);
            console.log(stds);
            // res.write("<script> alert('Student has been Added successfully!'); </script>");
            newStudent.save();
            res.redirect('/admin-student');
        }
    })
});

// delete a student
app.post('/remove-student', (req, res)=>{
    console.log("delete request");
    console.log(stds);
    console.log(req.body.dltRoll);
    if(stds.includes(req.body.dltRoll)){
        Student.deleteOne({std_roll: req.body.dltSRoll}, (err, deleteItem)=>{

        })
        res.redirect("/admin-home");
    }
});


// MAIN app starts from here --------------
app.get("/", (req, res) => {
    user = "Alma ERP";
    formName = '/';
    headerName = "home_header_options";
    headerGreet = "The College ERP";

    res.render('home', { header_title: user, header_greet: headerGreet, form_name: formName, header_name: headerName });
    
})

// getting backb from the page
app.post('/', (req, res) => {

    res.render('home', {
        header_title: user,
        header_greet: headerGreet,
        form_name: formName,
        header_name: headerName
    });
})

// the login requests handler
app.post("/home-login", (req, res) => {

    user = req.body.user_type;
    console.log("login: " + user);

    switch (user) {
        case "Student":
            formName = '/std-home';
            headerGreet = "The Student Portal";
            headerName = "std_header_options";
            res.render('login',
                {
                    header_title: user,
                    user_type: user,
                    header_greet: headerGreet,
                    form_name: formName,
                    header_name: headerName
                });
            break;
        case "Teacher":
            formName = '/teacher-home';
            headerGreet = "The Teacher Portal";
            headerName = "teacher_header_options";
            res.render('login',
                {
                    header_title: user,
                    user_type: user,
                    header_greet: headerGreet,
                    form_name: formName,
                    header_name: headerName
                });
            break;
        case "Parent":
            formName = '/prnt-home';
            headerGreet = "The Parent Portal";
            headerName = "prnt_header_options";
            res.render('login',
                {
                    header_title: user,
                    user_type: user,
                    header_greet: headerGreet,
                    form_name: formName,
                    header_name: headerName
                });
            break;
        default: console.log(user); break;
    }
});

// student-portal requests
var roll = 0, pswd = '';

app.post('/std-home', (req, res) => {

    roll = req.body.userId;
    pswd = req.body.password.toString();
    // console.log(roll + " " + pswd);
    Student.findOne({ std_roll: roll, std_dob: pswd }, (err, result) => {
        if (err) console.log(err);
        else {
            if (!result) {
                console.log("Wrong details");
                res.redirect('/');
            }
            else {
                console.log(result.std_name);
                user = result.std_name.lname + ", " + result.std_name.fname;
                formName = "/std-action";
                console.log(user);
                res.render('student-options/std-home',
                    {
                        header_title: user,
                        header_greet: headerGreet,
                        form_name: formName,
                        header_name: headerName
                    });
            }
        }
    });
})

// std-action request control
app.post('/std-action', (req, res) => {
    Student.findOne({ std_roll: roll, std_dob: pswd }, (err, result) => {
        if (err) console.log(err);
        else {
            if (!result) {
                console.log("Wrong details");
                res.redirect('/');
            }
            else {
                // console.log(result);
                user = result.std_name.lname + ", " + result.std_name.fname;
                console.log(user);
                
                switch (req.body.std_header_options) {
                    case 'home':
                        res.render('student-options/std-home',
                            {
                                header_title: user,
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                    case 'profile':
                        res.render('student-options/std-profile',
                            {
                                header_title: user,
                                fname: result.std_name.fname, lname: result.std_name.lname, contact: result.std_contact, email: result.std_email, addr: result.std_addr,
                                father_name: result.std_family.father.name, father_contact: result.std_family.father.contact, father_occup: result.std_family.father.occupation,
                                mother_name: result.std_family.mother.name, mother_contact: result.std_family.mother.contact, mother_occup: result.std_family.mother.occupation,
                                clg_roll: result.std_roll, course_name: result.course.name, course_year: result.course.year,
                                high_board: result.std_edu[0].board, high_name: result.std_edu[0].inst, high_score: result.std_edu[0].edu_score,
                                inter_board: result.std_edu[1].board, inter_name: result.std_edu[1].inst, inter_score: result.std_edu[1].edu_score,
                                grad_board: result.std_edu[2].board, grad_name: result.std_edu[2].inst, grad_score: result.std_edu[2].edu_score,
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                    case 'logout':
                        res.redirect('/');
                        break;
                }
                // std_header_option header ends here

                switch (req.body.std_options) {
                    case 'profile':
                        console.log(result);
                        res.render('student-options/std-profile',
                            {
                                header_title: user,
                                fname: result.std_name.fname, lname: result.std_name.lname, contact: result.std_contact, email: result.std_email, addr: result.std_addr,
                                father_name: result.std_family.father.name, father_contact: result.std_family.father.contact, father_occup: result.std_family.father.occupation,
                                mother_name: result.std_family.mother.name, mother_contact: result.std_family.mother.contact, mother_occup: result.std_family.mother.occupation,
                                clg_roll: result.std_roll, course_name: result.course.name, course_year: result.course.year,
                                high_board: result.std_edu[0].board, high_name: result.std_edu[0].inst, high_score: result.std_edu[0].edu_score,
                                inter_board: result.std_edu[1].board, inter_name: result.std_edu[1].inst, inter_score: result.std_edu[1].edu_score,
                                grad_board: result.std_edu[2].board, grad_name: result.std_edu[2].inst, grad_score: result.std_edu[2].edu_score,
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                    case 'atten':
                        res.render('student-options/std-atten',
                            {
                                header_title: user,
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                    case 'result':
                        var rollInt = Math.floor((result.std_roll)/1000);
                        var rollRem = () => {return ((result.std_roll)%1000)<100?'0'+((result.std_roll)%1000):((result.std_roll)%1000); };
                        var obtained = 0, total = 0;
                        result.std_result.score.forEach(sub => {
                            obtained += sub.obt_mark;
                            total += sub.max_mark;
                        });
                        var resStatus = () => { return ((obtained/total)*100)>33?"Pass":"Fail"; };
                        res.render('student-options/std-result',
                            {
                                header_title: user,
                                course: result.course.name,
                                exam_type: result.std_result.exam_name, sem: result.std_result.sem,
                                total_sub: result.std_result.score.length, exam_date: (new Date(result.std_result.exam_date)).toLocaleDateString(),
                                roll_int: rollInt, roll_remainder: rollRem(),
                                std_name: result.std_name.fname+" "+result.std_name.lname , father_name: result.std_family.father.name,
                                score: result.std_result.score, 
                                result_status: resStatus(), total_obt: obtained, total_max: total,
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                    case 'updates':
                        res.render('student-options/std-updates',
                            {
                                header_title: user,
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                    case 'placement':
                        res.render('student-options/std-placement',
                            {
                                header_title: user,
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                    case 'fee':
                        res.render('student-options/std-fee',
                            {
                                header_title: user,
                                roll: result.std_roll,
                                course: result.course.name, year: result.course.year,
                                std_name: result.std_name.fname+" "+result.std_name.lname,
                                father_name: result.std_family.father.name, 
                                header_greet: headerGreet,
                                form_name: formName,
                                header_name: headerName
                            });
                        break;
                }
            }
        }
    });
});



// login close
app.post('/close', (req, res) => {
    user = "Alma ERP";
    formName = "/";
    headerName = "home_header_options";
    headerGreet = "The College ERP";
    res.redirect('/');
});


// to make connection with local server at port 3000
app.listen(3000, () => {
    console.log("--------> Server has Started! <-------");
})