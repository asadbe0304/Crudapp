"use strict";

const BASEURL = "https://n36-todolist.herokuapp.com";

const registration = () => {
    const userName = $('#exampleInputEmail1').value.trim();
    const userPass = $('#exampleInputPassword1').value.trim();

    const params = {
        userName: userName,
        userPassword: userPass
    };


    fetch(`${BASEURL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
        .then((result) => result.json())
        .then(res => {
            console.log(res);
            if (res.message) {
                $('.modal-toast').innerHTML = `
            <strong>${res.message}</strong>
            `
                $('.modal-toast').classList.remove('hide-toast');

                setTimeout(() => {
                    $('.modal-toast').classList.add('hide-toast');

                }, 2000)
            }

            if (res.token) {
                $('.modal-toast').classList.remove('alert-danger');
                $('.modal-toast').classList.add('alert-success');
                $('.modal-toast').innerHTML = `<strong>${"REGISTRATION SUCCESFULLY"}</strong>`;
                $('.modal-toast').classList.remove('hide-toast');
                setTimeout(() => {
                    $('.modal-toast').classList.add('hide-toast');
                    window.location.replace("./login.html")
                }, 2000)
            }
        })
}
$('#sign').addEventListener('submit', (e) => {
    e.preventDefault()
    registration()
})