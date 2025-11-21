<?php 

class Database {
    private ?\PDO $pdo = null;

    public function __construct() {
        $this->connect();
    }

    public function connect() {
        // Detect if running in Docker/Render
        if (getenv('RENDER')) { 
            $dbPath = '/var/www/database/batcave.db';
        } else {
            // Local path
            $dbPath = __DIR__ . '/../database/batcave.db';
        }

        $this->pdo = new PDO("sqlite:" . $dbPath);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getConnection(): \PDO {
        return $this->pdo;
    }
}

//
// declare(strict_types=1);

// class Database {

//   private \PDO $pdo;
//   // directoy for linux - sqlite:/opt/lampp/htdocs/batcave/Batcave/Backend/src/mydatabase.db
//   public function __construct(private string $path = __DIR__ . '/../database/batcave.db'){
//     $this->connect();
//   }

//   public function connect() {
//     $this->pdo = new PDO("sqlite:" . $this->path);
//   }

//   public function getConnection() {
//     return $this->pdo;
//   }

// }


