/* TODO
loading gif

*/
var currentMinutes = 0;
var i = 0;
var results;

$(document).ready(function () {
    $("#chgBtn").hide();
    $("#web1").hide();
    $("#errorMsg").hide();
    $("#search-form").submit(function () {

        console.log($("#searcher").val());
        console.log($("#timerX").val());

        // Make a GET request
        //$.get('/search', {
        //data: {
          //searchTerms: $("#searcher").val(),
          //searchTime: $("#timerX").val()
        //},
        //success: function(data) {
          //console.log(data);
          //console.log(JSON.parse(data));
//          $("#web1").prop("src", "http://www.apple.com/");

        //}
        $("#errorMsg").text("Getting Search Results...");
        $("#errorMsg").show();

        $.ajax({
          url: "/search?q=" + $("#searcher").val() + "&t=" + $("#timerX").val(),
          type: "GET",
          dataType: "json",
              /* data: {
                searchTerms: $("#searcher").val(),
                searchTime: $("#timerX").val()
              },
          contentType: "application/json", */
          cache: false,
          timeout: 20000,
          complete: function() {
            //called when complete
            console.log('process complete');
	    },

	    success: function(data) {
	      console.log(data);
		results = data.results;
	      $("#web1").prop("src", results[0]);
		i++;
	      console.log('process success');

              currentMinutes = $("#timerX").val();
              $("#errorMsg").hide();
              $("#chgBtn").show();
              $("#web1").show();
              $("#container3").hide();

   },

    error: function(someObject, someErrorMsg, someErrorMsgThrown) {
      console.log('process error');
      console.log(someErrorMsg);
      console.log(someErrorMsgThrown);
    },
  });

      //});

      return false;
    });

    $("#btnBack").click(function () {
        
    });
    $("#btnNext").click(function (){
	if (i < results.length) {
	      $("#web1").prop("src", results[i]);
		i++;

	} else {
		$("#web1").hide();
	      $("#web1").prop("src", "");
              $("#errorMsg").text("Done!");
              $("#errorMsg").show();
              $("#container3").show();

              i = 0;
	}
        
    });
    //$("#searcher").keydown(function(event){
    //if(event.keyCode == 13){
        //$("#btnSubmit").click();
    //}
//});
    //$("#timerX").keydown(function(event){
    //if(event.keyCode == 13){
        //$("#btnSubmit").click();
    //}
  //});
});

