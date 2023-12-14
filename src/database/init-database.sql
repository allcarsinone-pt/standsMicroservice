CREATE TABLE stand (
    standid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    mobilephone VARCHAR(20),
    phone VARCHAR(20),
    schedule VARCHAR(100),
    userid INTEGER
);