<?php 

declare(strict_types=1);

class Database {

  private \PDO $pdo;

  public function __construct(private string $path = 'D:\BASTITE\xampp2\htdocs\BatCave\Backend\database\batcave.db'){
    $this->connect();
  }

  public function connect() {
    $this->pdo = new PDO("sqlite:" . $this->path);
  }

  public function getConnection() {
    return $this->pdo;
  }

}