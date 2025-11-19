<?php
class RoomModel {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getRooms(): array {
        $stmt = $this->pdo->query("SELECT * FROM Rooms");
        $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($rooms as $room) {
            foreach ($rooms as $room) {
                $room['id'] = str_replace('"' , '' ,$room['id']);
                $room['name'] = str_replace('"', '', $room['name']);
            }
        }

        return $rooms;
    }

    public function createRoom(array $data): array {
        $stmt = $this->pdo->prepare("
            INSERT INTO Rooms (id, name, capacity)
            VALUES (:id, :name, :capacity)
        ");
        $stmt->execute([
            ':id' => $data['id'],
            ':name' => $data['name'],
            ':capacity' => $data['capacity']
        ]);
        return ['success' => true, 'message' => 'Room added successfully'];
    }

    public function deleteRoom(string $id): array {
        $stmt = $this->pdo->prepare("DELETE FROM Rooms WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return ['success' => true, 'message' => 'Room deleted'];
    }
}
