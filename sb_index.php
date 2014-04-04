
<?php session_start(); ?>

<?php if (empty($_SESSION['username'])): ?>
  <html>
    <head>
    <title>Schedule Buddy</title>
    <link href="css/libs/bootstrap.min.css" rel="stylesheet">
    <script src="js/libs/jquery-1.11.0.min.js" type="text/javascript"></script>
    </head>
    <body>

    <!-- LOGIN FORM -->
    <div class="container">
      <div class="text-centered">
        <h1>ScheduleBuddy Login</h1>
        <form action="sb_login.php" method="post">
          <div class="form-group" style="width:400px;">
            <p>username: <input class="form-control" type="text" name="username"></p>
            <p>password: <input class="form-control" type="password" name="password"></p>
            <button class="btn btn-primary" type="submit">login</button>
          </form>
        </div>
      </div>
    </div>
    </body>
  </html>

<?php else: ?>
  <html>
    <head>
    <title>Schedule Buddy</title>
    <link href="css/libs/bootstrap.min.css" rel="stylesheet">
    <script src="js/libs/jquery-1.11.0.min.js" type="text/javascript"></script>
    </head>
    <body>
    
      <div class="container">
     
        <div class="text-centered">
          <h1>ScheduleBuddy</h1>
          <h3>Welcome, <?php echo $_SESSION['username']; ?>!</h3>
          <h3><a href="sb_other.php">test link</a></h3>
          <form action="sb_logout.php">
            <div class="form-group" style="width:400px;">
              <button class="btn btn-danger" type="submit">logout</button>
          </form>
        </div>

      </div>

    </body>

    <script>
      var users = [];

      $(document).ready(function () {
        $.ajax({
          url: 'api/get_users.php',
          type: 'GET',
          async: true,
          dataType: 'json',
          success: function (data) {
            for (var i = 0; i < data.length; i++) {
              users[i] = data[i].USERNAME;
            }
          }
        });
      });

    $( '#form' ).change(function () {
      var str = $( '#form' ).val();
      var is_user = false;
      for (var i = 0; i < users.length; i++) {
        if (users[i] === str) {
          is_user = true;
          break;
        }
      }
      if (is_user) 
        $( '#main' ).html('...is a user');
      else
        $( '#main' ).html('...is not a user');
    }); 

    $( '#create-user' ).submit(function(event) {
      event.preventDefault();
      // add error catching for empty fields and duplicate to users that
      // already exist
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
  </script>

</html>

<?php endif; ?>

    
