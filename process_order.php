<?php
include 'db.php';

// Always return JSON
header("Content-Type: application/json");

// Read JSON from request
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No input data received"]);
    exit;
}

$items = json_encode($data['items']); // Store items as JSON text
$total_items = (int)$data['total_items'];
$total_mrp = (float)$data['total_mrp'];
$total_discount = (float)$data['total_discount'];
$convenience_fee = 99; 
$final_amount = (float)$data['final_amount'];

$stmt = $conn->prepare("INSERT INTO orders 
    (items, total_items, total_mrp, total_discount, convenience_fee, final_amount) 
    VALUES (?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "SQL Prepare failed: " . $conn->error]);
    exit;
}

// Types: s = string, i = integer, d = double
$stmt->bind_param("sidddd", $items, $total_items, $total_mrp, $total_discount, $convenience_fee, $final_amount);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Order placed successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to place order: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
