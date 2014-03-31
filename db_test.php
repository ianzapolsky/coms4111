<?php 
  
$conn = oci_connect('iaz2105', 'a', 'w4111b.cs.columbia.edu/ADB');

if (!$conn) {
  echo '<p>' . oci_error() . '</p>';
} else {
  echo '<p>Connected successfully!</p>';
}

// prepare the statement
$stid = oci_parse($conn, 'SELECT * FROM users');
if (!$stid) {
    echo '<p>' . oci_error($conn) . '</p>';
}

// perform the logic of the query
$r = oci_execute($stid);
if (!$r) {
    echo '<p>' . oci_error($stid) . '</p>';
}

// fetch results of entire query at once
$rows = oci_fetch_all($stid, $result);
echo '$rows rows fetched<br>\n';

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
