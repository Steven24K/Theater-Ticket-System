
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

    if (count($data) > 0) {
        $insert_count = 0;
        foreach ($data as $record) {
            if (isset($data->showId) and isset($data->discount_codeId)) {
                $connection->ExecuteQuery("INSERT INTO show_discount_code(showId, discount_codeId) VALUES ($data->showId, $data->discount_codeId)");
                $insert_count += 1;
            } 
        } 
        echo json_encode(new HttpResult("Inserted '$insert_count' records", 200));
    } else {
        echo json_encode(new HttpResult("List is empty", 200));
    }
    
        
        

?>