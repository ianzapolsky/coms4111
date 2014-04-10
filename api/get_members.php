<?php 
  
/**
 * get_members.php
 * query the database for all groups that some user is a member of, where 
 * username is supplied as a GET variable in the requesting URL. return 
 * associative array of groups in JSON. 
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

// check for username
if (!$_GET['gid']) {
  die('No group provided!');
}
else {
  // prepare statement
  $msg = "SELECT username FROM member_of WHERE gid='" . $_GET['gid'] . "'";
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