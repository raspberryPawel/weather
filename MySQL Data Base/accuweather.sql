-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 24 Gru 2018, 13:21
-- Wersja serwera: 10.1.30-MariaDB
-- Wersja PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `accuweather`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lastsearch`
--

CREATE TABLE `lastsearch` (
  `searchID` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `key` varchar(20) COLLATE utf8_polish_ci NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `lastsearch`
--

INSERT INTO `lastsearch` (`searchID`, `name`, `key`, `userID`) VALUES
(1, 'Cipki-Suche', '2663068', 8),
(2, 'Dębniki', '1410624', 8),
(3, 'Podgórze Duchackie', '2723049', 8),
(4, 'Kair', '127164', 8),
(5, 'Kraków', '274455', 8),
(6, 'Kraków', '274455', 8),
(7, 'Dębniki', '1410624', 8),
(8, 'Baczyn', '1415293', 8),
(9, 'Maków Podhalański', '264517', 8),
(10, 'Wyźrał', '2699441', 0),
(11, 'Wyźrał', '2699441', 9),
(12, 'Śródmieście Południowe', '2722931', 0),
(13, 'Śródmieście Południowe', '2722931', 0),
(14, 'Dębniki', '1410624', 0),
(15, 'Dębniki', '1410624', 8),
(16, 'Bieńkówka', '268131', 8),
(17, 'Kraków', '274455', 8),
(18, 'Krakówka-Obidza', '2674853', 8),
(19, 'Kragujevac', '301638', 8),
(20, 'Kraków', '274455', 8),
(21, 'Kraków', '274455', 8),
(22, 'Bieńkówka', '268131', 8),
(23, 'Bieńkówka', '268131', 8),
(24, 'Bieńkówka', '1414519', 8),
(25, 'Asmara', '129237', 8),
(26, 'Ateny', '182536', 8),
(27, 'Grodno', '28800', 8),
(28, 'Kraków', '274455', 0),
(29, 'Krakówka-Pawłowice', '2674854', 0),
(30, 'Bieńkówka', '268131', 0),
(31, 'Bieńkówka', '268131', 0),
(32, 'Bieńkówka-Inwałd', '2704653', 8),
(33, 'Dębniki', '1410624', 0),
(34, 'Dębniki', '1410624', 0),
(35, 'Dębniki', '1410624', 0),
(36, 'Dębniki', '1410624', 10),
(37, 'Skórka', '1389536', 10),
(38, 'Dębniki', '1410624', 10),
(39, 'Zakopane', '264492', 10),
(40, 'Zakopane', '264492', 10),
(41, 'Zakopane', '264492', 10),
(42, 'Zakopane', '264492', 10),
(43, 'Zakopane', '264492', 10),
(44, 'Zakopane', '264492', 10),
(45, 'Zakopane', '264492', 10),
(46, 'Zakopane', '264492', 10),
(47, 'Zakopane', '264492', 10),
(48, 'Zakopane', '264492', 10),
(49, 'Zakopane', '264492', 10),
(50, 'Zakopane', '264492', 10),
(51, 'Zakopane', '264492', 10),
(52, 'Zakopane', '264492', 10),
(53, 'Zakopane', '264492', 10),
(54, 'Zakopane', '264492', 10),
(55, 'Zakopane', '264492', 10),
(56, 'Zakopane', '264492', 10),
(57, 'Zakopane', '264492', 10),
(58, 'Zakopane', '264492', 10),
(59, 'Zakopane', '264492', 10),
(60, 'Zakopane', '264492', 10),
(61, 'Zakopane', '264492', 10),
(62, 'Zakopane', '264492', 10),
(63, 'Zakopane', '264492', 10),
(64, 'Skórka', '1389536', 0),
(65, 'Zakopane', '264492', 0),
(66, 'Kraków', '274455', 0),
(67, 'Dębniki', '1410624', 8),
(68, 'Dębniki', '1410623', 8),
(69, 'Dębniki', '1410623', 8),
(70, 'Dębniki', '1410623', 8),
(71, 'Dębniki', '1410623', 8),
(72, 'Dębniki', '1410624', 8),
(73, 'Dębniki', '1410624', 8),
(74, 'Dębniki', '1410624', 8),
(75, 'Dębniki', '1410623', 8),
(76, 'Dębniki', '1410624', 8),
(77, 'Dębniki', '1410624', 8),
(78, 'Dębniki', '1410624', 8),
(79, 'Dębniki', '1410624', 8),
(80, 'Dębniki', '1410624', 8),
(81, 'Dębniki', '1410624', 8),
(82, 'Dębniki', '1410624', 8),
(83, 'Dębniki', '1410624', 8),
(84, 'Dębniki', '1410624', 8),
(85, 'Dębniki', '1410624', 8),
(86, 'Dębniki', '1410624', 8),
(87, 'Dębniki', '1410624', 8),
(88, 'Dębniki', '1410624', 8),
(89, 'Dębniki', '1410624', 8),
(90, 'Dębniki', '1410624', 0),
(91, 'Zakopane', '264492', 0),
(92, 'Skórka', '1389536', 0),
(93, 'Zakopane', '264492', 0),
(94, 'Zakopane', '264492', 0),
(95, 'Zakopane', '264492', 0),
(96, 'Zakopane', '264492', 0),
(97, 'Zakopane', '264492', 0),
(98, 'Zakopane', '264492', 0),
(99, 'Zakopane', '264492', 0),
(100, 'Pardubice', '125084', 0),
(101, 'Zurych', '316622', 0),
(102, 'Vesoul', '133340', 0),
(103, 'Vesoul', '133340', 0),
(104, 'Vesoul', '133340', 0),
(105, 'Vesoul', '133340', 0),
(106, 'Vesoul', '133340', 0),
(107, 'Vesoul', '133340', 0),
(108, 'Vesoul', '133340', 0),
(109, 'Vesoul', '133340', 0),
(110, 'Vesoul', '133340', 0),
(111, 'Vesoul', '133340', 0),
(112, 'Vesoul', '133340', 0),
(113, 'Vesoul', '133340', 0),
(114, 'Vesoul', '133340', 0),
(115, 'Vesoul', '133340', 0),
(116, 'Vesoul', '133340', 0),
(117, 'Zakopane', '264492', 0),
(118, 'Zakopane', '264492', 0),
(119, 'Zakopane', '264492', 0),
(120, 'Zakopane', '264492', 0),
(121, 'Zakopane', '264492', 0),
(122, 'Zakopane', '264492', 0),
(123, 'Zakopane', '264492', 0),
(124, 'Zakopane', '264492', 0),
(125, 'Zakopane', '264492', 0),
(126, 'Zakopane', '264492', 0),
(127, 'Zakopane', '264492', 0),
(128, 'Zakopane', '264492', 0),
(129, 'Zakopane', '264492', 0),
(130, 'Zakopane', '264492', 0),
(131, 'Zakopane', '264492', 0),
(132, 'Zakopane', '264492', 0),
(133, 'Zakopane', '264492', 0),
(134, 'Zakopane', '264492', 0),
(135, 'Zakopane', '264492', 0),
(136, 'Zakopane', '264492', 0),
(137, 'Zakopane', '264492', 0),
(138, 'Zakopane', '264492', 0),
(139, 'Zakopane', '264492', 0),
(140, 'Zakopane', '264492', 0),
(141, 'Zakopane', '264492', 0),
(142, 'Zakopane', '264492', 0),
(143, 'Zakopane', '264492', 0),
(144, 'Dębniki', '1410624', 0),
(145, 'Dębniki', '1410623', 0),
(146, 'Dębniki', '1410624', 0),
(147, 'Zakopane', '264492', 0),
(148, 'Vassens', '165816', 0),
(149, 'Wrocław', '273125', 0),
(150, 'Kraków', '274455', 8),
(151, 'Zakopane', '264492', 8),
(152, 'Baczyn', '1415293', 8),
(153, 'Dębniki', '1410624', 8),
(154, 'Dębniki', '1410624', 0),
(155, 'Zakopane', '264492', 0),
(156, 'Zakopane', '264492', 0),
(157, 'Zakopane', '264492', 0),
(158, 'Dębniki', '1410624', 0),
(159, 'Wrocław', '273125', 0),
(160, 'Palcza', '1394871', 0),
(161, 'Palcza', '1394871', 0),
(162, 'Palcza', '1394871', 8),
(163, 'Palcza', '1394871', 8),
(164, 'Palcza', '1394871', 8),
(165, 'Palcza', '1394871', 8),
(166, 'Baczyn', '1415293', 8),
(167, 'Palcza', '1394871', 8),
(168, 'Madaba', '224575', 8),
(169, 'Kraków', '274455', 8),
(170, 'Palcza', '1394871', 8),
(171, 'Palcza', '1394871', 8),
(172, 'Asjut', '127376', 0),
(173, 'Asjut', '127376', 0),
(174, 'Zakopane', '264492', 0),
(175, 'Zakopane', '264492', 8),
(176, 'Svendborg', '126179', 8),
(177, 'Dominowo', '271039', 8),
(178, 'Dębniki', '1410624', 8),
(179, 'Kutaisi', '169067', 8),
(180, 'Kraków', '274455', 0),
(181, 'Kraków', '274455', 0),
(182, 'Kraków', '274455', 11),
(183, 'Kair', '127164', 0),
(184, 'Kair', '127164', 0),
(185, 'Kair', '127164', 0),
(186, 'Kairuan', '316836', 0),
(187, 'Kolkata', '206690', 12),
(188, 'Skórka', '1389536', 0),
(189, 'Kąpiele Wielkie', '1405118', 12),
(190, 'Kąpiołki', '1405117', 12),
(191, 'Bogota', '107487', 12),
(192, 'Changsha', '105567', 12),
(193, 'Giza', '127047', 12),
(194, 'Rio De Janeiro', '45449', 12),
(195, 'Kąpiele Wielkie', '1405118', 12),
(196, 'Rio De Janeiro', '45449', 12),
(197, 'Baczyn', '1415293', 12),
(198, 'Baczyn', '1415293', 12),
(199, 'Baczyn', '1415293', 12),
(200, 'Changchun', '105915', 12),
(201, 'Londyn', '328328', 12),
(202, 'Dębniki', '1410624', 12),
(203, 'Dębniki', '1410624', 12),
(204, 'Dębniki', '1410624', 12),
(205, 'Dębniki', '1410624', 12),
(206, 'Krzczonów', '1401642', 12),
(207, 'Jędrachowa-Chabówka', '2670868', 12),
(208, 'Dębniki', '1410624', 12),
(209, 'Wyźrał', '2699441', 12),
(210, 'Pełnatycze', '1394502', 12),
(211, 'Dębniki', '1410624', 0),
(212, 'Skórka', '1389536', 0),
(213, 'Dębniki', '1410624', 0),
(214, 'Dębniki', '1410624', 0),
(215, 'Dębniki', '1410624', 0),
(216, 'Dębniki', '1410624', 0),
(217, 'Skórka', '1389536', 0),
(218, 'Dębniki', '1410624', 0),
(219, 'Dębniki', '1410624', 0),
(220, 'Dębniki', '1410623', 0),
(221, 'Dębniki', '1410624', 12),
(222, 'Dębniki', '1410624', 12),
(223, 'Casablanca', '243353', 12),
(224, 'Dębniki', '1410624', 12),
(225, 'Dębniki', '1410624', 12);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logindata`
--

CREATE TABLE `logindata` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `logindata`
--

INSERT INTO `logindata` (`id`, `name`, `password`, `email`) VALUES
(4, 'Paweł Malina', '$2y$10$IiI1/HeZY6QlD8KtnH3XyeWzirCEFwVK1/8lx.xg7znzfqcGgXf6i', 'niezapomne1234@interia.pl'),
(6, 'sd', '$2y$10$.5Cd.cQCmUYc4XWA7Qk7EOoyzZffdeA4X6peocS/XaveQpJ.D8JDC', 'kmjaj '),
(7, 'Paweł Malina', 'chuj', 'kaka201210@'),
(8, 'Paweł Malina', '$2y$10$5SIqLUSZTlVX4hEngMed2OfhQKxgxz9OAunx8EpWaujcKphDadt1W', 'kaka201210@vp.pl'),
(9, 'Dominik Duda', '$2y$10$lR/IAFa5voW77ONXfrcMMecLxEmBad39pSSYQvgfzcLnwqIu6v.OW', 'dudek050@gmail.com'),
(10, 'Paweł Malina', '$2y$10$4ramt7zUqBrjNKqo2mR0aOtoYD9ge/QatSii1Toao8NjD7kUzIj7G', 'malinowykrzaczek@gmail.com'),
(11, 'Paweł Malina', '$2y$10$fXhZsa7l2rHNMHih16kc9uRynUmYqcZ4raACOv0LmmFc.Aw3A0yWq', 'pawel.malina1999@gmail.com'),
(12, 'Paweł Malina', '$2y$10$uK3IkzKpNo8lNWxH0.vZNecl/Snmei0lpMLkaJBMIiakym2Wv/Jka', 'a@a.pl');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `saveposition`
--

CREATE TABLE `saveposition` (
  `id_position` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `latitude` varchar(20) COLLATE utf8_polish_ci NOT NULL,
  `longitude` varchar(20) COLLATE utf8_polish_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `saveposition`
--

INSERT INTO `saveposition` (`id_position`, `user_id`, `latitude`, `longitude`, `date`) VALUES
(11, 8, '49.796710399999995', '19.7328896', '2018-11-24 22:18:47'),
(12, 8, '40.730610', '-73.935242', '2018-11-24 22:25:19'),
(13, 8, '52.17935', '21.57251', '2018-11-24 22:26:48'),
(14, 8, '50.0469575', '19.9222267', '2018-11-26 06:53:34'),
(15, 8, '50.046908099999996', '19.9222428', '2018-11-26 06:54:56'),
(16, 8, '50.0469556', '19.9222623', '2018-11-26 06:55:13'),
(17, 8, '50.0469535', '19.922261100000004', '2018-11-26 06:56:45'),
(18, 8, '50.0469535', '19.922261100000004', '2018-11-26 06:56:54'),
(19, 8, '50.0468584', '19.9222955', '2018-11-26 07:53:25'),
(20, 8, '51.919438', '19.145136', '2018-11-26 08:07:23'),
(21, 8, '49.7693146', '19.7442868', '2018-12-01 21:16:25'),
(22, 12, '50.046317599999995', '19.9220365', '2018-12-18 12:45:39');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `lastsearch`
--
ALTER TABLE `lastsearch`
  ADD PRIMARY KEY (`searchID`);

--
-- Indexes for table `logindata`
--
ALTER TABLE `logindata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saveposition`
--
ALTER TABLE `saveposition`
  ADD PRIMARY KEY (`id_position`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `lastsearch`
--
ALTER TABLE `lastsearch`
  MODIFY `searchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- AUTO_INCREMENT dla tabeli `logindata`
--
ALTER TABLE `logindata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT dla tabeli `saveposition`
--
ALTER TABLE `saveposition`
  MODIFY `id_position` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `saveposition`
--
ALTER TABLE `saveposition`
  ADD CONSTRAINT `saveposition_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `logindata` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
