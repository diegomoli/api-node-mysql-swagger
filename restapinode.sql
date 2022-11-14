-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2022 a las 12:12:01
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restapinode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lenguajes`
--

CREATE TABLE `lenguajes` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci NOT NULL,
  `programmers` tinyint(4) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lenguajes`
--

INSERT INTO `lenguajes` (`id`, `name`, `programmers`, `createdAt`, `updatedAt`) VALUES
(1, 'JavaScript', 30, NULL, '2022-10-06 15:23:11'),
(3, 'Java', 10, NULL, NULL),
(4, 'Python', 5, NULL, NULL),
(7, 'C#', 7, NULL, NULL),
(8, 'PHP', 20, NULL, NULL),
(11, '.NET', 25, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `name`, `lastname`, `email`, `rol`, `estado`, `createdAt`, `updatedAt`) VALUES
(1, 'Pedro Gonza', '$2a$10$aUQ.UEjHGoFkzs7HTbcv2O4SW5D0Qpxf07WmNn4LtjQPkMGIxsTty', 'Pedro', 'Gonzales', 'pedro@gonzales.com', 'user', 1, NULL, '2022-10-13 15:30:24'),
(11, 'diegomoli', '$2a$10$v3skNCTJsh1CEfGMOl71UuMIIzrRFhpK/Fq4IwYy9RWnZ4C098Sai', 'Diego Nicolas', 'Molinelli', 'diego@moli.com', 'admin', 1, '2022-10-11 15:42:41', '2022-10-12 12:28:24'),
(12, 'CarlosMorales', '$2a$10$/KRLD/FTlZYGWz9trMgBTucfBL/WqVJH70s0bEPW0r75260b3mguO', 'Carlos', 'Morales', 'carlos@morales.com', 'user', 0, '2022-10-13 15:36:48', '2022-10-24 16:50:55');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lenguajes`
--
ALTER TABLE `lenguajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email_unique` (`email`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `lenguajes`
--
ALTER TABLE `lenguajes`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
