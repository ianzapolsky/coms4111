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
    <link href="css/libs/sticky-footer.css" rel="stylesheet">

    <!-- js -->
    <script src="js/libs/jquery-1.11.0.min.js" type="text/javascript"></script>
    
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
          <a class="navbar-brand" href="#">Schedule Buddy</a>
        </div>

	<!-- Navigation Here -->
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
	        <li><a href="#contact">Contact</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
	      		 <li>
				<form class="navbar-form" role="form" id="create-user">
            			      <button type="submit" class="btn btn-default">Log Out</button>
          			      	      </form>
								</li>
									  </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron page-header">
        <h1>Schedule Buddy</h1>

	<p>[Image Will Go Here]</p>
        <p>
	Want to quickly and easily find available times to meet with others?
	</p>
	<p>Join today to make scheduling meetings easy!</p>

        <p>
          <a class="btn btn-lg btn-primary" href="#" role="button">Get Started</a>
        </p>
      </div>

    </div> <!-- /container -->

    <div id="footer">
      <div class="container">
        <p class="text-muted">&#169; 2014 - Ian Zapolsky and Shensi Ding</p>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="js/libs/bootstrap.min.js"></script>
  </body>

</html>