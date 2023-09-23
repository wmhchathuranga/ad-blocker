<?php
// Set CORS headers to allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Path to the easylist.txt file
$filePath = "easylist.txt"; // Replace with the actual path to your easylist.txt file

// Check if the file exists
if (file_exists($filePath)) {
    // Set the appropriate content type for a text file
    header("Content-Type: text/plain");

    // Send the file content
    readfile($filePath);
} else {
    // Return a 404 Not Found error if the file does not exist
    http_response_code(404);
    echo "File not found";
}
