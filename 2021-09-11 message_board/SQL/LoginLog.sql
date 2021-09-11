CREATE DATABASE IF NOT EXISTS message_board ; USE message_board ;

DROP TABLE IF EXISTS LoginLog ;

CREATE TABLE LoginLog (
    Id           INT UNSIGNED    NOT NULL AUTO_INCREMENT
    , Account    VARCHAR(32)     NOT NULL    
    , LoginSId   VARCHAR(128)    NOT NULL DEFAULT ''
    , LoginTime DATETIME   
    , PRIMARY KEY(Id) 
    , INDEX (Account, LoginTime)  -- ORDER BY LoginTime DESC Limit1 => 最新
) ;
