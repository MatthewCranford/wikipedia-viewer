$(document).ready(function(){

  // search wiki articles using user's search input and populate them to the page
  $("#search").submit(function(event) {
    $("header").css("display", "none"); // transition header out
    $("#article-list").css("display", "none"); // reset article list for fade in on multiple searches
    $("footer").css("position", "relative"); // sets footer to bottom of articles
    var searchInput = $("#search-input").val();
    var apiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&origin=*";
    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function(jsonData) {
        for(i=0; i<jsonData[1].length; i++) {  
          $("#article-list li").each(function(i){
            $(this).children(".article-title").html(jsonData[1][i]);
            $(this).children(".article-description").html(jsonData[2][i]);
            $(this).parent(".article-link").attr("href", jsonData[3][i]);
          });
        }
      $("#article-list").css("display", "block"); // fade in article list
      $("#search-exit").css("display", "inline"); // display exit icon
      },
      error: function(errorMessage){
        console.log("error");
      }  
    });
    event.preventDefault();
  });

  // exit articles and reset to default
  $("#search-exit").mousedown(function() {
    $("#article-list, #search-exit").css("display", "none"); 
    $("header").css("display", "block");
    $("footer").css("position", "absolute");
    $("#search-input").val("")
  });

  // Call to action message change on hover and reset off hover
  $("#random-article").hover(function() {
    $("#random-cta").html("May the Wiki be with you..");
  }, function() {
    $("#random-cta").html("Feeling Lucky?");
  });

});
