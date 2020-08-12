// -------- Random Quotes from QuoteGarden API ---------
let quoteGardenURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random";

// -------- Event Delegation -------

$("#btn").on("click", function (event) {
  $.ajax({
    url: quoteGardenURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(quoteGardenURL);
    //each new search will clear the previous
    //$("#current").empty();
    let quoteAuthor = $("<h4>").text(response.quote.quoteAuthor);
    let quoteText = $("<h6>").text(response.quote.quoteText);
    let newDiv = $("<div>");

    newDiv.append(quoteText, quoteAuthor);
    $("#quote").html(newDiv);
  });
});
