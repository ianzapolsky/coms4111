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

// prepare statement
$msg = "SELECT max(IID) FROM invites";
$stid = oci_parse($conn, $msg); 
if (!$stid) {
  die('Statement preparation failed!');
}

// perform the logic of the query
$r = oci_execute($stid);
if (!$r) {
  die('Logic performance failed!');
}

// fetch results of query line by line and create an associative array of users 
oci_fetch_all($stid, $result);

// convert to json and print
$json = json_encode($result);
echo $json;

// free resources related to Oracle cursor, end connection to database
oci_free_statement($stid);
oci_close($conn);

?>
