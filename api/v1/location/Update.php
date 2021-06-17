
<?php
/**
 * The following file has been generated by CodeGenPHP. 
 * Make sure you don't edit any of the files, because they will be overwritten by the next run. 
 * 
 * Made by CodeGenPHP - author: Steven K https://stevenkoerts.nl/
*/


        require_once('../../../config.php');
        require_once('../../../utils/DefaultHeaders.php');
        require_once('../../../utils/DbConnection.php');
        require_once('../../../utils/HttpResult.php');
        require_once('../../../utils/utils.php');
        
        if (!allow_request_methods(["PUT"])) {
            die("Request not allowed");
        }
    
        
    $data = json_decode(file_get_contents("php://input")); 
    $connection = new DbConnection();
    
    if (isset($data->Id) and isset($data->Name) and isset($data->Capacity) and isset($data->Adress) and isset($data->PostalCode) and isset($data->City) and isset($data->GMapLink)) {
        $result = $connection->ExecuteQuery("UPDATE location SET Name = '$data->Name', Capacity = $data->Capacity, Adress = '$data->Adress', PostalCode = '$data->PostalCode', City = '$data->City', GMapLink = '$data->GMapLink' WHERE Id = $data->Id");
        
        if ($result === TRUE) {
            echo json_encode(new HttpResult($result, 200));
        } else {
            echo json_encode(new HttpResult($result, 200));
        }
    } else {
        echo json_encode(new HttpResult('Not all fields are filled in correctly', 201));
    }
    
    
        

?>