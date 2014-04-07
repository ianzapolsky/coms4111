/**
 * sb_index.js
 * js for schedule buddy index
 * by Ian Zapolsky - 4/6/14
 */

var sb_index = function () {

  var displayCreateUser;

  displayCreateUser = function () {
    console.log('function fired');
    var html = String()
      + '<div id="main" class="container">'
        + '<div class="jumbotron">'
          + '<h1>ScheduleBuddy</h1>'
          + '<p>Enter a username and password to create a new user:</p>'
          + '<form class="form-signin" id="create-user" method="post">'
            + '<div id="uname-div">'
              + '<input type="text" class="form-control" placeholder="Username" '
               + 'id="username" name="username" required autofocus>'
            + '</div>'
            + '<div id="pword-div">'
              + '<input type="password" class="form-control" placeholder="Password" '
              + 'id="password" name="password" required>'
            + '</div>'
            + '<button class="btn btn-lg btn-primary btn-block" type="submit">Create User</button>'
          + '</form>'
        + '</div>'
      + '</div>';
 
    $( '#main' ).html(html);

    $( '#create-user' ).submit(function (event) {
      event.preventDefault();
      var username = $( '#username' ).val();
      var password = $( '#password' ).val();
      var user = {"USERNAME": username, "PASSWORD": password};
      console.log(user);
      $.ajax({
        url: 'api/create_user.php',
        type: 'POST',
        data: user,
        async: false,
        dataType: 'json',
      });
      location.reload();
    });
  };

  return { displayCreateUser:displayCreateUser };

}();
