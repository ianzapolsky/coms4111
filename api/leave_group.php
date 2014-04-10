<?php 
  
/**
 * join_group.php
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

if ($_GET['username'] && $_GET['gid']) { 
  $username = $_GET['username'];
  $gid = $_GET['gid'];
}
else {
  die('Incomplete data!');
}

// prepare statement 1
$msg = "delete from member_of where username='" . $username . "' and gid='" . $gid . "'";
$stid = oci_parse($conn, $msg); 
if (!$stid) {
  die('Statement preparation failed!');
}

// perform the logic of statement 1
$r = oci_execute($stid);
if (!$r) {
  die('Logic performance failed!');
}

// free resources related to Oracle cursor, end connection to database
oci_free_statement($stid);
oci_close($conn);

?>
