-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2025 at 02:45 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `practice`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `created_at`) VALUES
(10, 2, '2025-07-17 09:27:46'),
(11, 2, '2025-07-17 09:35:57');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hp8;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `quantity`) VALUES
(12, 10, 8, 2),
(13, 11, 5, 1),
(14, 11, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'burgers'),
(2, 'sandwhitches'),
(3, 'Staple foods'),
<<<<<<< HEAD:database/kwamhlanga_eats(1).sql
(4, 'Chips');
=======
(4, 'Chips'),
(5, 'Kotas');
>>>>>>> ec32519fd9acd22c11b93b1496997173167ac1c5:database/kwamhlanga_eats (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `address` text,
  `delivery_status` enum('ready','out for delivery','delivered','failed') DEFAULT 'ready'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`id`, `order_id`, `driver_id`, `address`, `delivery_status`) VALUES
(2, 6, NULL, '13 bgf hill', 'ready');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `id_number` varchar(20) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `billing_type` varchar(20) DEFAULT NULL,
  `account_holder` varchar(100) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `branch_code` varchar(20) DEFAULT NULL,
  `account_type` varchar(20) DEFAULT NULL,
  `vehicle_model` varchar(100) DEFAULT NULL,
  `car_year` int(11) DEFAULT NULL,
  `car_color` varchar(50) DEFAULT NULL,
  `vin` varchar(100) DEFAULT NULL,
  `license_plate` varchar(50) DEFAULT NULL,
  `driver_photo` varchar(255) DEFAULT NULL,
  `id_document` varchar(255) DEFAULT NULL,
  `inspection_report` varchar(255) DEFAULT NULL,
  `license_prdp` varchar(255) DEFAULT NULL,
  `criminal_record` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `email`, `phone_number`, `id_number`, `username`, `birthday`, `billing_type`, `account_holder`, `account_number`, `branch_code`, `account_type`, `vehicle_model`, `car_year`, `car_color`, `vin`, `license_plate`, `driver_photo`, `id_document`, `inspection_report`, `license_prdp`, `criminal_record`) VALUES
(1, 'test@code', '0123456789', NULL, 'Blavkson', '2000-10-05', 'monthly', 'mkay', '1004578656', '47000', 'savings', 'toyota cross', 2023, 'grey', '47546', 'wg 16 gp', 'OOP_vs_Procedural_Practical_Task.docx', 'D_Sys analysis.docx', 'MultipleMonthsJS.txt', 'createJuneFolders.gs', '8b01d2145db3ed2913489d3b40405a01.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text,
  `read_status` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
<<<<<<< HEAD:database/kwamhlanga_eats(1).sql
  `driver_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `delivery_status` enum('pending','out_for_delivery','delivered') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
=======
  `cart_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=hp8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `cart_id`, `total`, `payment_method`, `store_id`, `address`, `status`, `created_at`) VALUES
(6, 2, 11, '74.98', 'cash', 13, '13 bgf hill', 'ready', '2025-07-17 09:35:58');
>>>>>>> ec32519fd9acd22c11b93b1496997173167ac1c5:database/kwamhlanga_eats (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hp8;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `subtotal`) VALUES
(4, 6, 5, 1, NULL, NULL),
(5, 6, 7, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `store_id`, `category`) VALUES
(3, 'Pap & Steak', 'Pap with steak and two sides', '85.00', '1752235254277-images (6).jpeg', 12, 'Staple foods'),
(4, 'Pap & Wors', 'Pap with wors and chakalaka salad', '60.00', '1752235452581-images (4).jpeg', 12, 'Staple foods'),
(5, 'Small boy', '100g beef patty, lettuce, tomato, cheese & caramelized onion', '29.99', '1752236568106-images (12).jpeg', 13, 'burgers'),
(6, 'CHICKEN BOY', 'chicken breast, lettuce, tomato, cheese & onion', '30.99', '1752236686189-images (15).jpeg', 13, 'burgers'),
<<<<<<< HEAD:database/kwamhlanga_eats(1).sql
(7, 'CHILLI CHEESE BOY', '2 x 100g beef patty, onion, cheese, bacon, lettuce', '44.99', '1752236887413-images (13).jpeg', 13, 'burgers');
=======
(7, 'CHILLI CHEESE BOY', '2 x 100g beef patty, onion, cheese, bacon, lettuce', '44.99', '1752236887413-images (13).jpeg', 13, 'burgers'),
(8, 'Sleeze kota', 'Kota with chips, half vienna, half russian, cheese', '27.00', '1752702117432-images (27).jpeg', 15, 'Kotas'),
(9, 'Sandwich kota', 'Sandwich toast,chips,vienna,russian', '30.00', '1752702388971-images (19).jpeg', 15, 'sandwhitches');
>>>>>>> ec32519fd9acd22c11b93b1496997173167ac1c5:database/kwamhlanga_eats (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` text,
  `contact_info` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `manager_id`, `name`, `location`, `contact_info`, `image`) VALUES
(12, 10, 'Eziko Kitchen', 'KwaMhlanga', '01456565', '1752070325103.jpg'),
(13, 10, 'Blac Boy joint', 'KwaMhlanga', '023456789', '1752070385412.jpg'),
(15, 9, 'Kwa-Vundla', 'KwaMhlanga', '0123456789', '1752701648074.jpg'),
(16, 9, 'Corners Kitchen', 'KwaMhlanga', '2343546', '1752701755354.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('customer','manager','driver','admin') NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `role`, `password`) VALUES
(1, 'Blavkson', 'test@code', 'driver', '$2b$10$QQ/1ODtrwCG1R.GKVMHPteOfdNqEiJYuSSmjdRrgUn0GGWofXdMM.'),
(2, 'thato', 'teat@code', 'customer', '$2b$10$SUKrXNNAiXkA0J1wsd3sE.jIMDo9tiCfIlZxfR2TE8W3Mcovugf5m'),
(3, 'milly', 'Kgopotsomak@outlook.com', 'admin', '$2b$10$8b6dtODjr0dPdXEFOJZeCOXNRY19JTQdbLk6oktk4pZlZg.jGpayW'),
(8, 'Bkayz', 'code@tz', 'manager', '$2b$10$SQfv9erv3wKF4WQMQB.zH.DAjt5aixxut7KqVHecn.VPXrO9Is5MK'),
(9, 'kjay', 'kjay@test', 'manager', '$2b$10$pNiVRWcJHhBKYLKcJnd9.e.DFeA9KAPfzF4Tz44EVklFNtLZWPTV2'),
(10, 'mkay', 'mak@test', 'manager', '$2b$10$id1SbRLQ3Ai5cf0Zi0QL4eSNUy0LLTsKX/sxmVM3FybExMBaWz6rG'),
(11, 'temm', 'temm@drive', 'driver', '$2b$10$cLyI2SbCnsQ1sGS1Mw5rtuso9KQZs3sBL2Iv61nO9Ek3vIKkXh5iW'),
(12, 'billy', 'billy@code', 'customer', '$2b$10$olHJ0Vs7tlO2jibxTt1qS..oIsib.6ScVJMinxs5lj2U68/aS1o4G');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
<<<<<<< HEAD:database/kwamhlanga_eats(1).sql
  ADD KEY `driver_id` (`driver_id`);
=======
  ADD KEY `cart_id` (`cart_id`);
>>>>>>> ec32519fd9acd22c11b93b1496997173167ac1c5:database/kwamhlanga_eats (2).sql

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `manager_id` (`manager_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
<<<<<<< HEAD:database/kwamhlanga_eats(1).sql
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
>>>>>>> ec32519fd9acd22c11b93b1496997173167ac1c5:database/kwamhlanga_eats (2).sql

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
<<<<<<< HEAD:database/kwamhlanga_eats(1).sql
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
>>>>>>> ec32519fd9acd22c11b93b1496997173167ac1c5:database/kwamhlanga_eats (2).sql

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `deliveries_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`),
<<<<<<< HEAD:database/kwamhlanga_eats(1).sql
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`);
=======
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`);
>>>>>>> ec32519fd9acd22c11b93b1496997173167ac1c5:database/kwamhlanga_eats (2).sql

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
