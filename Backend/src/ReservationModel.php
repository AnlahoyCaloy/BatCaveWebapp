<?php
declare(strict_types=1);
class ReservationModel {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getReservations(): array {
        $stmt = $this->pdo->query("
            SELECT r.*, u.name AS user_name, rm.name AS room_name
            FROM Reservations r
            JOIN Users u ON r.user_id = u.id
            JOIN Rooms rm ON r.room_id = rm.id
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createReservation(array $data): array {
        $stmt = $this->pdo->prepare("
            INSERT INTO Reservations (
                id, room_id, user_id, date, start, end, pax, type, status, created_at
            )
            VALUES (
                :id, :room_id, :user_id, :date, :start, :end, :pax, :type, :status, :created_at
            )
        ");
        $stmt->execute([
            ':id' => $data['id'],
            ':room_id' => $data['room_id'],
            ':user_id' => $data['user_id'],
            ':date' => $data['date'],
            ':start' => $data['start'],
            ':end' => $data['end'],
            ':pax' => $data['pax'],
            ':type' => $data['type'],
            ':status' => $data['status'],
            ':created_at' => date('Y-m-d H:i:s')
        ]);

        return ['success' => true, 'message' => 'Reservation created successfully'];
    }

    public function deleteReservation(string $id): array {
        $stmt = $this->pdo->prepare("DELETE FROM Reservations WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return ['success' => true, 'message' => 'Reservation deleted'];
    }
}
