<?php   

/**
 * get_commitments.php 
 * query the database for all commitments related to some schedule, supplied as
 * a GET variable in the requesting URL. returns associative array of 
 * commitments.
 */ 

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');
if (!$conn) {
  die('Database not connected!');
} 

// check for sid
if (!$_GET['sid']) {
  die('No schedule provided');
}
else {
  // prepare the statement
  $query = "select * from commitments where sid='" . $_GET['sid'] . "'";
  $stid = oci_parse($conn, $query);
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
