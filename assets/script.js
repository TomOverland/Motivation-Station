// -------- Global Variables ---------
let quoteGardenURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random";
let imageID = Math.floor(Math.random() * 20 + 100000);
let harvardURL =
  "https://api.harvardartmuseums.org/image/" +
  imageID +
  "?apikey=86ed3a95-7559-4fe1-be65-a8316de3c126";

// ------- Page Image from Harvard Museum API ------
$.ajax({
  url: harvardURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  console.log(harvardURL);
  let harvardImg = response.baseimageurl;
  console.log(harvardImg);
  $("#harvard-img").html("<img src=" + harvardImg + "></img>");
});

// -------- Event Delegation -------
$("#btn").on("click", function (event) {
  event.preventDefault();
  // ----- Random Quotes from QuoteGarden API -----
  $.ajax({
    url: quoteGardenURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(quoteGardenURL);
    let quoteAuthor = response.quote.quoteAuthor;
    let quoteAuthorEl = $("<h6 id='author'>").text(quoteAuthor);
    let quoteText = response.quote.quoteText;
    let quoteTextEl = $("<h4>").text(quoteText);
    let newDiv = $("<div>");
    newDiv.append(quoteTextEl, quoteAuthorEl);
    $("#quote").html(newDiv);
    //save each quote to local storage, and call the "get" function when the save btn is
    //pressed, causing the saved item to be created on the saved page
    let savedQuoteArr = {
      quotetext: quoteText,
      author: quoteAuthor,
    };
    localStorage.setItem("savedQuote", JSON.stringify(savedQuoteArr));
  });
});

//This doesn't currently save.  Needs to be fixed.
$("#save-btn").on("click", function (event) {
  event.preventDefault();
  function saveQuotes() {
    getSavedArr = JSON.parse(localStorage.getItem("savedQuote"));
    listQuote = getSavedArr.quotetext;
    listQuoteEl = $("<p>").text(listQuote);
    listAuthor = getSavedArr.author;
    listAuthorEl = $("<p>").text(listAuthor);
    newListItem = $("<li>");
    newListItem.append(listQuote, listAuthor);
    $("#list").html(newListItem);
  }
  saveQuotes();
});

//Add items to list
//list.innerHTML += '<li>' + variable.value +'<li>';

//clear button
//$('#reset-btn').on("click", function(event) {
//   event.preventDefault();
//   list.value = '';
// })
