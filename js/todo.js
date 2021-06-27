const toDoForm = document.getElementById("todo-form")
const toDoInput = toDoForm.querySelector("input")
const toDoPriority = toDoForm.querySelector("select")
const toDoList = document.getElementById("todo-list")

const TODOS_KEY = "todos"
let toDos = []
const priorities = {
  first: 1,
  second: 2,
  third: 3,
}


function saveToDos() {
  // 배열이나 object를 문자화 stringfy < -> parse
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function deleteToDo(event){
  const li = event.target.parentElement
  li.remove()
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id))
  saveToDos()
}

function updateToDo(event) {
  const span = event.target
  const li = event.target.parentElement
  span.classList.toggle("completed")
  toDos = toDos.map((toDo)=> {
    if (toDo.id === parseInt(li.id)){
      const newToDo = {
        id: toDo.id,
        text: toDo.text,
        completd: !toDo.completd,
        priority: toDo.priority,
      }
      return newToDo
    }
    return toDo
  })
  saveToDos()
}

function paintToDo(newTodo) {
  const li = document.createElement("li")
  li.id = newTodo.id
  const span = document.createElement("span")
  if (newTodo.completed){
    span.classList.add('completed')
  }
  span.innerText = newTodo.text
  span.addEventListener("click", updateToDo)

  const icon = document.createElement("i")
  icon.classList.add("fas","fa-check","check")
  icon.addEventListener("click", deleteToDo)
  
  const spanPriority = document.createElement("span")
  spanPriority.classList.add(newTodo.priority)
  spanPriority.innerText = priorities[newTodo.priority]
  
  li.appendChild(spanPriority)
  li.appendChild(span)
  li.appendChild(icon)
  toDoList.appendChild(li)
}

function handleToDoSubmit(event) {
  event.preventDefault()
  const newTodo = toDoInput.value
  toDoInput.value = ""
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    completed: false,
    priority: toDoPriority.value,
  }
  console.log()
  toDos.push(newTodoObj)
  paintToDo(newTodoObj)
  saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if (savedToDos){
  const parsedToDos = JSON.parse(savedToDos)
  toDos = parsedToDos
  parsedToDos.forEach(paintToDo)
}

