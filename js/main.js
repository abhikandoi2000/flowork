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
        }, 3000, this.box);
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

//task object definition
function Task(task, todo_id, todo) {
  this.task = task;
  this.todo_id = todo_id;
  this.todo = todo;
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


/* initTodos - populate the todos for the user */
var initTodos = function() {

  var url = ROOT + 'ajax/view/todos.php';
  var returnVal = false;

  $.ajax({
    type: "POST",
    async: false,
    url: url,
    success: function(response) {
      //flush the list of todos
      $('.todos').html('');

      var responseJSON = JSON.parse(response);

      if(responseJSON.status == 'success') {
        //todo fetch was successful
        var todoCount = responseJSON.count;

        //loop through each todo
        console.log(responseJSON);
        for(index in responseJSON.todos) {
          var item = responseJSON.todos[index];
          var todo = new Todo(item.todo, item.id, item.status);
          //console.log('Creating todo' + todo.todo);
          createTodo(todo);
        }

        //attach actions such as modify, delete and strike
        attachActions();

        returnVal = true;
      } else if(responseJSON.status == 'error') {
        //todo fetching failed
        console.log(responseJSON.msg);
        console.log(responseJSON.error_msg);
        returnVal = false;
      }
    }

  });

  return returnVal;
}

/* createTodo - creates a new todo on the screen */
var createTodo = function(todo) {
  //whether todo is strike or not, and appropriate class for the strike anchor
  var isStriked = todo.status == 'striked' ? true : false;
  var strikeAnchorClass = isStriked ? 'unstrike' : 'strike' ;

  var todoRow = $( "<div></div>", {
    "class": "row"
  });

  var todoColumn = $( "<div></div>", {
    "class": "large-12 columns"
  });

  var anchorClass = "todo " + todo.status;
  var todoAnchor = $( "<a></a>", {
    "class": anchorClass,
    "id": todo.id,
    "href": "#"
  });
  todoAnchor.html(todo.todo);

  //strike, delete and modify anchors
  var deleteAnchor = $( "<a></a>", {
    "class": "action delete",
    "href": "#"
  });
  var strikeAnchor = $( "<a></a>", {
    "class": "action " + strikeAnchorClass,
    "href": "#"
  });
  var modifyAnchor = $( "<a></a>", {
    "class": "action modify",
    "data-reveal-id": "modifytodoModal",
    "href": "#"
  });

  //append the elements
  todoColumn.append( todoAnchor );
  todoColumn.append(deleteAnchor);
  todoColumn.append(strikeAnchor);
  todoColumn.append(modifyAnchor);
  todoRow.append( todoColumn );

  //prepend to the list of todos
  $('.todos').prepend( todoRow );
}

/* addTodo - adds a new todo to the database */
var performTask = function(task) {
  console.log(task);
  var url = ROOT + 'ajax/edit/todo.php';
  var returnVal = false;

  $.ajax({
    type: "POST",
    url: url,
    async: false,
    data: task,
    success: function(response) {
      console.log(response);
      var responseJSON = JSON.parse(response);
      if(responseJSON.status == 'done') {
        //task performed successfully
        console.log(responseJSON.msg);
        returnVal = true;
      } else if(responseJSON.status == 'error') {
        //error occured while performing task
        console.log(responseJSON.msg);
        console.log(responseJSON.error_msg);
        returnVal = false;
      }
    }
  });

  return returnVal;
}

//strike function
var strike = function() {
  var todoAnchor = $(this).siblings('.todo');
    var id = todoAnchor.attr('id');
    var todo = todoAnchor.html();
    var task = new Task('strike', id, todo);
    console.log('performing task');
    var taskPerformed = performTask(task);

    if(taskPerformed) {
      //unbind the strike functionality
      $(this).unbind('click');
      //bind the unstrike functionality
      $(this).bind('click', unstrike);

      //strike the todo
      todoAnchor.addClass('striked');
      //update class for strike/unstrike anchor
      $(this).removeClass('strike');
      $(this).addClass('unstrike');
    } else {
      //show the error
      alertBox.showalert('Some kind of weird error occured while trying to strike that todo at the server side, try again.', 'error');
    }
}

//unstrike
var unstrike = function() {
  var todoAnchor = $(this).siblings('.todo');
  var id = todoAnchor.attr('id');
  var todo = todoAnchor.html();
  var task = new Task('unstrike', id, todo);
  console.log('performing task');
  var taskPerformed = performTask(task);

  if(taskPerformed) {
    //unbind the unstrike functionality
    $(this).unbind('click');
    //bind the strike functionality
    $(this).bind('click', strike);

    //unstrike the todo
    todoAnchor.removeClass('striked');
    //update class for strike/unstrike anchor
    $(this).removeClass('unstrike');
    $(this).addClass('strike');
  } else {
    //show the error
    alertBox.showalert('Some kind of weird error occured while trying to unstrike that todo at the server side, try again.', 'error');
  }
}

//attach actions such as modify, delete and strike
var attachActions = function() {
  
  /*
   * Modify a todo
   * on clicking the modify anchor for a todo, the modify todo modal box shows up
   * to keep track of the todo being modified we attach its id and update the value of the input field on the modal box
   * further clicking the modify button, utilizes this attached detail to modify the detail
   */

  //modify the modify todo modal according to the todo being modified
  $('.modify').click(function() {
    var todoAnchor = $(this).siblings('.todo');
    var id = todoAnchor.attr('id');
    var todo = todoAnchor.html();
    $('#modifytodoModal .todo').val(todo);
    $('#modifytodoModal .todo-id').val(id);
    console.log("ID:" + id);
    console.log("Todo:" + todo);
  });

  //modify a todo
  $('.modify-todo').click(function() {
    var id = $('#modifytodoModal .todo-id').val();
    var todo = $('#modifytodoModal .todo').val();
    var task = new Task('modify', id, todo);
    var taskPerformed = performTask(task);

    if(taskPerformed) {
      //hide the new todo modal
      $('#modifytodoModal').foundation('reveal', 'close');
      //show success alert
      alertBox.showalert('Todo modified successfully, may the force be with you.', 'success');

      //empty the todo list
      $('.todos').html('Wait, loading the updated list of todos.');
      //refresh the todo list
      initTodos();
    } else {
      //hide the new todo modal
      $('#modifytodoModal').foundation('reveal', 'close');
      //show the error
      alertBox.showalert('Some kind of weird error occured while trying to modify that todo, try again.', 'error');
    }
  });

  //delete a todo
  $('.delete').click(function() {
    var todoAnchor = $(this).siblings('.todo');
    var id = todoAnchor.attr('id');
    var todo = todoAnchor.html();
    var task = new Task('done', id, todo);
    console.log('performing task');
    var taskPerformed = performTask(task);

    if(taskPerformed) {
      alertBox.showalert('Todo deleted successfully, well done user.', 'success');

      //empty the todo list
      $('.todos').html('Wait, loading the updated list of todos.');
      //refresh the todo list
      initTodos();
    } else {
      //show the error
      alertBox.showalert('Some kind of weird error occured while trying to delete that todo, try again.', 'error');
    }
  });

  //bind strike functionality to all open todos
  $('.strike').bind('click', strike);

  //bind unstrike functionality to all striked todos
  $('.unstrike').bind('click', unstrike);

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

    initTodos();
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
        // hide my custom made modal box
        //$('div.form-container.signup').hide();

        $('#signupModal').foundation('reveal', 'close');
        alertBox.showalert('Congratulations, your account has been created and you may login.', 'success');
      } else {
        // hide my custom made modal box
        //$('div.form-container.signup').hide();

        $('#signupModal').foundation('reveal', 'close');
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

        //populate todos
        initTodos();
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

  //new todo
  $('a.new').click(function() {
    var newtodo = $('#newtodoModal .todo').val();
    var task = new Task('new', null, newtodo);
    //try perform the task
    var taskPerformed = performTask(task);

    if(taskPerformed) {
      //hide the new todo modal
      $('#newtodoModal').foundation('reveal', 'close');
      //
      $('#newtodoModal .todo').val('');
      //show success alert
      alertBox.showalert('Todo added successfully, hope you will do it in time.', 'success');

      //empty the todo list
      $('.todos').html('Wait, loading the updated list of todos.');
      //refresh the todo list
      initTodos();
    } else {
      //hide the new todo modal
      $('#newtodoModal').foundation('reveal', 'close');
      //show the error
      alertBox.showalert('Some kind of weird error occured while trying to add the todo, try again.', 'error');
    }
  });

});
