
let favoriteQuotes = [];


const quoteContainer = document.getElementById("quote-container");
const quoteBodyElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("author");
const favoritesContainer = document.getElementById("favorites-container");
const favoritesList = document.getElementById("favorites-list");

const homeButton = document.getElementById("home-btn");
const favoritesButton = document.getElementById("favorites-btn");
const addFavoriteButton = document.getElementById("new-favorite-btn");
const newQuoteButton = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter");

const loaderElement = document.getElementById("loader");

function isStorageEmpty(){
   if(localStorage.getItem("quotes")){
      return false;
   }
   return true;
}

function loadQuotes(){
   if(!isStorageEmpty()){
      for(element of JSON.parse(localStorage.getItem("quotes"))){
         favoriteQuotes.push(element);
      }
   }
}

function storeQuotes(){
   localStorage.setItem("quotes", JSON.stringify(favoriteQuotes));
}

function showLoadSpinner(){
   loaderElement.classList.remove("not-visible")
   quoteContainer.classList.add("not-visible")
}

function showQuoteContainer(){
   loaderElement.classList.add("not-visible")
   quoteContainer.classList.remove("not-visible")
}

function showFavorites(){
   quoteContainer.classList.add("not-visible");
   favoritesContainer.classList.remove("not-visible");
   renderFavorites();
}

function showQuotes(){
   quoteContainer.classList.remove("not-visible");
   favoritesContainer.classList.add("not-visible");
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

function addFavorite(){
   const favoriteQuote = {text: quoteBodyElement.textContent,
   author: quoteAuthorElement.textContent}
   favoriteQuotes.push(favoriteQuote);
   renderFavorites();
   storeQuotes();
}

function removeFavorite(event){
   const selectedQuote = event.target.parentElement.parentElement.dataset.quoteId;
   favoriteQuotes.splice(selectedQuote, 1);
   renderFavorites();
   storeQuotes();
}

function renderFavorites(){
   favoritesList.innerHTML = "";

   for(let i = 0; i< favoriteQuotes.length; i++){
      let element = document.createElement("li");

      element.dataset.quoteId = i;

      let quoteBody = document.createElement("div");

      let unfav = document.createElement("button");
      unfav.classList.add("delete-favorite")
      unfav.innerHTML = `<i class="fa fa-heart" aria-hidden="true" id="favorite-btn"></i>`;
      quoteBody.appendChild(unfav);

      let text = document.createElement("p");
      text.textContent = favoriteQuotes[i].text;
      quoteBody.appendChild(text);

      element.appendChild(quoteBody);

      let author = document.createElement("i");
      author.textContent = favoriteQuotes[i].author;
      element.appendChild(author);
      favoritesList.appendChild(element);

      let linebr = document.createElement("hr");
      element.appendChild(linebr);

      element.addEventListener("click", removeFavorite);

   }

}

newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetCurrentQuote);
favoritesButton.addEventListener("click", showFavorites);
addFavoriteButton.addEventListener("click", addFavorite);
homeButton.addEventListener("click", showQuotes);

loadQuotes();
getQuote();