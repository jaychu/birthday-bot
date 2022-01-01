# Birthday Bot



## DB Schema
``CREATE TABLE birthdays(
    id serial PRIMARY KEY,
    userid varchar (50) NOT NULL,
    birthtimestamp date(25) NOT NULL,
    updatedat timestamp NOT NULL
);``