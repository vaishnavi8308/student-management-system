// FastAPI address
const API = "http://127.0.0.1:8000";


// Show selected section
function show(id) {

    document.querySelectorAll(".box").forEach(function(box) {
        box.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}


// ==========================
// ADD STUDENT
// ==========================

async function addStudent() {

    let name = document.getElementById("name").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;

    if (!name || !course || !marks) {
        alert("Please fill all fields");
        return;
    }

    let response = await fetch(
        API +
        "/students?name=" +
        encodeURIComponent(name) +
        "&course=" +
        encodeURIComponent(course) +
        "&marks=" +
        marks,
        {
            method: "POST"
        }
    );

    if (response.ok) {

        alert("Student added successfully!");

        document.getElementById("name").value = "";
        document.getElementById("course").value = "";
        document.getElementById("marks").value = "";

    } else {

        alert("Error adding student");
    }
}


// ==========================
// VIEW STUDENTS
// ==========================

async function getStudents() {

    let response = await fetch(API + "/students");

    let result = await response.json();

    let list = document.getElementById("studentList");

    list.innerHTML = "";

    result.data.forEach(function(student) {

        list.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
            </tr>
        `;

    });
}


// ==========================
// UPDATE STUDENT
// ==========================

async function updateStudent() {

    let id = document.getElementById("updateId").value;
    let marks = document.getElementById("updateMarks").value;

    if (!id || !marks) {
        alert("Enter ID and marks");
        return;
    }

    let response = await fetch(
        API + "/students/" + id + "?marks=" + marks,
        {
            method: "PUT"
        }
    );

    if (response.ok) {

        alert("Student updated successfully!");

        document.getElementById("updateId").value = "";
        document.getElementById("updateMarks").value = "";

    } else {

        alert("Student not found");
    }
}


// ==========================
// DELETE STUDENT
// ==========================

async function deleteStudent() {

    let id = document.getElementById("deleteId").value;

    if (!id) {
        alert("Enter student ID");
        return;
    }

    let confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    let response = await fetch(
        API + "/students/" + id,
        {
            method: "DELETE"
        }
    );

    if (response.ok) {

        alert("Student deleted successfully!");

        document.getElementById("deleteId").value = "";

    } else {

        alert("Student not found");
    }
}


// Show Add Student when page opens
show("add");
