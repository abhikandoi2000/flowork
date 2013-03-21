//AlertBox object definition - control the alert-box
function AlertBox(selector) {
  this.box = $(selector);
  this.showalert = function(html, alertclass) {
    var alertSpan = $(selector + ' .alert');
    if(alertclass) {
      this.box.removeAttr('class');
      this.box.addClass('alert-box');
      this.box.addClass(alertclass);
    } else {
      this.box.removeAttr('class');
      this.box.addClass('alert-box');
    }
    $(selector + ' .alert').html(html);
    //this.box.show();
    this.box.slideDown(1000);
    setTimeout(function(box) {
          box.slideUp(800);
        }, 2000, this.box);
  }
  this.close = function() {
    this.box.slideUp();
    //this.box.hide();
  }
}

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

//login data object definition
function LoginData(username, password) {
  this.username = username;
  this.password = password;
};

//status object definition
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
 * Global variables
 */

//logged out initially
STATUS = new Status('loggedout');

//main alert box
alertBox = new AlertBox('#alert-box-main');

/*
 * Function definitions
 */

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
    }
  });

  return returnVal;
}


/*  */
var init = function(status) {

}


//on document ready
$(document).ready(function(){

  //check if user if logged in
  var loggedin = checkLogin();
  if(loggedin) {
    alertBox.showalert('Welcome back user.');
    //update status
    STATUS.loggedin();
    updateInterface(STATUS);

    //init(status);
    //populateTodos();
  } else {
    STATUS.loggedout();
    updateInterface(STATUS);
  }

  $('a.signup').click(function() {
    //perform user signup

    //validating using parsley
    var isValid = $('#signup-form').parsley('validate');

    if(isValid) {
      //user data is valid
      username = $('#username').val();
      password = $('#password').val();
      name = $('#name').val();
      email = $('#email').val();
      mobile = $('#mobile').val();
      var signUpData = new UserData(username, password, name, email, mobile);

      var signedup = signUp(signUpData);

      if(signedup) {
        $('div.form-container.signup').hide();
        alertBox.showalert('Congratulations, your account has been created and you may login.', 'success');
      } else {
        $('div.form-container.signup').hide();
        alertBox.showalert('O snap, some error occured while trying to create a brand new account for you. Try later.', 'alert');
      }
    }

  });

  $('a.logout').click(function() {
    //logout the user

    var loggedout = logout();

    if(loggedout) {
      STATUS.loggedout();
      updateInterface(STATUS);
      alertBox.showalert('See you soon again.');
    } else {
      alertBox.showalert('Crap, a new kind of error occured while trying to logout, try deleting your cookies.', 'alert');
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
        alertBox.showalert('Welcome User, have a wonderful day.', 'success');
        STATUS.loggedin();
        updateInterface(STATUS);
      } else {
        alertBox.showalert('Login failed. Try again.', 'alert'); 
      }
    } else {
      //already logged in
      console.log('Already logged in.');
    }
  });

  //reset the form
  $('a.reset').click(function() {
    $(this).closest('form').find("input[type=text], input[type=email], input[type=password], textarea").val("");
  });

});
