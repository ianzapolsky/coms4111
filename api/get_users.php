<?php 
  
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');

if (!$conn) {
  echo '<p>Database not connected!</p>';
} else {
  echo '<p>Connected successfully!</p>';
}

// see if we are querying a specific user
if ($_GET['name']) {
  echo 'argument present in the form of ' . $_GET['name'];
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
echo '<p>' . $rows . ' rows fetched</p>';

// convert to json and print
echo json_encode($result);

/* Fetch the results of the query
print "<table border='1'>\n";
while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
    print "<tr>\n";
    foreach ($row as $item) {
        print "    <td>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
    }
    print "</tr>\n";
}
print "</table>\n";*/

oci_free_statement($stid);
oci_close($conn);

?>
