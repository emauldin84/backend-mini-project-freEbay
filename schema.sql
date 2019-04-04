create table users (
id serial primary key,
first_name varchar(100),
last_name varchar(100),
username varchar(100),
email varchar(200),
password varchar(200)

);

create table items (
id serial primary key,
name varchar(200)

);

create table owned_items (
id serial primary key,
user_id integer references users(id),
item_id integer references items(id)

);