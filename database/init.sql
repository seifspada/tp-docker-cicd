create table if not exists users (
id serial primary key,
name varchar(100),
email varchar(100) unique
);

insert into users (name,email)values
('seif','seifeddinemarzougui@gmail.com'),
('salim','salimferhi@gmail.com');

