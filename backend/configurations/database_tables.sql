USE bank;

CREATE TABLE transactions(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amount INT,
    category VARCHAR(256),
    vendor VARCHAR(256),
    type VARCHAR(256)
);