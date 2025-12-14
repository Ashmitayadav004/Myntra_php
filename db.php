<?php
$host = "localhost";
$user = "root";       // MySQL username
$pass = "sukku@imunni";           // MySQL password
$dbname = "myntra_clone";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
