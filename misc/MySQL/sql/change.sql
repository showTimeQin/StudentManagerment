DROP TABLE IF EXISTS t_change;
CREATE TABLE IF NOT EXISTS `t_change`(
  `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT COMMENT '表主键',

  `change_name` VARCHAR(64) COMMENT '变动 ',
  `is_change` CHAR(1) COMMENT '0-未变动 1-已变动',
  UNIQUE (`change_name`)
)ENGINE INNODB DEFAULT CHARSET=utf8 COMMENT='变动表' AUTO_INCREMENT=1;