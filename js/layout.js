$(document).ready(function() {
  $('a.signup-show').click(function() {
    $('div.form-container.signup').toggle();
  });

  //close button functioning
  $('a.close').click(function() {
    $(this).parent().parent().hide();
  });

});