CREATE DATABASE IF NOT EXISTS message_board ; USE message_board ;

CREATE TABLE article_replies 
(
    id           INT UNSIGNED   NOT NULL AUTO_INCREMENT
    , articleId  INT UNSIGNED   NOT NULL
    , account    VARCHAR(32)    NOT NULL    
    , content    VARCHAR(1024)  CHARACTER SET utf8mb4 NOT NULL 
    , createTime DATETIME       NOT NULL
    , PRIMARY KEY (id)
    , INDEX (account) 
    , INDEX (articleId, createTime)
) DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;