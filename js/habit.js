const habitForm = document.querySelector('#habit-form')
const habitInput = habitForm.querySelector('input')
const habitList = document.querySelector('#habit-list')
const resetBtn = document.querySelector(".habit-reset")

let habits = []
const HABIT_KEY = "habits"


function saveHabits() {
  localStorage.setItem(HABIT_KEY, JSON.stringify(habits))
}

function deleteHabit(event){
  const needToDelete = event.target.parentElement
  needToDelete.remove()
  habits = habits.filter(habit => habit.id !== parseInt(needToDelete.id))
  localStorage.setItem(HABIT_KEY, JSON.stringify(habits))
}

function checkHabit(event) {
  const li = event.target.parentElement
  li.classList.toggle("checked")
  habits = habits.map((habit)=> {
    if (habit.id === parseInt(li.id)){
      const newHabit = {
        id: habit.id,
        text: habit.text,
        checked: !habit.checked,
      }
      return newHabit
    }
    return habit
  })
  saveHabits()
}


function paintHabit(habitObj){
  const li = document.createElement('li')
  const span = document.createElement('span')
  const checkbox = document.createElement('input')
  const icon = document.createElement('i')
  li.id = habitObj.id
  span.innerText = habitObj.text
  checkbox.type="checkbox"
  if (habitObj.checked){
    li.classList.add("checked")
    checkbox.checked=true
  }
  icon.classList.add("far","fa-trash-alt")
  checkbox.addEventListener('click', checkHabit)
  icon.addEventListener("click", deleteHabit)
  li.append(span)
  li.append(checkbox)
  li.append(icon)
  habitList.append(li)
}


function submitHabit(event){
  event.preventDefault()
  const habitObj = {
    id: Date.now(),
    text: habitInput.value,
    checked: false,
  }
  habitInput.value = ""
  habits.push(habitObj)
  localStorage.setItem(HABIT_KEY, JSON.stringify(habits))
  paintHabit(habitObj)
}

function resetCheckbox() {
  habits = habits.map((habit)=> {
    const eachHabit = document.getElementById(habit.id)
    const eachCheckbox = eachHabit.querySelector("input")
    eachHabit.classList.remove("checked")
    eachCheckbox.checked =false
    const newHabit = {
      id: habit.id,
      text: habit.text,
      checked: false,
    }
    return newHabit
  })
  saveHabits()
}

const savedHabits = localStorage.getItem(HABIT_KEY)
if (savedHabits !== null){
  habits = JSON.parse(savedHabits)
  habits.forEach(paintHabit)
} 

habitForm.addEventListener("submit", submitHabit)
resetBtn.addEventListener("click", resetCheckbox)