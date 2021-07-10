-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 10, 2021 at 09:46 PM
-- Server version: 8.0.21-0ubuntu0.20.04.4
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_message`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` int NOT NULL,
  `user_1` int NOT NULL,
  `user_2` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `user_1`, `user_2`) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 1, 3),
(4, 2, 4),
(5, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `conversation_id` int NOT NULL,
  `sender_user_id` int NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `send_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_user_id`, `message`, `is_read`, `send_date`) VALUES
(1, 1, 1, 'Halo apa kabar?', 1, '2021-07-10 20:31:21'),
(2, 1, 2, 'Baik nih kamu gimana?', 1, '2021-07-10 20:31:21'),
(3, 1, 2, 'Oh ya btw jalan yuk', 1, '2021-07-10 20:31:21'),
(4, 1, 1, 'Aku baik, yuk gas', 1, '2021-07-10 20:31:21'),
(5, 1, 1, 'gasssss', 1, '2021-07-10 21:27:35'),
(6, 1, 1, 'gasssss', 1, '2021-07-10 21:28:03'),
(7, 1, 1, 'gasssss', 1, '2021-07-10 21:28:09'),
(8, 1, 1, 'gasssss', 1, '2021-07-10 21:34:13'),
(9, 1, 1, 'gasssss', 1, '2021-07-10 21:34:13'),
(10, 1, 1, 'gasssss', 1, '2021-07-10 21:34:17'),
(11, 1, 1, 'gasssss', 1, '2021-07-10 21:34:17'),
(12, 1, 1, 'gasssss', 1, '2021-07-10 21:34:17'),
(13, 1, 1, 'gasssss', 1, '2021-07-10 21:38:42'),
(14, 1, 1, 'gasssss', 1, '2021-07-10 21:39:07'),
(15, 1, 1, 'gasssss', 1, '2021-07-10 21:39:21'),
(16, 1, 2, 'boleh nih mau kemana ?', 1, '2021-07-10 21:42:38'),
(17, 1, 1, 'bekasi yuk', 1, '2021-07-10 21:43:22'),
(18, 1, 2, 'aku siap siap dulu ya', 1, '2021-07-10 21:43:50'),
(19, 1, 2, 'kamu jemput aku yahh', 1, '2021-07-10 21:44:55'),
(20, 1, 1, 'ok, aku otw 15 menit lagi', 1, '2021-07-10 21:45:24'),
(21, 1, 2, 'ok, see you', 0, '2021-07-10 21:45:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `phone_number` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone_number`) VALUES
(4, '081111111111'),
(3, '0811112312312'),
(5, '081133322222'),
(6, '081231312123'),
(1, '081888111222'),
(2, '087755553333');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`user_1`),
  ADD KEY `receiver_id` (`user_2`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_id` (`conversation_id`),
  ADD KEY `user_id` (`sender_user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`user_1`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `conversations_ibfk_2` FOREIGN KEY (`user_2`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;