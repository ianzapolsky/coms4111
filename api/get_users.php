<?php 
  
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');

if (!$conn) {
  echo '<p>Database not connected!</p>';
}

// see if we are querying a specific user
if ($_GET['name']) {
  // prepare statement
  $msg = "SELECT * FROM users WHERE username='" . $_GET['name'] . "'";
  $stid = oci_parse($conn, $msg); 
  if (!$stid) {
    echo '<p>Statement preparation failed!</p>';
  }
}
else {
  // prepare the statement
  $stid = oci_parse($conn, 'SELECT * FROM users');
  if (!$stid) {
    echo '<p>Statement preparation failed!</p>';
  }
}

// perform the logic of the query
$r = oci_execute($stid);
if (!$r) {
    echo '<p>Logic performance failed!</p>';
}

// fetch results of entire query at once
$rows = oci_fetch_all($stid, $result);

// convert to json and print
$json = json_encode($result);
echo $json;

oci_free_statement($stid);
oci_close($conn);

?>
