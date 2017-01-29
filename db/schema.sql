CREATE DATABASE gitgreat;

USE gitgreat;

-- ---
-- Table 'events'
-- 
-- ---

DROP TABLE IF EXISTS `events`;
    
CREATE TABLE `events` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(60),
  `where` VARCHAR(60),
  `when` VARCHAR(60),
  `createdAt` VARCHAR(60),
  `updatedAt` VARCHAR(60),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'itemlists'
-- 
-- ---

DROP TABLE IF EXISTS `itemlists`;
    
CREATE TABLE `itemlists` (
  `id` INTEGER AUTO_INCREMENT,
  `item` VARCHAR(60),
  `owner` VARCHAR(60),
  `cost` VARCHAR(60),
  `eventId` INTEGER,
  `createdAt` VARCHAR(60),
  `updatedAt` VARCHAR(60),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'reminders'
-- 
-- ---

DROP TABLE IF EXISTS `reminders`;
    
CREATE TABLE `reminders` (
  `id` INTEGER AUTO_INCREMENT,
  `phoneNumber` VARCHAR(15),
  `msg` VARCHAR(200),
  `when` VARCHAR(60),
  `eventId` INTEGER,
  `createdAt` VARCHAR(60),
  `updatedAt` VARCHAR(60),
  PRIMARY KEY (`id`)
);


-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
 `id` INTEGER AUTO_INCREMENT,
 `url` VARCHAR(250),
 `eventId` INTEGER,
 `createdAt` VARCHAR(60),
 `updatedAt` VARCHAR(60),
 PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `itemlists` ADD FOREIGN KEY (eventId) REFERENCES `events` (`id`);
ALTER TABLE `reminders` ADD FOREIGN KEY (eventId) REFERENCES `events` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (eventId) REFERENCES `events` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `itemlists` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `events` (`id`,`name`,`where`,`when`,`createdAt`,`updatedAt`) VALUES
-- ('','','','','','');
-- INSERT INTO `itemlists` (`id`,`item`,`owner`,`cost`,`event`,`createdAt`,`updatedAt`) VALUES
-- ('','','','','','','');