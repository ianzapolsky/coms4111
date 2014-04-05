<?php session_start(); ?>

<?php if (empty($_SESSION['username'])): ?>

<?php include 'components/header-nouser.php'; ?>

  <div class="container">
    <div class="jumbotron">
      <h1>ScheduleBuddy</h1>

	    <p>Having trouble finding a time that works for everyone?</p>
      <p>Want to quickly and easily find available times to meet with others?</p>
	    <p>Use ScheduleBuddy to make scheduling meetings easy!</p>
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

  </body>

</html>

<?php else: ?>

<?php include 'components/header-user.php'; ?>

  <div class="container">
    <div class="jumbotron">
      <h1>ScheduleBuddy</h1>
	    <p>Welcome, <?php echo $_SESSION['username']; ?>!</p>
    </div>
  </div> <!-- /container -->

  <div id="footer">
    <div class="container">
      <p class="text-muted">&#169; 2014 - Ian Zapolsky and Shensi Ding</p>
    </div>
  </div>

  </body>
</html>

<?php endif; ?>


