
<?php session_start(); ?>

<?php if (empty($_SESSION['username'])): ?>

<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <title>Schedule Buddy</title>
    
    <!-- Bootstrap css -->
    <link href="css/libs/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/libs/navbar-fixed-top.css" rel="stylesheet">

    <!-- js -->
    <script src="js/libs/jquery-1.11.0.min.js" type="text/javascript"></script>
    
  </head>

  <body>

    <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Schedule Buddy</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>

        <div class="navbar-collapse collapse">
          <form class="navbar-form navbar-right" role="form" id="create-user">
            <div class="form-group">
              <input type="text" placeholder="Username" class="form-control" id="username" name="username">
            </div>
            <div class="form-group">
	      <input type="password" placeholder="Password" class="form-control" id="password" name="password">

            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div><!--/.navbar-collapse -->
      </div>

        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h1>Schedule Buddy</h1>

		<form class="navbar-form navbar-left" id="create-user">
		  <div class="formgroup">
		      Username: <input type="text" class="form-control" id="username" name="username">
		      Password: <input type="password" class="form-control" id="password" name="password">
			      <button type="submit" class="btn btn-default">Submit</button>
			        </div>
				</form>

        <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
        <p>To see the difference between static and fixed top navbars, just scroll.</p>
        <p>
          <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">Get Started</a>
        </p>
      </div>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="../../dist/js/bootstrap.min.js"></script>
  </body>

<script>
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
