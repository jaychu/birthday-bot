# Birthday Bot



## DB Schema
CREATE TABLE birthdays(
    id serial PRIMARY KEY,
    userid varchar (50) NOT NULL,
    birthtimestamp date NOT NULL,
    updatedate timestamp NOT NULL
);