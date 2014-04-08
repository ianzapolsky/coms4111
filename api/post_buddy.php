<?php 
  
/**
 * post_buddy.php
 * create a new is_buddy relationship between username1 and username2, passed
 * in as POST variables.
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

if ($_POST['USERNAME1'] && $_POST['USERNAME2']) { 
  $username1 = $_POST['USERNAME1'];
  $username2 = $_POST['USERNAME2'];
}
else {
  die('Incomplete data!');
}

// prepare statement 1
$msg = "insert into is_buddy values ('" . $username1 . "', '" . $username2 . "')";
$stid = oci_parse($conn, $msg); 
if (!$stid) {
  die('Statement preparation failed!');
}

// perform the logic of statement 1
$r = oci_execute($stid);
if (!$r) {
  die('Logic performance failed!');
}

// prepare statement 2
$msg = "insert into is_buddy values ('" . $username2 . "', '" . $username1 . "')";
$stid = oci_parse($conn, $msg); 
if (!$stid) {
  die('Statement preparation failed!');
}

// perform the logic of statement 2
$r = oci_execute($stid);
if (!$r) {
  die('Logic performance failed!');
}

// free resources related to Oracle cursor, end connection to database
oci_free_statement($stid);
oci_close($conn);

?>
