<?php
 echo "aido file started";
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include './config.php';
    include './connect.php';
    
   
        $sqlQuery = "SELECT * FROM aido_registration" ;
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
        $itemCount = $stmt->rowCount();
        echo json_encode($itemCount);
        if($itemCount > 0){
        
            $aidoArr = array();
            $aidoArr["body"] = array();
            $aidoArr["itemCount"] = $itemCount;
    
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $e = array(
                    "aido_id" => $aido_id,
                    "aido_name" => $aido_name,
                    "aido_email" => $email,
                    "aido_skype" => $age,
                    
                );
    
                array_push($employeeArr["body"], $e);
            }
            echo json_encode($employeeArr);
        }
    
        else{
            http_response_code(404);
            echo json_encode(
                array("message" => "No record found.")
            );
        }
    


   

   
   


   

    
?>