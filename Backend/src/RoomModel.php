<?php 

class RoomModel {
    private \PDO $pdo;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getRooms(): array {
        $stmt = $this->pdo->query("SELECT * FROM Rooms");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
  // no create room yet
}