/*
Navicat MySQL Data Transfer

Source Server         : localhost_3309
Source Server Version : 50541
Source Host           : localhost:3309
Source Database       : node_project

Target Server Type    : MYSQL
Target Server Version : 50541
File Encoding         : 65001

Date: 2020-08-27 17:40:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE "article" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "article_title" varchar(255) NOT NULL COMMENT '文章标题',
  "article_context" text COMMENT '文章内容',
  "article_time" datetime DEFAULT NULL COMMENT '文章创建时间',
  "article_update_time" timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '文章更新时间',
  "creator_id" varchar(255) DEFAULT NULL COMMENT '创建该文章的用户id',
  "article_category" int(10) NOT NULL DEFAULT '1' COMMENT '文章类别',
  "is_delete" int(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '测试', '这是一个测试的标题', null, '2020-08-27 17:20:56', '1', '1', '0');

-- ----------------------------
-- Table structure for article_comment
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE "article_comment" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "comment_content" text NOT NULL,
  "comment_article_id" int(11) NOT NULL COMMENT '评论的文章id',
  "comment_userId" int(11) NOT NULL COMMENT '评论人的userId',
  "is_delete" int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_comment
-- ----------------------------

-- ----------------------------
-- Table structure for article_first_category
-- ----------------------------
DROP TABLE IF EXISTS `article_first_category`;
CREATE TABLE "article_first_category" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "category" varchar(255) DEFAULT '' COMMENT '文章类别',
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_first_category
-- ----------------------------
INSERT INTO `article_first_category` VALUES ('1', '生活娱乐');
INSERT INTO `article_first_category` VALUES ('2', '体育财经');
INSERT INTO `article_first_category` VALUES ('3', '科技文艺');
INSERT INTO `article_first_category` VALUES ('4', '影视动漫');

-- ----------------------------
-- Table structure for article_sec_category
-- ----------------------------
DROP TABLE IF EXISTS `article_sec_category`;
CREATE TABLE "article_sec_category" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "category" varchar(255) DEFAULT '' COMMENT '二级文章分类名称',
  "parent_id" int(10) DEFAULT NULL COMMENT '一级分类的id',
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_sec_category
-- ----------------------------
INSERT INTO `article_sec_category` VALUES ('1', '穿搭', '1');
INSERT INTO `article_sec_category` VALUES ('2', '时尚', '1');
INSERT INTO `article_sec_category` VALUES ('3', '养生', '1');
INSERT INTO `article_sec_category` VALUES ('4', '旅游', '1');
INSERT INTO `article_sec_category` VALUES ('5', '宠物', '1');
INSERT INTO `article_sec_category` VALUES ('6', '星座', '1');
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
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE "user" (
  "userId" int(11) NOT NULL AUTO_INCREMENT COMMENT '用户的id',
  "userName" varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  "passWord" varchar(255) NOT NULL COMMENT '密码',
  "nickName" varchar(255) DEFAULT NULL COMMENT '昵称',
  "gender" bit(1) DEFAULT b'1' COMMENT '性别 1代表 男  0代表女',
  "phone" varchar(255) DEFAULT '' COMMENT '手机号',
  "email" char(30) DEFAULT NULL COMMENT '邮箱',
  "createTime" timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  "is_delete" int(1) DEFAULT '0',
  PRIMARY KEY ("userId")
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'liuzhao', '123456', '小火车况且况且', '', '13288888888', '132@163.com', '2020-08-27 16:54:08', '0');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE "user_role" (
  "role_id" int(11) NOT NULL AUTO_INCREMENT,
  "role_name" varchar(50) NOT NULL COMMENT '权限的名称',
  PRIMARY KEY ("role_id")
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '超级管理员');
