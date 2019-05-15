-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 15 mai 2019 à 02:06
-- Version du serveur :  10.1.38-MariaDB
-- Version de PHP :  7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `samm`
--

-- --------------------------------------------------------

--
-- Structure de la table `addiction`
--

CREATE TABLE `addiction` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) NOT NULL,
  `min_price` double NOT NULL,
  `max_price` double NOT NULL,
  `order` int(11) NOT NULL,
  `creation_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `addiction`
--

INSERT INTO `addiction` (`id`, `name`, `min_price`, `max_price`, `order`, `creation_date`) VALUES
('08C67D0F-8424-44F0-B8E4-921077CDF7A5', 'tobacco', 0.5, 150, 1, '2019-05-06 00:00:00'),
('42160412-882F-46E8-B699-657AE1F106C8', 'alcohol', 1, 150, 2, '2019-05-06 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `taken`
--

CREATE TABLE `taken` (
  `id` varchar(36) NOT NULL,
  `price` double NOT NULL,
  `creation_date` datetime NOT NULL,
  `user` varchar(36) NOT NULL,
  `addiction` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(40) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `creation_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user_addiction`
--

CREATE TABLE `user_addiction` (
  `id` varchar(36) NOT NULL,
  `creation_date` datetime NOT NULL,
  `reset_date` datetime NOT NULL,
  `user` varchar(36) NOT NULL,
  `addiction` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `addiction`
--
ALTER TABLE `addiction`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `taken`
--
ALTER TABLE `taken`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `user_addiction`
--
ALTER TABLE `user_addiction`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
