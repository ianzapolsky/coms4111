<?php session_start(); ?>

<?php if (empty($_SESSION['username'])): ?>

<?php include 'components/header-nouser.php'; ?>

  <div id="main" class="container">
  </div>

  <script>
    $(document).ready(function () {
      sb_login.init($( '#login-form' ));
    });
  </script>

<?php else: ?>

<?php include 'components/header-user.php'; ?>

  <div id="main" class="container">
    <div class="jumbotron">
      <h1>ScheduleBuddy</h1>
	    <p>Welcome, <?php echo $_SESSION['username']; ?>!</p>
    </div>
  </div> <!-- /container -->

  <script>
    $(document).ready(function () {
      sb_index.init();
    });
  </script>

<?php endif; ?>

<?php include 'components/footer.php'; ?>

