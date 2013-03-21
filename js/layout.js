/*
 * JavaScript controlling the layout of the webpage
 * 
 * function for updating the interface based on login status
 * control visibility of signup form
 * control the functioning of the close button
 * 
 */


/*
 * Function definitions
 */

var updateInterface = function(status) {
  console.log(status);
  if(status.status == 'loggedin') {

    //hide guest interface
    $('.guest').addClass('inactive');
    //show user interface
    $('.user').removeClass('inactive');

  } else if(status.status == 'loggedout') {

    //hide user interface
    $('.user').addClass('inactive')
    //show guest interface
    $('.guest').removeClass('inactive');

  } else {
    console.log('Unknown status: ' + status);
  }
}


//when the document is ready
$(document).ready(function() {
  $('a.signup-show').click(function() {
    $('div.form-container.signup').toggle();
  });

  //close button functioning
  $('a.close').click(function() {
    $(this).parent().parent().hide();
  });

});