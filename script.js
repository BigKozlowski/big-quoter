let quotes = [];

const quoteContainer = document.getElementById("quote-container");
const quoteBodyElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter");
const loaderElement = document.getElementById("loader");

function loading(){
   loaderElement.classList.remove("not-visible")
   quoteContainer.classList.add("not-visible")
}

function complete(){
   loaderElement.classList.add("not-visible")
   quoteContainer.classList.remove("not-visible")
}

function singleQuote() {
   loading();
   const quote = quotes[Math.floor(Math.random()*quotes.length)];
   if (quote.author){
      quoteAuthorElement.textContent = quote.author;
   } else {
      quoteAuthorElement.textContent = "Unknown";
   }
   if(quote.text.length > 100){
      quoteBodyElement.classList.add("long-quote");
   } else {
      quoteBodyElement.classList.remove("long-quote");
   }
   quoteBodyElement.textContent = quote.text;
   complete();
}

async function getQuote(){
   loading();
   const apiUrl = "https://type.fit/api/quotes";
   try {
      const response = await fetch(apiUrl);
   quotes = await response.json();
   singleQuote();
   }  catch(error) {

   }
   
}

function tweetCurrentQuote(){
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteBodyElement.textContent} - ${quoteAuthorElement.textContent}`;
   window.open(twitterUrl, "_blank");
}

newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetCurrentQuote);
getQuote();
loading();