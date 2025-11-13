<?php 
declare(strict_types=1);


class UsersModel {
  private \PDO $pdo;

  public function __construct(\PDO $pdo) {
    $this->pdo = $pdo;
  }

  public function getUser() {
    $stmt = $this->pdo->query("SELECT * FROM Users");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

 
  public function createUser(array $data): array {
        $stmt = $this->pdo->prepare(query: "
            INSERT INTO Users (id, name, phone)
            VALUES (:id, :name, :phone)
        ");
        $stmt->execute([
            ':id' => $data['userId'],
            ':name' => $data['name'],
            ':phone' => $data['phone']
        ]);
        return ['success' => true, 'message' => 'User created successfully'];
    }

}