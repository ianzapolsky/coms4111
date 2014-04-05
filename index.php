<?php session_start(); ?>

<?php if (empty($_SESSION['username'])): ?>
<!-- PAGE WITH LOGIN FORM -->
<?php include ('sb_nouser.php'); ?>

    <script>
    $(document).ready(function () {
    sb_login.init($( '#login-form' ))
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
  
<?php else: ?>
<!-- PAGE WITH NO LOGIN FORM -->
<?php include ('sb_user.php'); ?>


<?php endif; ?>




