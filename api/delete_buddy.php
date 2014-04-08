<?php 
  
/**
 * delete_buddies.php
 * delete a row from the is_buddy table, destroying the buddy relationship 
 * between username1 and username2, passed as GET URL parameters.
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

// check for username
if (!$_GET['username1'] || !$_GET['username2']) {
  die('One of the users was not provided!');
}
else {
  // prepare statement
  $msg = "DELETE FROM is_buddy WHERE (username1='" . $_GET['username1'] . "' AND username2='" . $_GET['username2'] . "' ) OR (username2='" . $_GET['username'] . "' AND username1='" . $_GET['username2'] . "' )";
  
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
