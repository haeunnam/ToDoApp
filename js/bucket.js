const bucketForm = document.querySelector('#bucket-form')
const bucketInput = bucketForm.querySelector('input')
const bucketList = document.querySelector('#bucket-list')

let buckets = []
const BUCKET_KEY = "buckets"

function deleteBucket(event){
  const needToDelete = event.target.parentElement
  needToDelete.remove()
  buckets = buckets.filter(bucket => bucket.id !== parseInt(needToDelete.id))
  localStorage.setItem(BUCKET_KEY, JSON.stringify(buckets))
}

function paintBucket(bucketObj){
  const li = document.createElement('li')
  li.id = bucketObj.id
  const span = document.createElement('span')
  span.innerText = bucketObj.bucket
  const icon = document.createElement('i')
  icon.classList.add("fa","fa-trophy","trophy")
  icon.addEventListener('click', deleteBucket)
  li.append(span)
  li.append(icon)
  bucketList.append(li)
}


function submitBucket(event){
  event.preventDefault()
  const bucketObj = {
    id: Date.now(),
    bucket: bucketInput.value,
  }
  bucketInput.value = ""
  buckets.push(bucketObj)
  localStorage.setItem(BUCKET_KEY, JSON.stringify(buckets))
  paintBucket(bucketObj)
}

const savedBuckets = localStorage.getItem(BUCKET_KEY)
if (savedBuckets !== null){
  buckets = JSON.parse(savedBuckets)
  buckets.forEach(paintBucket)
} 

bucketForm.addEventListener("submit", submitBucket)
