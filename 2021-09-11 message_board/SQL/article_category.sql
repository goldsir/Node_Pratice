CREATE DATABASE IF NOT EXISTS message_board ; USE message_board ;

DROP TABLE IF EXISTS article_category ;

CREATE TABLE article_category

 (
    id         INT UNSIGNED NOT NULL AUTO_INCREMENT
    , category NVARCHAR(64) NOT NULL DEFAULT N''
    , PRIMARY KEY(Id) 
) ;

INSERT article_category SET category = N'其它' ;
INSERT article_category SET category = N'心情' ;
INSERT article_category SET category = N'閒聊' ;
INSERT article_category SET category = N'購物' ;
INSERT article_category SET category = N'八卦' ;
INSERT article_category SET category = N'親子' ;
INSERT article_category SET category = N'兩性' ;
INSERT article_category SET category = N'3C' ;
