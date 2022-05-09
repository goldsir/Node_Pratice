CREATE DATABASE IF NOT EXISTS message_board ; USE message_board ;

DROP PROCEDURE IF EXISTS NSP_Member_CheckLogin ;
/*
DELIMITER //


CREATE PROCEDURE NSP_Member_CheckLogin
(
    _LoginSId          VARCHAR(128)
)
BEGIN

    DECLARE _account          VARCHAR(32)  DEFAULT '' ;
    DECLARE _latestLoginSId   VARCHAR(128) DEFAULT '' ;

    IF EXISTS(
        SELECT 1 
        FROM MemberLoginLog 
        WHERE LoginSIdCRC32 = CRC32(_LoginSId) AND LoginSId = _LoginSId
    )
    THEN
        
        SELECT Account 
        INTO _account
        FROM MemberLoginLog 
        WHERE LoginSIdCRC32 = CRC32(_LoginSId) AND LoginSId = _LoginSId  ;
        
        SELECT LoginSId
        INTO _latestLoginSId
        FROM MemberLoginLog 
        WHERE Account = _account
        ORDER BY LoginTime DESC 
        LIMIT 1 ;
        
        IF (_LoginSId <> _latestLoginSId) THEN
            
            SELECT 
                1 AS ResultCode
                , N'ID已過期' ;            
        
        ELSE
            
            SELECT 
                0             AS ResultCode
                , N'ID已過期' AS ResultMessage
                , _account    AS Account
            ; 
        
        END IF ;
        
    
    ELSE
        
        SELECT 
            1              AS ResultCode
            , N'查無此ID'  AS ResultMessage ;        
    
    END IF;

END //

DELIMITER ;
*/