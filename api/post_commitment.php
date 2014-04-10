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

if ($_GET['CID'] && $_GET['SID'] && $_GET['CNAME'] && $_GET['START_TIME'] && $_GET['END_TIME'] && $_GET['DAY']) { 
  $cid = $_GET['CID'];
  $sid = $_GET['SID'];
  $cname = $_GET['CNAME'];
  $start_time = $_GET['START_TIME'];
  $end_time = $_GET['END_TIME'];
  $day = $_GET['DAY'];
}
else {
  die('Incomplete data!');
}

// prepare statement
$msg = "insert into commitments values ('" . $cid . "', '" . $sid. "', '" . $cname . "', '" . $start_time . "', '" . $end_time . "', '" . $day . "')";
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
