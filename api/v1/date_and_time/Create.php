
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
        
        if (!allow_request_methods(["POST"])) {
            die("Request not allowed");
        }
        
        $connection = new DbConnection();
        
        
    $data = json_decode(file_get_contents("php://input")); 
    
    if (isset($data->Date) and isset($data->Time)) {
        $last_id = $connection->ExecuteQuery("INSERT INTO date_and_time(Date, Time) VALUES ('$data->Date', '$data->Time')");
        echo json_encode(new HttpResult($last_id, 200));
    } else {
        echo json_encode(new HttpResult(-1, 402));
    }
    
    
        

?>