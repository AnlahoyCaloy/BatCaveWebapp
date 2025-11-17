<?php
declare(strict_types=1);
class ReservationModel {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // admin stuff      
    public function getReservations(): array {
        $stmt = $this->pdo->query("
            SELECT r.*, u.name AS user_name, rm.name AS room_name
            FROM Reservations r
            JOIN Users u ON r.user_id = u.id
            JOIN Rooms rm ON r.room_id = rm.id
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function changeReservationStatus(string $reservationId, string $newStatus): array {
    // Make sure $newStatus is valid
      $validStatuses = ['Pending', 'Ongoing', 'Completed', 'No-show', 'Cancelled'];
      if (!in_array($newStatus, $validStatuses)) {
        // guard for the new status although ill put a dropdown so this is really just useless
          return ['success' => false, 'message' => 'Invalid status'];
      }

      $stmt = $this->pdo->prepare("
          UPDATE Reservations
          SET status = :status
          WHERE id = :id
      ");

      $stmt->execute([
          ':status' => $newStatus,
          ':id' => $reservationId
      ]);

      return ['success' => true, 'message' => 'Reservation status updated'];
    }


    public function getReservationsByUser(string $userId): array {
      $stmt = $this->pdo->prepare("
          SELECT r.*, u.name AS user_name, rm.name AS room_name
          FROM Reservations r
          JOIN Users u ON r.user_id = u.id
          JOIN Rooms rm ON r.room_id = rm.id
          WHERE r.user_id = :userId
      ");
      $stmt->execute([':userId' => $userId]);
      return $stmt->fetchAll();
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
            ':room_id' => $data['roomId'],
            ':user_id' => $data['userId'],
            ':date' => $data['date'],
            ':start' => $data['start'],
            ':end' => $data['end'],
            ':pax' => $data['pax'],
            ':type' => $data['type'],
            ':status' => $data['status'],
            ':created_at' => date('Y-m-d H:i:s')
        ]);

        return ['success' => true, 'message' => 'Reservation created successfully', 'reservationId' => $data['id']];
    }

    // admin stuff
    public function deleteReservation(string $id): array {
        $stmt = $this->pdo->prepare("DELETE FROM Reservations WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return ['success' => true, 'message' => 'Reservation deleted'];
    }
}
