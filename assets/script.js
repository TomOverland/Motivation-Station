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
    let quoteAuthor = $("<h6>").text(response.quote.quoteAuthor);
    let quoteText = $("<h4>").text(response.quote.quoteText);
    let newDiv = $("<div>");
    newDiv.append(quoteText, quoteAuthor);
    $("#quote").html(newDiv);
  });
});

//This doesn't currently save.  Needs to be fixed.
$("#save-btn").on("click", function (event) {
  event.preventDefault();
  localStorage.setItem("savedQuote", response.quote.quoteText);
});

//Add the "get" function and have it append quotes and authors to an ul and li

//add twitter tweet functions to the ul.
