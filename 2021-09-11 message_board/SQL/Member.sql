CREATE DATABASE IF NOT EXISTS message_board ; USE message_board ;

DROP TABLE IF EXISTS Member ;

CREATE TABLE Member (
    Id           INT UNSIGNED    NOT NULL AUTO_INCREMENT
    , Account    VARCHAR(32)     NOT NULL
    , EMail      VARCHAR(32)     
    , CreateTime DATETIME   
    , PRIMARY KEY(Id) 
    , UNIQUE(Account)
    , UNIQUE(EMail)  -- 不可重複，但可不填
) ;