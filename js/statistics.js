//doughnut chart for todo stats

//Get context with jQuery - using jQuery's .get() method.
var ctx = $("#todoStats").get(0).getContext("2d");
//This will get the first returned node in the jQuery collection.
var todoStatsChart = new Chart(ctx);

var createChart = function(ctx, open, striked, done) {
  var data = [
    /* open todos */
    {
      value: open,
      color: "#69D2E7"
    },
    /* striked todos */
    {
      value: striked,
      color: "#E0E4CC"
    },
    /* done todos */
    {
      value: done,
      color: "#F7464A"
    }
  ]

  /* since you are instantiating a new Chart each time the statistics modal box is opened, 
   * do check for a method to delete it once the modal box is closed.
   */
  return new Chart(ctx).Doughnut(data);
}

//make the chart on opening the statistics modal
$('.statistics').click(function() {
  var open = 1;
  var striked = 1;
  var done = 1;
  //fetch statistics data
  var url = ROOT + 'ajax/view/stats.php';
  $.ajax({
    type: "POST",
    url: url,
    async: false,
    success: function(response) {
      console.log(response);
      var responseJSON = JSON.parse(response);
      if(responseJSON.status == 'success') {
        //statistics fetched successfully
        open = responseJSON.open;
        striked = responseJSON.striked;
        done = responseJSON.done;
        var chart = createChart(ctx, open, striked, done);
        console.log(responseJSON.msg);
      } else if(responseJSON.status == 'error') {
        //error occured fetching statistics
        //create empty chart
        var chart = createChart(ctx, open, striked, done);
        console.log(responseJSON.msg);
        console.log(responseJSON.error_msg);
      }
    },
    error: function() {
      var chart = createChart(ctx, open, striked, done);
    }
  });
  
});
