<?php 
  
/**
 * get_users.php
 * query the database for a user based on its username, supplied as a GET
 * variable in the requesting URL. if no GET variable is supplied, query all
 * users. returns associative array of users in JSON.
 */

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
}

// see if we are querying a specific user. if not, return all users.
if ($_GET['username']) {
  // prepare statement
  $msg = "SELECT * FROM users WHERE username='" . $_GET['username'] . "'";
  $stid = oci_parse($conn, $msg); 
  if (!$stid) {
    die('Statement preparation failed!');
  }
}
else {
  // prepare the statement
  $stid = oci_parse($conn, 'SELECT * FROM users');
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
