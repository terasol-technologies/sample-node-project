-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 20, 2022 at 07:03 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `samplenode`
--
CREATE DATABASE IF NOT EXISTS `samplenode` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `samplenode`;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `created_on`, `updated_on`, `is_deleted`) VALUES
(1, '5b1f988ddb2a5f60af0bc203095810a5', '97b65d17c3cc462e802b083fb24245199ef01b05fdb8ac9a1b257fd6a20a3403', '350a47d7035e8cc93ca82cf6c329412118fe3fc1498b277ef45804897f5b770da6d767ba8241350e24ddc732416421e56850301bb5178e69140768f911fda17b', '2021-12-20 23:25:09', '2021-12-20 23:25:09', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
