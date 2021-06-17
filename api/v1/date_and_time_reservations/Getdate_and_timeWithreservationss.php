
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
        
        if (!allow_request_methods(["GET"])) {
            die("Request not allowed");
        }
        
        $connection = new DbConnection();
    
        
    $id = $_GET["Id"];
    
    if (isset($id) and $id !== "") {
        $result = $connection->GetQueryResult("SELECT * FROM date_and_time JOIN date_and_time_reservations ON date_and_time_reservations.date_and_timeId = date_and_time.Id JOIN reservations ON reservations.Id = date_and_time_reservations.reservationsId WHERE Id = $id");
        $data = $result->fetch_assoc();
        if (count($data) === 0) {
            echo json_encode(new HttpResult([], 404));
        } else {
            echo json_encode(new HttpResult($data[0], 200));
        }
    } else {
        $result = $connection->GetQueryResult("SELECT * FROM date_and_time JOIN date_and_time_reservations ON date_and_time_reservations.date_and_timeId = date_and_time.Id JOIN reservations ON reservations.Id = date_and_time_reservations.reservationsId");
        $list = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
              array_push($list, $row);
            }
          } 
          echo json_encode(new HttpResult($list, 200));
    }
    
        

?>