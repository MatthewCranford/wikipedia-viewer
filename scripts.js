$(document).ready(function(){


  $("#search").submit(function(event) {
    var searchInput = $("#search-input").val();
    var api = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&origin=*";
    // console.log(searchInput);
    // console.log(api);
    $.ajax({
      url: api,
      type: "GET",
      success: function(jsonData) {
        for(i=0; i<jsonData[1].length; i++) {
          $("#article-list li").each(function(i){
            $(this).children(".article-title").html(jsonData[1][i]);
            $(this).children(".article-description").html(jsonData[2][i]);
            $(this).parent(".article-link").attr("href", jsonData[3][i]);
            console.log(jsonData[3][i]);
          });
        }
      }  
    });
    event.preventDefault();
  });

});
