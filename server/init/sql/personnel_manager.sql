 DROP TABLE IF EXISTS `articles`; 
 CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `publisher` varchar(50)  NOT NULL,
  `publishTime` datetime DEFAULT NULL,
  `category` varchar(20)  NOT NULL,
  `tags` varchar(255)  DEFAULT NULL,
  `greatNum` int(11) DEFAULT NULL,
  `viewNum` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

 DROP TABLE IF EXISTS `user_info`;
 CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255)  DEFAULT NULL,
  `name` varchar(255)  DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `detail_info` longtext,
  `create_time` varchar(20) DEFAULT NULL,
  `modified_time` varchar(20) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

 DROP TABLE IF EXISTS `code_table`;
 CREATE TABLE `code_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codeName` varchar(20) NOT NULL,
  `codeLetter` varchar(20) NOT NULL,
  `isLeaf` tinyint(1) NOT NULL,
  `level` int(11) NOT NULL,
  `category` varchar(20) NOT NULL,
  `parent` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- 要是function运行失败，请用其他方式进行创建
CREATE DEFINER=`root`@`localhost` FUNCTION `getChildList`(root varchar(100)) RETURNS varchar(1000) CHARSET utf8
BEGIN
  DECLARE sTemp VARCHAR(1000);
  DECLARE sTempChd VARCHAR(1000);

  SET sTemp = '$';
  SET sTempChd =cast(root as char(100));

  WHILE sTempChd is not null DO
      SET sTemp = concat(sTemp,',',sTempChd);
      SELECT group_concat(codeLetter) INTO sTempChd FROM code_table where FIND_IN_SET(parent,sTempChd)>0;
  END WHILE;
  RETURN sTemp;
END;