let quotes = [];
const favoriteQuotes = [];

const quoteContainer = document.getElementById("quote-container");
const quoteBodyElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("author");

const homeButton = document.getElementById("home-btn");
const favoritesButton = document.getElementById("favorites-btn");
const addFavoriteButton = document.getElementById("new-favorite-btn");
const newQuoteButton = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter");

const loaderElement = document.getElementById("loader");

function showLoadSpinner(){
   loaderElement.classList.remove("not-visible")
   quoteContainer.classList.add("not-visible")
}

function showQuoteContainer(){
   loaderElement.classList.add("not-visible")
   quoteContainer.classList.remove("not-visible")
}

function addFavorite(){
   const favoriteQuote = {text: quoteBodyElement.textContent,
   author: quoteAuthorElement.textContent}
   favoriteQuotes.push(favoriteQuote);
   console.log(favoriteQuotes[favoriteQuotes.length-1]);
}

function getSingleQuoteOfQuotes() {
   showLoadSpinner();
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
   showQuoteContainer();
}

async function getQuote(){
   showLoadSpinner();
   const apiUrl = "https://type.fit/api/quotes";
   try {
      const response = await fetch(apiUrl);
      quotes = await response.json();
      getSingleQuoteOfQuotes();
   }  catch(error) {

   }
   
}

function tweetCurrentQuote(){
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteBodyElement.textContent} - ${quoteAuthorElement.textContent}`;
   window.open(twitterUrl, "_blank");
}

newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetCurrentQuote);
homeButton.addEventListener("click", function(){
   window.location.href = "index.html";
})
favoritesButton.addEventListener("click", function(){
   window.location.href = "favorites.html";
})
addFavoriteButton.addEventListener("click", addFavorite);
getQuote();