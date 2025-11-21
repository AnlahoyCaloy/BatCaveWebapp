<?php
declare(strict_types=1);

// --------------------
// CORS HEADERS (must be first)

// Always send CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// --------------------
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

    // SQLITE TOO
    // $db->exec("PRAGMA foreign_keys = ON;");

    // ALTER THE TABLE
    // $currentColumns = $db->query('
    //     PRAGMA table_info(Reservations);
    // ')->fetchAll(PDO::FETCH_ASSOC);
    
    // $hasTotalPrice = false;

    // foreach($currentColumns as $column) {
    //     if($column['name'] === 'totalPrice') {
    //         $hasTotalPrice = true;
    //         break;
    //     }
    // }

    // if(!$hasTotalPrice) {
    //     $db->exec("ALTER TABLE Reservations ADD COLUMN totalPrice INTEGER;");
    // }

    // -------------------- 

    //POSTGRESSQL
    $db->exec("
    CREATE TABLE IF NOT EXISTS Rooms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        capacity INTEGER NOT NULL
    );
    ");

    $db->exec("
    CREATE TABLE IF NOT EXISTS Users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
    );
    ");

    $db->exec("
    CREATE TABLE IF NOT EXISTS Reservations (
        id TEXT PRIMARY KEY,
        room_id TEXT NOT NULL REFERENCES Rooms(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        start TIME NOT NULL,
        end TIME NOT NULL,
        pax INTEGER NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('Study','Function')),
        status VARCHAR(20) NOT NULL CHECK (status IN ('Pending','Ongoing','Completed','No-show','Cancelled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ");



    // Tables SQLITE
    // $db->exec("
    //     CREATE TABLE IF NOT EXISTS Rooms (
    //         id TEXT PRIMARY KEY,
    //         name TEXT NOT NULL,
    //         capacity INTEGER NOT NULL
    //     )
    // ");
    // $db->exec("
    //     CREATE TABLE IF NOT EXISTS Users (
    //         id TEXT PRIMARY KEY,
    //         name TEXT NOT NULL,
    //         phone TEXT NOT NULL
    //     )
    // ");
    // $db->exec("
    //     CREATE TABLE IF NOT EXISTS Reservations (
    //         id TEXT PRIMARY KEY,
    //         room_id TEXT NOT NULL,
    //         user_id TEXT NOT NULL,
    //         date TEXT NOT NULL,
    //         start TEXT NOT NULL,
    //         end TEXT NOT NULL,
    //         pax INTEGER NOT NULL,
    //         type TEXT NOT NULL CHECK(type IN ('Study', 'Function')),
    //         status TEXT NOT NULL CHECK(status IN ('Pending', 'Ongoing', 'Completed', 'No-show', 'Cancelled')),
    //         created_at TEXT,
    //         FOREIGN KEY(room_id) REFERENCES Rooms(id) ON DELETE CASCADE,
    //         FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
    //     )
    // ");

    // --------------------
    // Models
    $roomModel = new RoomModel($db);
    $userModel = new UsersModel($db);
    $reservationModel = new ReservationModel($db);

    // --------------------
    // Routing
    $method = $_SERVER['REQUEST_METHOD'];
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    // $basePath = '/batcave/backend/public';
    // $route = '/' . trim(substr($uri, strlen($basePath)), '/'); // normalize
    // $route = $route === '/' ? '/' : '/' . ltrim($route, '/'); // ensure starting slash

    $basePath = rtrim($_SERVER['SCRIPT_NAME'], '/index.php');
    $route = '/' . trim(substr($uri, strlen($basePath)), '/');
    $route = $route === '/' ? '/' : '/' . ltrim($route, '/');


    // -------------------- Routes
    if ($route === '/rooms' && $method === 'GET') {
        echo json_encode($roomModel->getRooms());
        exit;
    }

    if ($route === '/rooms' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($roomModel->createRoom($data));
        exit;
    }

    if ($route === '/reservations' && $method === 'GET') {
        echo json_encode($reservationModel->getReservations());
        exit;
    }
    
    if ($route === '/reservations-update' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input') , true);

    }

    if ($route === '/reservations-by-user' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $data['userId'] ?? null;
        if ($userId) {
            echo json_encode($reservationModel->getReservationsByUser($userId));
        } else {
            echo json_encode(['success' => false, 'message' => 'userId not provided']);
        }
        exit;
    }

    if ($route === '/reservations' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($reservationModel->createReservation($data));
        exit;
    }

    if ($route === '/users' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($userModel->createUser($data));
        exit;
    }

    if ($route === '/users' && $method === 'GET') {
        echo json_encode($userModel->getUsers());
        exit;
    }

    // -------------------- 404 for anything else
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit;
}
