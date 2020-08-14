$(document).ready(function () {
  let tweet = "";
  let quoteGardenURL =
    "https://quote-garden.herokuapp.com/api/v2/quotes/random";
  let imageID = Math.floor(Math.random() * 20 + 100000);
  let harvardURL =
    "https://api.harvardartmuseums.org/image/" +
    imageID +
    "?apikey=86ed3a95-7559-4fe1-be65-a8316de3c126";

  // ------- Page Image from Harvard Art Museum API ------
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

  // ------------ GENERATE NEW QUOTE BUTTON -------------------
  $("#btn").on("click", function (event) {
    event.preventDefault();
    // --------------- Random Quotes from QuoteGarden API ----------------
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
      tweet = quoteText + " " + quoteAuthor;
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

  // ------------------- ADD TO FAVORITES BUTTON -----------------------
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
      blockQuote = $("<blockquote>");
      newListItem = $("<li id='quote-content'>");
      newListItem.append(
        blockQuote,
        listQuote,
        lineBreak,
        listAuthor,
        horizontalRule
      );
      $("#list").append(newListItem);
    }
    saveQuotes();

    //----------------  TWITTER --------------------------

    // Get all quote elements inside the article
    const articleBody = $("#quote-content");
    const quotes = articleBody.find("quote, blockquote");
    let tweetableUrl = "";
    let clickToTweetBtn = null;
    // Get a url of the current page
    const currentPageUrl = window.location.href;

    quotes.each(function (index, quote) {
      const q = $(quote);
      // Create a tweetable url
      tweetableUrl = makeTweetableUrl(q.text(), currentPageUrl);
      // Create a 'click to tweet' button with appropriate attributes
      clickToTweetBtn = $("<a>");
      clickToTweetBtn.text("Click to Tweet");

      clickToTweetBtn.attr("href", tweetableUrl);
      clickToTweetBtn.on("click", onClickToTweet);

      // Add button to every blockquote
      q.append(clickToTweetBtn);
    });

    function makeTweetableUrl(text, pageUrl) {
      const tweetableText =
        "https://twitter.com/intent/tweet?url=" +
        //pageUrl +
        "&text=" +
        tweet;
      //encodeURIComponent(text);

      return tweetableText;
    }

    function onClickToTweet(e) {
      e.preventDefault();

      window.open(
        e.target.getAttribute("href"),
        "twitterwindow",
        "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
      );
    }
  });

  //---------------- RESET BUTTON ---------------------------
  $("#reset-btn").on("click", function (event) {
    event.preventDefault();
    $("#list").empty();
  });
});
