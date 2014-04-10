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

if ($_GET['IID'] && $_GET['CID'] && $_GET['INAME'] && $_GET['USERNAME'] && $_GET['RNAME']) {
  $iid = $_GET['IID'];
  $cid = $_GET['CID'];
  $iname = $_GET['INAME'];
  $username = $_GET['USERNAME'];
  $rname = $_GET['RNAME'];
}
else {
  die('Incomplete data!');
}

// prepare statement 1
$msg = "insert into invites values ('" . $iid . "', '" . $cid . "', '" . $iname . "', '" . $username . "')";
echo $msg;
$stid = oci_parse($conn, $msg); 
if (!$stid) {
  die('Statement preparation failed!');
}

// perform the logic of the query
$r = oci_execute($stid);
if (!$r) {
  die('Logic performance failed 1!');
}

// prepare statement 1
$msg = "insert into sent_to values ('" . $rname . "', '" . $iid . "')";
$stid = oci_parse($conn, $msg);
if (!$stid) {
  die('Statement preparation failed!');
}

// perform the logic of the query
$r = oci_execute($stid);
if (!$r) {
  die('Logic performance failed 2!');
}

// free resources related to Oracle cursor, end connection to database
oci_free_statement($stid);
oci_close($conn);

?>
