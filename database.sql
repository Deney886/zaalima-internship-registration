CREATE DATABASE internship;

USE internship;

CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255),
    fullname VARCHAR(255),
    gender VARCHAR(50),
    qualification VARCHAR(100),
    program VARCHAR(100),
    duration VARCHAR(50),

    phone VARCHAR(20),
    whatsapp VARCHAR(20),

    college VARCHAR(255),
    country VARCHAR(100),
    skill VARCHAR(100),

    portfolio TEXT,

    job VARCHAR(20),
    source VARCHAR(100),

    resume VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);