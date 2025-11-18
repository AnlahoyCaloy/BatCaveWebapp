<?php 

declare(strict_types=1);

class Database {

  private \PDO $pdo;
  // directoy for linux - sqlite:/opt/lampp/htdocs/batcave/Batcave/Backend/src/mydatabase.db
  public function __construct(private string $path = __DIR__ . '/../database/batcave.db'){
    $this->connect();
  }

  public function connect() {
    $this->pdo = new PDO("sqlite:" . $this->path);
  }

  public function getConnection() {
    return $this->pdo;
  }

}