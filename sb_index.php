<?php session_start(); ?>

<?php if (empty($_SESSION['username'])): ?>

<?php include 'components/header-nouser.php'; ?>

  <div class="container">
    <div class="jumbotron">
      <h1>ScheduleBuddy</h1>

      <div class="row">
        <div class="col-md-8" style="padding: 30px;">
          <p>Having trouble finding a time that works for everyone?</p>
          <p>Want to quickly and easily find available times to meet with others?</p>
          <p>Use ScheduleBuddy to make scheduling meetings easy!</p>
          <button class="btn btn-lg btn-success" href="#">Get Started &raquo;</button>
        </div>

        <div class="col-md-4">
          <form class="form-signin" id="login-form" action="sb_login.php" method="post">
            <h2 class="form-signin-heading">Returning Users</h2>
            <div id="uname-div">
              <input type="text" class="form-control" placeholder="Username" id="username" name="username" required autofocus>
            </div>
            <div id="pword-div">
              <input type="password" class="form-control" placeholder="Password" id="password" name="password" required>
            </div>
            <label class="checkbox">
              <input type="checkbox" value="remember-me"> Remember me
            </label>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      </div>

    </div>
  </div> <!-- /container -->

  <script>
    $(document).ready(function () {
      sb_login.init($( '#login-form' ));
    });
  </script>

<?php else: ?>

<?php include 'components/header-user.php'; ?>

  <div class="container">
    <div class="jumbotron">
      <h1>ScheduleBuddy</h1>
	    <p>Welcome, <?php echo $_SESSION['username']; ?>!</p>
    </div>
  </div> <!-- /container -->

<?php endif; ?>

<?php include 'components/footer.php'; ?>

