<?php   

/**
 * get_schedule.php - queries the database for a schedule based on its owner's
 * username which is supplied as a GET variable in the requesting URL. returns
 * JSON representation of the schedule.
 * Ian Zapolsky - 4.1.14
 */ 

// initialize database connection
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');

// figure out some better PHP error handling
if (!$conn) {
  die('Database not connected!');
} 

// see if we are querying a specific user
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

// fetch results of entire query at once
$rows = oci_fetch_all($stid, $result);
echo '<p>' . $rows . ' rows fetched</p>';

// convert to json and print
echo json_encode($result);

oci_free_statement($stid);
oci_close($conn);

?>
