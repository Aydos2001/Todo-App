const formTask = document.querySelector("#form-task")
const inputTask = document.querySelector("#input-task")
const list = document.querySelector("ul")
const timeData = document.querySelector("#time")
const dateData = document.querySelector("#date")
const modal = document.querySelector("#modal")
const overlay = document.querySelector("#overlay")
const closeBtn = document.querySelector("#close-btn")
const formEdit = document.querySelector("#form-edit")
const inputEdit = document.querySelector("#input-edit")
let updateTaskId;


const regEx = /^.{3,40}$/
let todos = []

if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify(todos))
} else {
    todos = JSON.parse(localStorage.getItem("todos"))
}

function setTimeDate() {
    const date = new Date()
    const time = date.toTimeString().slice(0, 8)
    const year = date.toLocaleString().slice(0, 10).replaceAll(".", "-")
    timeData.textContent = time
    dateData.textContent = year
}

setInterval(setTimeDate, 1000)

function getTodosRender(array) {
    list.innerHTML = ""
    if (array && array?.length > 0) {
        array.forEach(element => {
            list.innerHTML += `
            <li>
            <div class="task-text">
                <div class="checkbox ${element.complate ? "active" : ""}" onclick="complateTodo(${element.id})">
                    <i class='bx bx-check'></i>
                </div>
                <div>
                    <h2>
                        ${element.title}
                    </h2>
                    <p>${element.date}</p>
                </div>
            </div>
            <div class="task-btns">
                <button class="btn btn-update" onclick="setTodoId(${element.id})">
                    <i class='bx bxs-edit-alt'></i>
                </button>
                <button class="btn btn-delete" onclick="deleteTodo(${element.id})">
                    <i class='bx bxs-trash-alt'></i>
                </button>
            </div>
        </li>
            `
        });
    } else {
        list.innerHTML = "<div class='data-not'><i class='bx bx-message-rounded-error'></i> Todo not fount!</div>"
    }
}

getTodosRender(JSON.parse(localStorage.getItem("todos")))

function setTodoData(message) {
    const date = new Date()
    const time = date.toTimeString().slice(0, 5)
    const year = date.toLocaleString().slice(0, 10).replaceAll(".", "-")
    const newTodo = {
        id: Date.now(),
        title: message,
        date: `${time} ${year}`,
        complate: false
    }
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
    getTodosRender(todos)
}


// deleteTask
function deleteTodo(id) {
    todos = todos.filter(item => item.id !== id)
    localStorage.setItem("todos", JSON.stringify(todos))
    getTodosRender(todos)
}

//complateTodo
function complateTodo(id) {
    todos = todos.map(item => {
        if (item.id === id) {
            return {
                ...item,
                complate: item.complate ? false : true
            }
        } else {
            return item
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
    getTodosRender(todos)
}

//update Todo
function setTodoId(id) {
    updateTaskId = id
    openModal()
    inputEdit.value = todos.find(item => item.id === id).title
}

function updateTodo(message) {
    const date = new Date()
    const time = date.toTimeString().slice(0, 5)
    const year = date.toLocaleString().slice(0, 10).replaceAll(".", "-")
    const newTodo = {
        id: Date.now(),
        title: message,
        date: `${time} ${year}`,
        complate: false
    }
    todos = todos.map(item => {
        if(item.id === updateTaskId) {
            return newTodo
        } else {
            return item
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos))
    getTodosRender(todos)
    closeModal()
}

//modalSectioin

function openModal() {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

function closeModal() {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}





closeBtn.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)


inputTask.addEventListener("keyup", (e) => {
    if (regEx.test(e.target.value) && e.target.value.trim().length > 2) {
        inputTask.style.borderColor = "green"
    } else {
        inputTask.style.borderColor = "red"
    }
})

formTask.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputValue = e.target["input-task"].value
    if (regEx.test(inputValue) && inputValue.trim().length > 2) {
        setTodoData(inputValue)
        formTask.reset()
        inputTask.nextElementSibling.style.display = "none"
        inputTask.nextElementSibling.textContent = ""
    } else {
        inputTask.nextElementSibling.style.display = "inline-block"
        inputTask.nextElementSibling.textContent = "Mag'liwmat min 3 belgi max 40 belgi"
    }

})

inputEdit.addEventListener("keyup", (e) => {
    if (regEx.test(e.target.value) && e.target.value.trim().length > 2) {
        inputEdit.style.borderColor = "green"
    } else {
        inputEdit.style.borderColor = "red"
    }
})

formEdit.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputValue = e.target["input-edit"].value
    if (regEx.test(inputValue) && inputValue.trim().length > 2) {
        updateTodo(inputValue)
        formEdit.reset()
        inputEdit.nextElementSibling.style.display = "none"
        inputEdit.nextElementSibling.textContent = ""
    } else {
        inputEdit.nextElementSibling.style.display = "inline-block"
        inputEdit.nextElementSibling.textContent = "Mag'liwmat min 3 belgi max 40 belgi"
    }

})