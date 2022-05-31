<?php 
    define('PG_DB', "Hung_Tien");
    define('PG_HOST', "localhost");
    define('PG_USER', "postgres");
    define('PG_PORT', "5432");
    define('PG_PASS', "son1906");

    $conn = pg_connect("dbname=".PG_DB." password=".PG_PASS." host=".PG_HOST." user=".PG_USER." port=".PG_PORT);
    
    if(!$conn) {
        echo "Mất kết nối";
    }
?>