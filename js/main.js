//todo object definition
var Todo = {
  todo : "",
  id : 0,
  status : "",
  strike : function() {

  },
  done : function() {

  },
  create : function() {

  }
};

//error object

/*
 * Function definitions
*/

/* checkLogin - return boolean true if user already logged in otherwise false  */
var checkLogin = function() {

  var url = ROOT + 'ajax/user/login.php';
  $.ajax(url, {
    async : false
  }).done(function(response){
    var responseJSON = JSON.parse(response);
    if(responseJSON.status == 'loggedin') {
      //user already logged in
      console.log(responseJSON.msg);
      return true;
    } else if(responseJSON.status == 'error') {
      //user not logged in
      console.log(responseJSON.msg);
      console.log(responseJSON.error_msg);
      return false;
    }
  });

  //just in case the request fails
  return false;
}

/*  */
var init = function() {

}


//on document ready
$(document).ready(function(){
  //check if user if logged in
  var loggedin = checkLogin();

  if(loggedin) {
    init();
    populateTodos();
  }
});