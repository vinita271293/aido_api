<?php
   $con=mysqli_connect("ec2-13-56-254-231.us-west-1.compute.amazonaws.com","root","test1234");
   $sql="CREATE DATABASE aido_db_test1";
   if (mysqli_query($con,$sql)) {
      echo "Database my_db created successfully";
   }
   else{
    echo "Database my_db created not successfully";
   }
?>