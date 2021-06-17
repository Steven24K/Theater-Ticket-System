
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
    
        
    if ( isset($data->date_and_timeId) and isset($data->reservationsId)) {
        $result = $connection->ExecuteQuery("UPDATE date_and_time_reservations SET date_and_timeId = $data->date_and_timeId, reservationsId = $data->reservationsId WHERE reservationsId = $data->reservationsId");
        
        if ($result === TRUE) {
            echo json_encode(new HttpResult($result, 200));
        } else {
            echo json_encode(new HttpResult($result, 500));
        }
    } else {
        echo json_encode(new HttpResult('Not all fields are filled in correctly', 402));
    }
    
    
        

?>