
        <?php 
        require_once('config.php');
        require_once('./utils/DbConnection.php');
        
        $connection = new DbConnection();
        
        // Seed models 
        
        $connection->ExecuteQuery("INSERT INTO admin(Name, Password) VALUES 
    ('Steven', " . "'" . md5('root') . "'" . ");
");


        
        
        // Seed relations 
        
        /**
         * TODO: Make relationsship seeding 
         * This one will be a bit more complex then the models since the relation tables contain a lot of foreigner keys. Wich are entity Ids and set to auto AUTO_INCREMENT. 
         * So in order to make relationsship seeding we need te generate ids locally. 
         * We don't want the user of this tool have to worry about ID's, but it is an idea to make an option to explicetely asign any value as primary key. 
        */
        
        ?>
        