const form = document.querySelector('#my-form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const msg = document.querySelector('.msg')
const usersList = document.querySelector('#users')
let users = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []

const item = ({
    name,
    email
}) => `<li class='item'>${name} : ${email}</li>`

const update = () => {
    usersList.innerHTML = '';
    for (let user of users) {
        usersList.innerHTML += item(user)
    }
}
update()

const show_msg = (message, error = true) => {
    msg.className = error ? 'error' : 'success'
    msg.innerText = message
    setTimeout(() => {
        msg.innerHTML = '';
        msg.removeAttribute('class')
    }, 2000)
}

const onSubmit = (e) => {
    e.preventDefault()
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        show_msg(message = 'Please enter fields', error = true)
    } else {
        let user = {
            id: 1,
            name: nameInput.value,
            email: emailInput.value
        }
        users.push(user)
        window.localStorage.setItem("users", JSON.stringify(users))

        update()
        show_msg(message = 'User added successfully', error = false)
        nameInput.value = ''
        emailInput.value = ''
    }
}


form.addEventListener('submit', onSubmit)