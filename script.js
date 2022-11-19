"use strict";

let baseUrl = "https://n36-todolist.herokuapp.com";
let authToken = localStorage.getItem("token");

function getUser() {

    fetch(`${baseUrl}/todos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: authToken,
            },
        }).then((response) => response.json())
        .then((res) => renderData(res))
}
getUser();

function renderData(data = []) {

    data.length > 0 ? data.forEach((el) => {
        const tr = createElement("tr", "item", ` <td>${el.id}</td> <td>${el.user_name}</td>
        <td><button class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-edit="${el.id}">Edit</button></td>
        <td><button class="btn btn-danger" data-del="${el.id}">Delete</button></td>`)

        $('tbody').appendChild(tr)
    }) : console.log("empty");
};


const addUser = () => {
    const userName = $('#userName').value.trim();
    // const userScore = $('#userScore').value.trim();
    if (userName.length === 0) {
        $('.toastify').style.transform = "translateY(0%)"
        $('.toastify').style.background = "black"
        $('.toastify').innerHTML = `<h5 class="text-white">Malumot yetarli emas</h5>`

        setTimeout(() => {
            $('.toastify').style.transform = "translateY(-300%)"
        }, 1000)
    } else {
        $('.toastify').style.transform = "translateY(0%)"
        $('.toastify').style.background = "black"
        $('.toastify').innerHTML = `<h5 class="text-success" > Malumotlar Qo'shildi </h5>`

        setTimeout(() => {
            $('.toastify').style.transform = "translateY(-300%)"

            fetch(`${baseUrl}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: authToken,
                },
                body: JSON.stringify({
                    text: userName,
                })
            })
        }, 2000)
        setTimeout(() => {
            window.location.reload()
        }, 3000)
    }
}

$('#send').addEventListener('submit', () => {
    e.preventDefault()
    addUser()
})


$('tbody').addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-danger')) {
        $('.toastify').style.transform = "translateY(0%)"
        $('.toastify').style.background = "black"
        $('.toastify').innerHTML = `<h5 class="text-danger">Malumotlar O'chirildi</h5>`

        setTimeout(() => {
            $('.toastify').style.transform = "translateY(-300%)"
            let id = e.target.getAttribute('data-del')
            deleteUser(id)
        }, 2000)
    }

})

const deleteUser = (id) => {

    fetch(`${baseUrl}/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            token: authToken,
        },
        body: JSON.stringify({})
    });
    setTimeout(() => {
        window.location.reload()
    }, 3000)
}

//  edit function ===================

$('tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-dark')) {
        let id = e.target.getAttribute('data-edit');
        localStorage.setItem("editUser", id);

        fetch(`${baseUrl}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: authToken,
                }
            })
            .then((res => res.json()))
            .then((result => setValue(result)))
            .catch((err) => console.log(err))
    }
});

const updateUser = () => {
    let id = localStorage.getItem('editUser');

    let newUser = $('#userEdit').value.trim();
    // let newScore = $('#scoreEdit').value.trim();

    if (newUser.length === 0) {
        $('.toastify').style.transform = "translateY(0%)"
        $('.toastify').style.background = "black"
        $('.toastify').innerHTML = `<h5 class="text-white">Malumot yetarli emas</h5>`

        setTimeout(() => {
            $('.toastify').style.transform = "translateY(-300%)"
        }, 1000)
    } else {
        
        $('.toastify').style.transform = "translateY(0%)"
        $('.toastify').style.background = "black"
        $('.toastify').innerHTML = `<h5 class="text-info">Malumotlar o'zgartirildi</h5>`
        setTimeout(() => {
            
            $('.toastify').style.transform = "translateY(-300%)"
            fetch(`${baseUrl}/todos/${id}`, {
                
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: authToken
                },
                body: JSON.stringify({
                    body: newUser,
                    // score: newScore
                })
            }).then((res) => res.json()).then((res) => console.log(res))
            

        }, 2000)
    }
}


$('#sendEdit').addEventListener('submit', () => {
    updateUser()
})

console.log($('#sendEdit'));

function setValue(data) {
    $('#userEdit').value = data.user_name;
    // $('#scoreEdit').value = data.score;
}


function logined() {
    let userName = localStorage.getItem("userName");
    if (userName) {
        $('#login_user').innerHTML = `${userName}`;
    } else {
        window.location.replace('./login.html')
    }
}

logined();

$('#out').addEventListener('click', () => {
    localStorage.clear()
    logined()
});