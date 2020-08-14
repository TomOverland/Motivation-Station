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
    //these variables allow us to save responses to local storage
    let quoteAuthor = response.quote.quoteAuthor;
    let quoteAuthorEl = $("<h6 id='author'>").text(quoteAuthor);
    let quoteText = response.quote.quoteText;
    let quoteTextEl = $("<h4>").text(quoteText);
    let newDiv = $("<div>");
    newDiv.append(quoteTextEl, quoteAuthorEl);
    $("#quote").html(newDiv);
    //saving the quotes to local storage as an object
    let savedQuoteArr = {
      quotetext: quoteText,
      author: quoteAuthor,
    };
    localStorage.setItem("savedQuote", JSON.stringify(savedQuoteArr));
  });
});

//This creates list items in a "saved quotes" div
$("#save-btn").on("click", function (event) {
  event.preventDefault();
  //this function allows us to click the "save" button, and have the saved quote be appended to a list
  function saveQuotes() {
    getSavedArr = JSON.parse(localStorage.getItem("savedQuote"));
    listQuote = getSavedArr.quotetext;
    listQuoteEl = $("<p>").text(listQuote);
    lineBreak = $("<br>");
    listAuthor = "-" + getSavedArr.author;
    listAuthorEl = $("<p>").text(listAuthor);
    horizontalRule = $("<hr>");
    newListItem = $("<li>");
    newListItem.append(listQuote, lineBreak, listAuthor, horizontalRule);
    $("#list").append(newListItem);
  }
  saveQuotes();
});

//clear button
$("#reset-btn").on("click", function (event) {
  event.preventDefault();
  $("#list").empty();
});
