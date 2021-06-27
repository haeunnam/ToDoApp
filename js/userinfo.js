const usernameForm = document.querySelector('div #username-form')
const dreamForm = document.querySelector('div #dream-form')
const dreamInput = document.querySelector('div #dream-form input')
const usernameInput = document.querySelector('div #username-form input')
const username = document.querySelector('div #userinfo span:last-child')
const dream = document.querySelector('div #userinfo span:first-child')

const HIDDEN_CLASSNAME="hidden"
const USERINFO_KEY = "userinfo"
const userInfoObj = {}

function userInfoSubmit(event){
  event.preventDefault()
  dreamForm.classList.add(HIDDEN_CLASSNAME)
  userInfoObj.dream = dreamInput.value
  localStorage.setItem(USERINFO_KEY, JSON.stringify(userInfoObj))
  paintUserInfo(userInfoObj)
}

function paintUserInfo(userInfoObj) {
  username.classList.remove(HIDDEN_CLASSNAME)
  dream.classList.remove(HIDDEN_CLASSNAME)
  username.innerText = userInfoObj.username
  dream.innerText = `${userInfoObj.dream}, `
}

function userInfoCollect(event) {
  event.preventDefault()
  usernameForm.classList.add(HIDDEN_CLASSNAME)
  userInfoObj.username = usernameInput.value
  dreamForm.classList.remove(HIDDEN_CLASSNAME)
  dreamForm.addEventListener("submit", userInfoSubmit)
}

const savedUserInfo = localStorage.getItem(USERINFO_KEY)

if (savedUserInfo === null){
  usernameForm.classList.remove(HIDDEN_CLASSNAME)
  usernameForm.addEventListener("submit", userInfoCollect)
} else {
  paintUserInfo(JSON.parse(savedUserInfo))
}