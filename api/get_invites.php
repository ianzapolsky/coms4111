<?php 
  
/**
 * get_buddies.php
 * query the database for all buddies of some user, supplied as a GET variable 
 * in the requesting URL. return associative array of buddies in JSON. 
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

// check for username
if (!$_GET['username']) {
  die('No username provided!');
}
else {
  // prepare statement
  $msg = "SELECT iname, username from invites where iid in (select iid from sent_to where username='" . $_GET['username'] . "')";
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

// fetch results of query line by line and create an associative array of users 
$result = array();
while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
  $result[] = $row; 
}

// convert to json and print
$json = json_encode($result);
echo $json;

// free resources related to Oracle cursor, end connection to database
oci_free_statement($stid);
oci_close($conn);

?>
