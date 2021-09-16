CREATE DATABASE IF NOT EXISTS message_board ; USE message_board ;

DROP TABLE IF EXISTS MemberLoginLog ;

CREATE TABLE MemberLoginLog (
    Id                  INT UNSIGNED    NOT NULL AUTO_INCREMENT
    , Account           VARCHAR(32)     NOT NULL    
    , IP                VARCHAR(39)     NOT NULL DEFAULT ''
    , LoginTime         DATETIME		NOT NULL 
    , PRIMARY KEY(Id) 
    , INDEX (Account, LoginTime)    
) ;
