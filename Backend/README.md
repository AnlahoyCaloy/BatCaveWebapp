# BatCave — PHP backend template

This is a minimal PHP backend template (no framework) using SQLite. It provides simple API endpoints for rooms and reservations and implements the reservation business rules:

- Max capacity per room = 20
- Function reservations are exclusive for overlapping times
- Study reservations can share time/date but total overlapping study pax must not exceed capacity
- Reservations must be inside operating hours (default 13:00-22:00)

Quick start

1. Initialize the database (creates `data/batcave.db` and seeds rooms):

```powershell
php scripts/init_db.php
```

2. Start the PHP built-in server from the Backend folder :

```powershell
php -S localhost:8000 -t public
```

PS. i recommend XAMPP

3. Endpoints

- GET /rooms — list rooms with reservations
- GET /reservations — list all reservations
- POST /reservations — create a reservation (JSON body)
- DELETE /reservations/{id} — delete reservation
- POST /reservations/{id}/status — update reservation status (JSON {"status":"Completed"})

Example create reservation payload (JSON):

{
  "room_id": 1,
  "user_id": "user-123",
  "date": "2025-11-20",
  "start": "13:00",
  "end": "15:00",
  "pax": 5,
  "type": "Study"
}

Notes

- This template uses plain PHP + PDO and stores data in SQLite at `Backend/data/batcave.db`.
- For production use, replace with a proper framework and secure configuration.
