
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
        
        if (!allow_request_methods(["DELETE"])) {
            die("Request not allowed");
        }
        
        $connection = new DbConnection();
    
        
    $id = $_GET["theater_showId"];
    
    if (isset($id)) {
        $result = $connection->ExecuteQuery("DELETE FROM director_theater_show WHERE theater_showId = $id");
        if ($result === TRUE) {
            echo json_encode(new HttpResult($result, 200));
        } else {
            echo json_encode(new HttpResult($result, 500));
        }
    } else {
        echo json_encode(new HttpResult("Invalid parameters", 500));
    }
    
        
        

?>