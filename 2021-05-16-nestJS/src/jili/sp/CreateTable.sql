CREATE TABLE `betdata_jili` (
  `Account` VARCHAR(50) NOT NULL,
  `WagersId` BIGINT(20) UNSIGNED DEFAULT NULL,
  `GameId` INT(10) UNSIGNED DEFAULT NULL,
  `WagersTime` DATETIME DEFAULT NULL,
  `BetAmount` DECIMAL(16,4) DEFAULT NULL,
  `PayoffTime` DATETIME DEFAULT NULL,
  `PayoffAmount` DECIMAL(16,4) DEFAULT NULL,
  `Status` INT(11) DEFAULT NULL,
  `SettlementTime` DATETIME DEFAULT NULL,
  `GameCategoryId` INT(11) DEFAULT NULL,
  `VersionKey` BIGINT(20) UNSIGNED DEFAULT NULL,
  `Jackpot` INT(11) DEFAULT NULL,
  `Type` INT(11) DEFAULT NULL
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4