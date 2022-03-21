CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL UNIQUE,
    price bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO courses (name, price) VALUES
('Algoritmos Avançado', 9900);