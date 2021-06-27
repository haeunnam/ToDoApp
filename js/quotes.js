const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")
const todaysQuote = Math.floor(Math.random() * 1643)

function getQuotes(){
  const url = "https://type.fit/api/quotes"
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const pickedQuote = data[todaysQuote]
    quote.innerText = pickedQuote.text
    if (pickedQuote.author) {
      author.innerText = `- ${pickedQuote.author} -`
    } else {
      author.innerText = ""
    }
  });
}

getQuotes()
