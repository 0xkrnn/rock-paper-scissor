CREATE TABLE players(
    pid SERIAL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    match_played INT DEFAULT 0,
    won INT DEFAULT 0,
    lose INT DEFAULT 0
);