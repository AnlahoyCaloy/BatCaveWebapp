<?php
declare(strict_types=1);

// --------------------
// CORS HEADERS (must be first)
// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --------------------
// Includes
require_once __DIR__ . '/../src/RoomModel.php';
require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/UsersModel.php';
require_once __DIR__ . '/../src/ReservationModel.php';

// --------------------
// Database
try {
    $pdo = new Database();
    $db = $pdo->getConnection();
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec("PRAGMA foreign_keys = ON;");

    // -------------------- 
    // Tables
    $db->exec("
        CREATE TABLE IF NOT EXISTS Rooms (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            capacity INTEGER NOT NULL
        )
    ");
    $db->exec("
        CREATE TABLE IF NOT EXISTS Users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            phone TEXT NOT NULL
        )
    ");
    $db->exec("
        CREATE TABLE IF NOT EXISTS Reservations (
            id TEXT PRIMARY KEY,
            room_id TEXT NOT NULL,
            user_id TEXT NOT NULL,
            date TEXT NOT NULL,
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            pax INTEGER NOT NULL,
            type TEXT NOT NULL CHECK(type IN ('Study', 'Function')),
            status TEXT NOT NULL CHECK(status IN ('Pending', 'Ongoing', 'Completed', 'No-show', 'Cancelled')),
            created_at TEXT,
            FOREIGN KEY(room_id) REFERENCES Rooms(id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
        )
    ");

    // --------------------
    // Models
    $roomModel = new RoomModel($db);
    $userModel = new UsersModel($db);
    $reservationModel = new ReservationModel($db);

    // --------------------
    // Routing
    $method = $_SERVER['REQUEST_METHOD'];
    $uri = $_SERVER['REQUEST_URI'];

    // Remove query string
    $uri = parse_url($uri, PHP_URL_PATH);

    // Adjust for your folder structure
    $basePath = '/BatCave/backend/public';
    $route = substr($uri, strlen($basePath));

    if ($route === '/rooms' && $method === 'GET') {
        echo json_encode($roomModel->getRooms());
        exit;
    }

    if ($route === '/users' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($userModel->createUser($data));
        exit;
    }

    if($route === 'reservations' && $method === 'GET') {
        echo json_encode($reservationModel->getReservations());
        exit;
    }


    // Default
    echo json_encode(["message" => "Connected to SQLite successfully!"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
