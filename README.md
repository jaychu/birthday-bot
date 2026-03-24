# Birthday Bot



## DB Schema
CREATE TABLE birthdays(
    userid varchar (50) PRIMARY KEY,
    birthtimestamp date NOT NULL,
    updatedate timestamp NOT NULL
);