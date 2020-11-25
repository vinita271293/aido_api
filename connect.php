<?php
//    $con=mysqli_connect("ec2-13-56-254-231.us-west-1.compute.amazonaws.com","root","test1234");
//    $sql="CREATE DATABASE aido_db_test1";
//    if (mysqli_query($con,$sql)) {
//       echo "Database my_db created successfully";
//    }
//    else{
//     echo "Database my_db created not successfully";
//    }

   $mysqli = new mysqli("ec2-13-56-254-231.us-west-1.compute.amazonaws.com","root","test1234","aido_test");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
if ($result = mysqli_query($con, "SELECT * FROM aido_registration")) {
    echo "Returned rows are: " . mysqli_num_rows($result);
    // Free result set
    mysqli_free_result($result);
  }
?>