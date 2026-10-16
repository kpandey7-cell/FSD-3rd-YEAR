let form = document.querySelector("form");
let table = document.getElementById("studentTable");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("studentName").value;
    let roll = document.getElementById("rollNo").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;

    table.innerHTML += `
        <tr>
            <td>${roll}</td>
            <td>${name}</td>
            <td>${course}</td>
            <td>${marks}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
    `;

    form.reset();
});