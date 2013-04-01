-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 01, 2013 at 05:22 PM
-- Server version: 5.5.30-MariaDB-log
-- PHP Version: 5.4.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `flowork`
--

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE IF NOT EXISTS `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `todo` varchar(256) NOT NULL,
  `status` varchar(7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `username`, `todo`, `status`) VALUES
(1, 'kandoi', 'It feels good to be the first todo of them all.', 'done'),
(2, 'kandoi', 'Experiment with the Arduino Uno.', 'done'),
(3, 'kandoi', 'Google about creative minimalism and start research on Harmless Wireless.', 'open'),
(4, 'kandoi', 'Create poster for inspiration and peace.', 'done'),
(5, 'kandoi', '', 'done'),
(6, 'kandoi', '', 'done'),
(7, 'kandoi', 'Dance like no one''s watching.', 'done'),
(8, 'kandoi', 'Dance like no ones'' watching.', 'done'),
(9, 'kandoi', 'Dance like no one''s watching.', 'done'),
(10, 'kandoi', 'Go out and have fun.', 'done'),
(11, 'kandoi', 'Start working for Google Summer of Code.', 'open'),
(12, 'kandoi', 'Kill a bear, just for fun.', 'done'),
(13, 'kandoi', 'Jump off a plane to enjoy the beauty of nature.', 'done'),
(14, 'kandoi', 'Erase all traces of the word alcohol from the world.', 'striked');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(256) NOT NULL,
  `mobile` bigint(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='User accounts, id auto incremented' AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `mobile`) VALUES
(1, 'kandoi', 'd3fbc35aee7e0f2ae1e74f9298d33e3b3fc97f03', 'Abhishek Kandoi', 'abhikandoi2000@gmail.com', 8979540810),
(2, 'kandoiabhi', 'd3fbc35aee7e0f2ae1e74f9298d33e3b3fc97f03', 'Kandoi', 'abhikandoi2000@gmail.com', 8527906077),
(3, 'gkandoi', '4c51b3a4644e73f52e4cbf338e76e34ef949bce4', 'gaurav', 'g_kandoi@yahoo.com', 9958527878),
(4, 'kandoiabhi2', 'd3fbc35aee7e0f2ae1e74f9298d33e3b3fc97f03', 'Kandoi', 'abhikandoi@gmail.com', 8527906077);
