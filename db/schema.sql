DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  f_name VARCHAR (50),
  l_name VARCHAR (50),
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR (255)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  author VARCHAR NOT NULL,
  image VARCHAR NOT NULL,
  user_email VARCHAR REFERENCES users(email) NOT NULL
);
