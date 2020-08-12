// -------- Random Quotefals from QuoteGarden API ---------
let quoteGardenURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random";
const APIkeyNASA = "0bKKI1WFHiOqeZzI8X3DEywObteFpr21E3YaQmEA";
let nasaURL = "https://api.nasa.gov/planetary/apod?api_key=" + APIkeyNASA;

// -------- NASA Image of the Day --------
$.ajax({
  url: nasaURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  console.log(nasaURL);
  let nasaImg = response.url;
  console.log(nasaImg);

  $("#nasa-img").html("<img src=" + nasaImg + "></img>");
});

// -------- Event Delegation -------

$("#btn").on("click", function (event) {
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
