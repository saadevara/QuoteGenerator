const quoteContainer = document.querySelector('#quoteContainer');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#newQuote');
const twitterBtn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');

// show loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    if(!loader.hidden)
    quoteContainer.hidden = false;
  loader.hidden = true;
}

// get quote api

async function getQuote() {
    loading();
    const proxyUrl = "https://jacinto-cors-proxy.herokuapp.com/";
    const apiUrl =
      "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // if author is blank add unknown
        if (data.authorText === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('longQuote');
        } else {
            quoteText.classList.remove('longQuote');
        }
        quoteText.innerText = data.quoteText;
        // stop loader
        complete();
    } catch (error) {
        getQuote;
        
    }
}
// tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click',getQuote)

twitterBtn.addEventListener("click", tweetQuote);


// On load
getQuote();