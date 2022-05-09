CREATE DATABASE IF NOT EXISTS message_board ; USE message_board ;

DROP TABLE IF EXISTS articles ;

CREATE TABLE articles
(
    id           INT UNSIGNED   NOT NULL AUTO_INCREMENT
    , parentId   INT UNSIGNED   NOT NULL
    , account    VARCHAR(32)    NOT NULL
    , categoryId INT UNSIGNED   NOT NULL
    , title      NVARCHAR(100)  NOT NULL
    , content    VARCHAR(1024)  CHARACTER SET utf8mb4 NOT NULL 
    , createTime DATETIME       NOT NULL
    , PRIMARY KEY (id)
    , INDEX (account) 
    , INDEX (parentId, createTime)
) DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO articles
SET 
    parentId = 0
    , account = N''
    , categoryId = 2
    , title = N''
    , content =  N'*****'
    , createTime = CURRENT_TIMESTAMP ;