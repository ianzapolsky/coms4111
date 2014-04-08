/**
 * Javascript for the Schedule Buddy login form
 * COMS 4111
 *
 * April 10, 2014
 */

var sb_login = function() {

  var
    users = [],
    
    // methods
    init, printError, checkInput, getUsers, createUser,
    showLandPage, showCreatePage, onHashChange, changePage;

  // set the contents of the main div to the landing page
  showLandPage = function () {
    var html = String()
        + '<div class="jumbotron">'
          + '<h1>ScheduleBuddy</h1>'
          + '<div class="row">'
            + '<div class="col-md-8" style="padding: 30px;">'
              + '<p>Having trouble finding a time that works for everyone?</p>'
              + '<p>Want to quickly and easily find available times to meet with others?</p>'
              + '<p>Use ScheduleBuddy to make scheduling meetings easy!</p>'
              + '<a href="#get-started" id="get-started" class="btn btn-lg btn-success">Get Started &raquo;</a>'
            + '</div>'
            + '<div class="col-md-4">'
              + '<form class="form-signin" id="login-form" action="sb_login.php" method="post">'
                + '<h2 class="form-signin-heading">Returning Users</h2>'
                + '<div id="uname-div">'
                  + '<input type="text" class="form-control" placeholder="Username" id="username" name="username" required autofocus>'
                + '</div>'
                + '<div id="pword-div">'
                  + '<input type="password" class="form-control" placeholder="Password" id="password" name="password" required>'
                + '</div>'
                + '<label class="checkbox">'
                  + '<input type="checkbox" value="remember-me">Remember me'
                + '</label>'
                + '<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>'
              + '</form>'
            + '</div>'
          + '</div>'
        + '</div>'
    
    // update the main page with land page html
    $( '#main' ).html(html);
  
    // hook login form to backend
    $( '#login-form' ).submit(function (event) {
      checkInput(event);
    });
  };

  // set the contents of the main div to the create user form
  showCreatePage = function () {
    var html = String()
        + '<div class="jumbotron">'
          + '<h2>Create an account:</h2>'
          + '<br> <form class="form-horizontal" id="create-user" method="post" role="form">'
            + '<div class="form-group" id="uname-div">'
            + '<label for="username" class="col-sm-2 control-label">Username</label><div class="col-sm-10">'
              + '<input type="text" class="form-control" placeholder="Username" '
               + 'id="username" name="username" required autofocus></div>'
            + '</div>'
            + '<div class="form-group" id="pword-div">'
              + '<label for="password" class="col-sm-2 control-label">Password</label><div class="col-sm-10">'
              + '<input type="password" class="form-control" placeholder="Password" '
              + 'id="password" name="password" required></div>'
            + '</div>'
            + '<div class="form-group" id="confirm-pword-div">'
              + '<label for="password" class="col-sm-2 control-label">Confirm Password</label><div class="col-sm-10">'
              + '<input type="password" class="form-control" placeholder="Password" '
              + 'id="confirm-password" name="confirm-password" required></div>'
            + '<div class="registrationFormAlert" id="divCheckPasswordMatch"></div>'
            + '</div>'
            + '<p class="text-center">'
            + '<a href="#" class="btn btn-lg btn-default" ng-click="getstarted = !getstarted" type="reset">&lArr; Go Back</a>  '
            + '<button class="btn btn-lg btn-primary" type="submit" onclick="checkPasswordMatch()">Create User</button>'
          + '</p></form>'
        + '</div>'

      function checkPasswordMatch() {
	  var password = $("#password").val();
	  var confirmPassword = $("#confirm-password").val();

	  if (password != confirmPassword)
	      alert("Passwords do not match!");
      }

    // update main div with create page html
    $( '#main' ).html(html);

    // hook create user form to backend
    $( '#create-user' ).submit(function (event) {
      createUser(event);
    });
  };

  // ajax method to POST a new user to the backend
  createUser = function (event) {
    var 
      username = $( '#username' ).val(),
      password = $( '#password' ).val(),
      user = {'USERNAME': username, 'PASSWORD': password};

    event.preventDefault();
    $.ajax({
      url: 'api/post_user.php',
      type: 'POST',
      data: user,
      async: false,
      dataType: 'json',
    });
    
    // after user is created, reload ajax user data to reflect change, and
    // move back to the land page
    getUsers();
    window.location.hash = '#';
  };

  // ajax method to GET all the users from the backend
  getUsers = function () {
    $.ajax({
      url: 'api/get_users.php',
      type: 'GET',
      async: true,
      dataType: 'json',
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          users[i] = data[i];
        }
      }
    });
  };

  // update form with red error indicators
  printError = function () {
    $( '#uname-div' ).addClass('has-error');
    $( '#username' ).val('Invalid combo');
    $( '#pword-div' ).addClass('has-error');
    $( '#password' ).val('');
  };

  // clean and check the input from our form
  checkInput = function (event) {
    var 
      uname = $( '#username' ).val(),
      pword = $( '#password' ).val(),
      is_user = false;

    for (var i = 0; i < users.length; i++) {
      if (uname === users[i].USERNAME && pword === users[i].PASSWORD) {
        is_user = true;
        break;
      }
    }

    if (is_user === false) {
      event.preventDefault();
      printError();
    }
  };

  // bound method that triggers each time the hash of the location is changed
  onHashChange = function () {
    changePage( document.location.hash );
  };

  // display html content in the main div based on the current hash 
  changePage = function (newHash) {
    if (newHash === '#get-started')
      showCreatePage();
    else
      showLandPage();
  };

  // init method: grab all users, and set form behavior
  init = function () {
    // get users asynchronously on page load so that we don't have to wait to
    // check if a user's credentials are valid later
    getUsers();
    // bind onHashChange method to the hashchange window event and trigger it
    // to load the necessary html
    $(window)
      .bind('hashchange', onHashChange)
      .trigger('hashchange');
  };
  
  return { init : init };

}();
    
    
