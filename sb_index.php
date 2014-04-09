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
  <!-- page html goes here -->
  </div>

  <div id="calendar" class="container">
  <div class="jumbotron">
  <h3>Your Schedule</h3><br>  
  <?php include 'components/calendar.php'; ?>
  </div></div>

  <script>
    $(document).ready(function () {
      var session_username = <?php echo json_encode($_SESSION['username']); ?>;
      sb_index.init(session_username);
    });
  </script>

<?php endif; ?>

<?php include 'components/footer.php'; ?>

