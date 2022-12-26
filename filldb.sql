DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (fullname, email, password) 
VALUES 
('Juan Pablo Avilan', 'avilanjuan@gmail.com', 'blah blah'),
('Juan Camilo Avilan', 'avilancamilo@gmail.com', 'bleh bleh'),
('Felipe Avilan', 'avilanfelipe@gmail.com', 'bluh bluh'),
('Leonel Messi', 'messi@gmail.com', 'argentina'),
('Cristiano Ronaldo', 'cr7@gmail.com', 'portugal'),
('Kylian Mbappé', 'mbappé@gmail.com', 'francia'),
('Neymar JR', 'neymarjr@gmail.com', 'brasilñ')
RETURNING id;
