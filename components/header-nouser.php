<!-- Header if there is no username -->
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <title>ScheduleBuddy</title>
    
    <!-- Bootstrap css -->
    <link href="css/libs/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/libs/navbar-fixed-top.css" rel="stylesheet">
    <link href="css/libs/sticky-footer.css" rel="stylesheet">

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
 	        <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">ScheduleBuddy</a>
        </div>

	<!-- Navigation Here -->
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
	        <li><a href="#contact">Contact</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">

          <form class="navbar-form" role="form" id="create-user">
<li style="display: inline-block;">
            <div class="form-group">
              <input type="text" placeholder="Username" class="form-control" id="username" name="username">
            </div>
</li>
<li style="display: inline-block;">
            <div class="form-group">
	          <input type="password" placeholder="Password" class="form-control" id="password" name="password">
            </div>
</li>
<li style="display: inline-block;">
            <button type="submit" class="btn btn-default">Sign in</button>
</li>
          </form>

	    </li></ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
