
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
   
    if (isset($data->theater_showId) and isset($data->actorId)) {
        $last_id = $connection->ExecuteQuery("INSERT INTO theater_show_actor(theater_showId, actorId) VALUES ($data->theater_showId, $data->actorId)");
        echo json_encode(new HttpResult($last_id, 200));
    } else {
        echo json_encode(new HttpResult(-1, 402));
    }
    
        
        

?>