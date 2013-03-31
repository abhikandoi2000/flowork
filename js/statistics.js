//doughnut chart for todo stats

//Get context with jQuery - using jQuery's .get() method.
var ctx = $("#todoStats").get(0).getContext("2d");
//This will get the first returned node in the jQuery collection.
var todoStatsChart = new Chart(ctx);

var data = [
  /* open todos */
  {
    value: 5,
    color: "#69D2E7"
  },
  /* striked todos */
  {
    value: 4,
    color: "#E0E4CC"
  },
  /* done todos */
  {
    value: 7,
    color: "#F7464A"
  }
]

//make the chart on opening the statistics modal
$('.statistics').click(function() {
  new Chart(ctx).Doughnut(data);
  /* since you are instantiating a new Chart each time the statistics modal box is opened, 
   * do check for a method to delete it once the modal box is closed.
   */
});
