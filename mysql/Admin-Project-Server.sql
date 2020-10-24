/*
Navicat MySQL Data Transfer

Source Server         : 3306
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : node_project

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2020-10-24 17:38:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) NOT NULL COMMENT '文章标题',
  `article_content` text COMMENT '文章内容',
  `article_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '文章创建时间',
  `article_update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '文章更新时间',
  `creator_id` varchar(255) DEFAULT NULL COMMENT '创建该文章的用户id',
  `article_category` int(2) NOT NULL DEFAULT '1' COMMENT '文章类别的id',
  `is_delete` int(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '小火车况且况且', '测试文章修改', '2020-08-28 08:59:38', '2020-10-15 14:55:07', '1', '1', '1');
INSERT INTO `article` VALUES ('2', '小飞机呼哧呼哧', '小飞机呼哧呼哧', '2020-08-28 10:23:22', '2020-08-28 15:00:24', '1', '1', '0');
INSERT INTO `article` VALUES ('3', '小飞机呼哧呼哧', '小飞机呼哧呼哧', '2020-10-15 14:55:07', '2020-10-15 14:55:07', '1', '1', '0');
INSERT INTO `article` VALUES ('4', '小火车况且况且', '测试文章修改', '2020-10-15 14:55:10', '2020-10-15 14:55:10', '1', '1', '0');

-- ----------------------------
-- Table structure for article_category
-- ----------------------------
DROP TABLE IF EXISTS `article_category`;
CREATE TABLE `article_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `level` int(2) DEFAULT NULL COMMENT '分类的级别 1 代表一级 2 代表二级',
  `parent_id` int(2) DEFAULT NULL COMMENT '父级的id，为null说明是顶级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_category
-- ----------------------------
INSERT INTO `article_category` VALUES ('1', '生活娱乐', '1', null);
INSERT INTO `article_category` VALUES ('2', '体育财经', '1', null);
INSERT INTO `article_category` VALUES ('3', '科技文艺', '1', null);
INSERT INTO `article_category` VALUES ('4', '影视动漫', '1', null);
INSERT INTO `article_category` VALUES ('5', '游戏', '2', '1');
INSERT INTO `article_category` VALUES ('6', '穿搭', '2', '1');
INSERT INTO `article_category` VALUES ('7', '时尚', '2', '1');
INSERT INTO `article_category` VALUES ('8', '养生', '2', '1');
INSERT INTO `article_category` VALUES ('9', '旅游', '2', '1');
INSERT INTO `article_category` VALUES ('10', '宠物', '2', '1');
INSERT INTO `article_category` VALUES ('11', '星座', '2', '1');
INSERT INTO `article_category` VALUES ('12', '钓鱼', '2', '2');
INSERT INTO `article_category` VALUES ('13', '财经', '2', '2');
INSERT INTO `article_category` VALUES ('14', '体育', '2', '2');
INSERT INTO `article_category` VALUES ('15', 'NBA', '2', '2');
INSERT INTO `article_category` VALUES ('16', '股票', '2', '2');
INSERT INTO `article_category` VALUES ('17', '彩票', '2', '2');
INSERT INTO `article_category` VALUES ('18', '手机', '2', '3');
INSERT INTO `article_category` VALUES ('19', '摄影', '2', '3');
INSERT INTO `article_category` VALUES ('20', '电脑', '2', '3');
INSERT INTO `article_category` VALUES ('21', '动物', '2', '3');
INSERT INTO `article_category` VALUES ('22', '动作', '2', '4');
INSERT INTO `article_category` VALUES ('23', '都市', '2', '4');
INSERT INTO `article_category` VALUES ('24', '武侠', '2', '4');
INSERT INTO `article_category` VALUES ('25', '科幻', '2', '4');
INSERT INTO `article_category` VALUES ('26', '生活', '2', '4');
INSERT INTO `article_category` VALUES ('27', '动作', '3', '5');
INSERT INTO `article_category` VALUES ('28', '冒险', '3', '5');

-- ----------------------------
-- Table structure for article_comment
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE `article_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_content` text NOT NULL,
  `comment_article_id` int(11) NOT NULL COMMENT '评论的文章id',
  `comment_userId` int(11) NOT NULL COMMENT '评论人的userId',
  `comment_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_comment
-- ----------------------------
INSERT INTO `article_comment` VALUES ('1', '132113', '2', '122', '2020-10-20 17:14:48');

-- ----------------------------
-- Table structure for article_first_category
-- ----------------------------
DROP TABLE IF EXISTS `article_first_category`;
CREATE TABLE `article_first_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT '' COMMENT '文章类别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_first_category
-- ----------------------------
INSERT INTO `article_first_category` VALUES ('1', '生活娱乐');
INSERT INTO `article_first_category` VALUES ('2', '体育财经');
INSERT INTO `article_first_category` VALUES ('3', '科技文艺');
INSERT INTO `article_first_category` VALUES ('4', '影视动漫');
INSERT INTO `article_first_category` VALUES ('5', '其他');

-- ----------------------------
-- Table structure for article_sec_category
-- ----------------------------
DROP TABLE IF EXISTS `article_sec_category`;
CREATE TABLE `article_sec_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT '' COMMENT '二级文章分类名称',
  `parent_id` int(10) DEFAULT NULL COMMENT '一级分类的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_sec_category
-- ----------------------------
INSERT INTO `article_sec_category` VALUES ('1', '穿搭', '1');
INSERT INTO `article_sec_category` VALUES ('2', '时尚', '1');
INSERT INTO `article_sec_category` VALUES ('3', '养生', '1');
INSERT INTO `article_sec_category` VALUES ('4', '旅游', '1');
INSERT INTO `article_sec_category` VALUES ('5', '宠物', '1');
INSERT INTO `article_sec_category` VALUES ('6', '游戏', '1');
INSERT INTO `article_sec_category` VALUES ('7', '钓鱼', '2');
INSERT INTO `article_sec_category` VALUES ('8', '财经', '2');
INSERT INTO `article_sec_category` VALUES ('9', '体育', '2');
INSERT INTO `article_sec_category` VALUES ('10', 'NBA', '2');
INSERT INTO `article_sec_category` VALUES ('11', '股票', '2');
INSERT INTO `article_sec_category` VALUES ('12', '彩票', '2');
INSERT INTO `article_sec_category` VALUES ('13', '电脑', '3');
INSERT INTO `article_sec_category` VALUES ('14', '手机', '3');
INSERT INTO `article_sec_category` VALUES ('15', '摄影', '3');
INSERT INTO `article_sec_category` VALUES ('16', '动物', '3');
INSERT INTO `article_sec_category` VALUES ('17', '美文', '3');
INSERT INTO `article_sec_category` VALUES ('18', '国风', '3');
INSERT INTO `article_sec_category` VALUES ('19', '科学', '3');
INSERT INTO `article_sec_category` VALUES ('20', '文化', '3');
INSERT INTO `article_sec_category` VALUES ('21', '影视', '4');
INSERT INTO `article_sec_category` VALUES ('22', '动漫', '4');

-- ----------------------------
-- Table structure for article_third_category
-- ----------------------------
DROP TABLE IF EXISTS `article_third_category`;
CREATE TABLE `article_third_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_third_category
-- ----------------------------
INSERT INTO `article_third_category` VALUES ('1', '动作', '6');
INSERT INTO `article_third_category` VALUES ('2', '冒险', '6');
INSERT INTO `article_third_category` VALUES ('3', '海贼王', '22');
INSERT INTO `article_third_category` VALUES ('4', '火影忍者', '22');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户的id',
  `userName` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `user_role` int(2) DEFAULT '1' COMMENT '角色权限',
  `avatar` varchar(255) DEFAULT NULL COMMENT '用户头像地址',
  `passWord` varchar(255) NOT NULL COMMENT '密码',
  `nickName` varchar(255) DEFAULT NULL COMMENT '昵称',
  `gender` bit(1) DEFAULT b'1' COMMENT '性别 1代表 男  0代表女',
  `phone` varchar(255) DEFAULT '' COMMENT '手机号',
  `email` char(30) DEFAULT NULL COMMENT '邮箱',
  `createTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `is_delete` int(1) DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'liuzhao', '1', '127.0.0.1:7001/public/upload/avatar/1.png', '123456', '小火车况且况且', '', '13288888888', '132@163.com', '2020-09-29 17:35:23', '0');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL COMMENT '权限的名称',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '超级管理员');
