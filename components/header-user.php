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
    <link href="css/libs/calendar.css" rel="stylesheet">


    <!-- js -->
    <script src="js/libs/jquery-1.11.0.min.js" type="text/javascript"></script>
    <script src="js/sb_index.js" type="text/javascript"></script>
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
            <li class="dropdown">
              <a href="#schedules" class="dropdown-toggle" data-toggle="dropdown">Schedules <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#schedules?username=<?php echo $_SESSION['username']; ?>">View Schedules</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#buddies" class="dropdown-toggle" data-toggle="dropdown">Buddies <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#buddies">View Buddies</a></li>
                <li><a href="#addbuddy">Add Buddy</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#usergroups" class="dropdown-toggle" data-toggle="dropdown">Groups<b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#usergroups">View Your Groups</a></li>
                <li><a href="#addCommitment">Join Group</a></li>
              </ul>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
	    <li>
	      <form class="navbar-form" action="sb_logout.php" role="form">
              <button type="submit" class="btn btn-danger">Log Out</button>
              </form>
	    </li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

