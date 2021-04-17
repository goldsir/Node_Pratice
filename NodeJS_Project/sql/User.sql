-- create database SFEat;

USE SFEat;


DROP TABLE IF EXISTS `User`;

CREATE TABLE `User`(
    Id INT UNSIGNED NOT NULL AUTO_INCREMENT
    , `Account` VARCHAR(128)
    , `Name` NVARCHAR(20)
    , `Password` VARCHAR(128)
    , CreateDate DATETIME
    , IP VARCHAR(39)
    , Token VARCHAR(256)  -- 登入時，設置新的token，後續請求中只認最新的token，舊的不認。
    , PRIMARY KEY(Id)
    , UNIQUE(`Account`)
) ;

INSERT INTO `User` 
SET 
    `Account` = 'tc'
    , `Name` = N'臥槽草泥馬'
    , `Password` = MD5('123456')
    , CreateDate = CURRENT_TIMESTAMP;