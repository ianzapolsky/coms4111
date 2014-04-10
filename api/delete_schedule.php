<?php 
  
/**
 * delete_schedule.php
 * delete a row from the schedules table, destroying the sched whose sid and 
 * are passed as a GET URL parameter
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

// check for sid
if (!$_GET['sid']) { 
  die('sid was not provided!');
}
else {
  // prepare statement
  $msg = "delete from commitments where sid='" . $_GET['sid'] . "'";

DELETE FROM schedules WHERE sid='" . $_GET['sid'] . "'";
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
