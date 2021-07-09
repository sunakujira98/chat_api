--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  UNIQUE (phone_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table 'user'
--

INSERT INTO `user` (`id`, `phone_number`) VALUES (1, '081888111222'), (2, '087755553333'), (3, '0811112312312'), (4, '081111111111'), (5, '081133322222'), (6, '081231312123');
