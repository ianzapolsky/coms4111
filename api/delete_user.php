<?php 
  
/**
 * delete_user.php
 * delete a row from the users table, destroying the user whose username and 
 * password are passed as GET URL parameters.
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

// check for username
if (!$_GET['username'] || !$_GET['password']) { 
  die('One of the parameters was not provided!');
}
else {
  // prepare statement
  $msg = "delete from users where username='" . $_GET['username'] . "' and password='" .$_GET['password'] . "'";
  $stid = oci_parse($conn, $msg); 
  if (!$stid) {
    die('Statement preparation failed!');
  }
}

// perform the logic of the query
$r = oci_execute($stid);
if (!$r) {
  die('Logic performance failed!');
}

// free resources related to Oracle cursor, end connection to database
oci_free_statement($stid);
oci_close($conn);

?>
