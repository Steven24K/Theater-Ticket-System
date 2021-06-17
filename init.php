
        <?php 
        
        require_once('config.php');
        require_once('./utils/DbConnection.php');
        
        
        $connection = new DbConnection();
        
        // Create models
        
        $connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS date_and_time(
    Id INT AUTO_INCREMENT, 
    Date VARCHAR(50) ,
Time VARCHAR(50) ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS reservations(
    Id INT AUTO_INCREMENT, 
    amount INT ,
CheckedIn BOOLEAN ,
PayementID VARCHAR(50) ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS discount_code(
    Id INT AUTO_INCREMENT, 
    Code VARCHAR(50) ,
Expiration_Date VARCHAR(50) ,
Discount FLOAT ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS theater_show(
    Id INT AUTO_INCREMENT, 
    Title VARCHAR(50) ,
Description TEXT ,
Price FLOAT ,
image_url LONGTEXT ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS director(
    Id INT AUTO_INCREMENT, 
    Name VARCHAR(50) UNIQUE,
Password VARCHAR(50) ,
DateOfBirth VARCHAR(50) ,
Bio TEXT ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS admin(
    Id INT AUTO_INCREMENT, 
    Name VARCHAR(50) UNIQUE,
Password VARCHAR(50) ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS reseller(
    Id INT AUTO_INCREMENT, 
    Name VARCHAR(50) UNIQUE,
Password VARCHAR(50) ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS actor(
    Id INT AUTO_INCREMENT, 
    Name VARCHAR(50) UNIQUE,
Password VARCHAR(50) ,
DateOfBirth VARCHAR(50) ,
Bio TEXT ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS location(
    Id INT AUTO_INCREMENT, 
    Name VARCHAR(50) ,
Capacity INT ,
Adress VARCHAR(50) ,
PostalCode VARCHAR(8) ,
City VARCHAR(50) ,
GMapLink TEXT ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS link(
    Id INT AUTO_INCREMENT, 
    Text VARCHAR(50) ,
Url VARCHAR(50) ,

    PRIMARY KEY (Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS customer(
    Id INT AUTO_INCREMENT, 
    Email VARCHAR(50) ,
FirstName VARCHAR(50) ,
LastName VARCHAR(50) ,
Insertion VARCHAR(50) ,
reg_date VARCHAR(50) ,

    PRIMARY KEY (Id)
);");


        
        
        // Create relations
        
        $connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS location_theater_show(
    
    locationId INT, 
    theater_showId INT, 
    PRIMARY KEY (theater_showId),
    FOREIGN KEY (locationId) REFERENCES location(Id),
    FOREIGN KEY (theater_showId) REFERENCES theater_show(Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS theater_show_discount_code(
    
    theater_showId INT, 
    discount_codeId INT, 
    PRIMARY KEY (discount_codeId),
    FOREIGN KEY (theater_showId) REFERENCES theater_show(Id),
    FOREIGN KEY (discount_codeId) REFERENCES discount_code(Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS theater_show_date_and_time(
    Id INT AUTO_INCREMENT,
    theater_showId INT, 
    date_and_timeId INT, 
    PRIMARY KEY (Id),
    FOREIGN KEY (theater_showId) REFERENCES theater_show(Id),
    FOREIGN KEY (date_and_timeId) REFERENCES date_and_time(Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS theater_show_actor(
    Id INT AUTO_INCREMENT,
    theater_showId INT, 
    actorId INT, 
    PRIMARY KEY (Id),
    FOREIGN KEY (theater_showId) REFERENCES theater_show(Id),
    FOREIGN KEY (actorId) REFERENCES actor(Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS director_theater_show(
    
    directorId INT, 
    theater_showId INT, 
    PRIMARY KEY (theater_showId),
    FOREIGN KEY (directorId) REFERENCES director(Id),
    FOREIGN KEY (theater_showId) REFERENCES theater_show(Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS date_and_time_reservations(
    
    date_and_timeId INT, 
    reservationsId INT, 
    PRIMARY KEY (reservationsId),
    FOREIGN KEY (date_and_timeId) REFERENCES date_and_time(Id),
    FOREIGN KEY (reservationsId) REFERENCES reservations(Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS actor_link(
    
    actorId INT, 
    linkId INT, 
    PRIMARY KEY (linkId),
    FOREIGN KEY (actorId) REFERENCES actor(Id),
    FOREIGN KEY (linkId) REFERENCES link(Id)
);");

$connection->ExecuteQuery("CREATE TABLE IF NOT EXISTS director_link(
    
    directorId INT, 
    linkId INT, 
    PRIMARY KEY (linkId),
    FOREIGN KEY (directorId) REFERENCES director(Id),
    FOREIGN KEY (linkId) REFERENCES link(Id)
);");


        
        
        ?>
        