//todo object definition
function Todo (todo, id, status) {
  this.todo = todo;
  this.id = id;
  this.status = status;

  this.strike = function() {

  }
  this.done = function() {

  }
  this.create = function() {

  }
}

//user data object definition
function UserData(username, password, name, email, mobile) {
  this.username = username;
  this.password = password;
  this.name = name;
  this.email = email;
  this.mobile = mobile;
};

//user data object definition
function LoginData(username, password) {
  this.username = username;
  this.password = password;
};

//status object
function Status(status) {
  this.status = status;
  this.loggedin = function() {
    this.status = 'loggedin';
  }
  this.loggedout = function() {
    this.status = 'loggedout';
  }
}

//error object

/*
 * global variables
 */
STATUS = new Status('loggedout');

/*
 * Function definitions
 */

var updateNavbar = function(status) {
  console.log(status);
  if(status.status == 'loggedin') {
    $('section.top-bar-section.guest').hide();
    $('section.top-bar-section.user').show();
  } else if(status.status == 'loggedout') {
    $('section.top-bar-section.user').hide();
    $('section.top-bar-section.guest').show();
  } else {
    console.log('Unknow status: ' + status);
  }
}

/* checkLogin - return boolean true if user already logged in otherwise false  */
var checkLogin = function() {

  var url = ROOT + 'ajax/user/login.php';
  var returnVal = false;

  $.ajax({
    type: "POST",
    url: url,
    async: false,
    success: function(response) {
      console.log(response);
      var responseJSON = JSON.parse(response);
      if(responseJSON.status == 'loggedin') {
        //user logged in
        console.log(responseJSON.msg);
        returnVal = true;
      } else if(responseJSON.status == 'error') {
        //user not logged in
        console.log(responseJSON.msg);
        console.log(responseJSON.error_msg);
        returnVal = false;
      }
    }
  });

  return returnVal;
}

/* login - return boolean true if user is logged in successfully otherwise false */
var login = function(loginData) {
  var url = ROOT + 'ajax/user/login.php';
  var returnVal = false;

  $.ajax({
    type: "POST",
    url: url,
    async: false,
    data: loginData,
    success: function(response) {
      console.log(response);
      var responseJSON = JSON.parse(response);
      if(responseJSON.status == 'loggedin') {
        //user logged in successfully
        console.log(responseJSON.msg);
        returnVal = true;
      } else if(responseJSON.status == 'error') {
        //user login failed
        console.log(responseJSON.msg);
        console.log(responseJSON.error_msg);
        returnVal = false;
      }
    }
  });

  return returnVal;
}

/* logout - return boolean true if user is logged out successfully otherwise false */
var logout = function() {
  var url = ROOT + 'ajax/user/logout.php';
  var returnVal = false;

  $.ajax({
    type: "POST",
    url: url,
    async: false,
    success: function(response) {
      console.log(response);
      var responseJSON = JSON.parse(response);
      if(responseJSON.status == 'loggedout') {
        //user logged out successfully
        console.log(responseJSON.msg);
        returnVal = true;
      } else if(responseJSON.status == 'error') {
        //user logout failed
        console.log(responseJSON.msg);
        console.log(responseJSON.error_msg);
        returnVal = false;
      }
    }
  });

  return returnVal;
}

/* signUp - return true if user is successfully signed up otherwise false */
var signUp = function(signUpData) {
  var url = ROOT + 'ajax/user/signup.php';
  var returnVal = false;

  $.ajax({
    type: "POST",
    url: url,
    async: false,
    data: signUpData,
    success: function(response) {
      console.log(response);
      var responseJSON = JSON.parse(response);
      if(responseJSON.status == 'signedup') {
        //user signed up successfully
        console.log(responseJSON.msg);
        returnVal = true;
      } else if(responseJSON.status == 'error') {
        //user signup failed
        console.log(responseJSON.msg);
        console.log(responseJSON.error_msg);
        returnVal = false;
      }

      //just in case the request fails
      return returnVal;
    }
  });
}


/*  */
var init = function(status) {

}


//on document ready
$(document).ready(function(){

  //check if user if logged in
  var loggedin = checkLogin();
  if(loggedin) {
    //update status
    console.log(STATUS);
    STATUS.loggedin();
    console.log(STATUS);
    updateNavbar(STATUS);

    //init(status);
    //populateTodos();
  } else {

    STATUS.loggedout();
    updateNavbar(STATUS);
    $('section.top-bar-section.guest').show();
  }

  $('a.signup').click(function() {
    //perform user signup

    username = $('#username').val();
    password = $('#password').val();
    name = $('#name').val();
    email = $('#email').val();
    mobile = $('#mobile').val();
    var signUpData = new UserData(username, password, name, email, mobile);

    var signedup = signUp(signUpData);

    if(signedup) {

    } else {

    }
  });

  $('a.logout').click(function() {
    //logout the user

    var loggedout = logout();

    if(loggedout) {
      STATUS.loggedout();
      updateNavbar(STATUS);
    } else {

    }
  });

  $('a.login').click(function() {
    //log the user in
    var loggedin = checkLogin();

    if( !loggedin ) {
      var username = $('.login.username').val();
      var password = $('.login.password').val();
      var loginData = new LoginData(username, password);

      var loggedin = login(loginData);
      if(loggedin) {
        console.log('loggedin successfully');
        console.log(STATUS);
        STATUS.loggedin();
        console.log(STATUS);
        updateNavbar(STATUS);
      } else {
        console.log('Login failed.');
      }
    } else {
      //already logged in
      console.log('Already logged in.');
    }
  });

});