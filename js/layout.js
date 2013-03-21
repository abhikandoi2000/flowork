/*
 * JavaScript controlling the layout of the webpage
 * 
 * function for updating the interface based on login status
 * //control visibility of signup form
 * //control the functioning of the close button
 * 
 */


/*
 * Function definitions
 */

var updateInterface = function(status) {
  console.log(status);
  if(status.status == 'loggedin') {

    //make the guest interface inactive
    $('.guest').addClass('inactive');
    //make user interface active
    $('.user').removeClass('inactive');

  } else if(status.status == 'loggedout') {

    //make the user interface inactive
    $('.user').addClass('inactive')
    //make guest interface active
    $('.guest').removeClass('inactive');

  } else {
    console.log('Unknown status: ' + status);
  }
}


//when the document is ready
$(document).ready(function() {
  /* used for my custom made modal box (quora inspired) */
  // $('a.signup-show').click(function() {
  //   $('div.form-container.signup').toggle();
  // });
  //close button functioning
  // $('a.close').click(function() {
  //   $(this).parent().parent().hide();
  // });
});