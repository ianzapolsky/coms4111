<?php 
  
/**
 * post_user.php
 * create a new user from a username and password passed as POST variables from
 * some form. 
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

if ($_GET['SID'] && $_GET['USERNAME'] && $_GET['SNAME']) { 
  $sid = $_GET['SID'];
  $username = $_GET['USERNAME'];
  $sname = $_GET['SNAME'];
}
else {
  die('Incomplete data!');
}

// prepare statement
$msg = "insert into schedules values ('" . $sid . "', '" . $username . "', '" . $sname . "')";
$stid = oci_parse($conn, $msg); 
if (!$stid) {
  die('Statement preparation failed!');
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
