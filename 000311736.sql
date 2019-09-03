
DROP TABLE IF EXISTS `fitness_account_detail`;
CREATE TABLE IF NOT EXISTS `fitness_account_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `email` varchar(65) NOT NULL,
  `first_name` varchar(65) NOT NULL,
  `last_name` varchar(65) NOT NULL,
  `gender` varchar(65) NOT NULL,
  `age` int(11) NOT NULL,
  `joined_date` date NOT NULL,
  `security_question_one` text NOT NULL,
  `security_answer_one` text NOT NULL,
  `security_question_two` text NOT NULL,
  `security_answer_two` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_account_detail`
--

INSERT INTO `fitness_account_detail` (`id`, `user_id`, `email`, `first_name`, `last_name`, `gender`, `age`, `joined_date`, `security_question_one`, `security_answer_one`, `security_question_two`, `security_answer_two`) VALUES
(7, 7, 'vi_taliy@hotmail.com', 'Vitaliy', 'Shahanyants', 'Male', 23, '2017-12-15', 'What was the last name of your third grade teacher?', 'yes', 'What was the last name of your third grade teacher?', 'yes'),
(8, 8, 'vi_taliy@hotmail.com', 'Vitaliy', 'Shahanyants', 'Male', 23, '2017-12-20', 'What was the last name of your third grade teacher?', 'yes', 'What was the last name of your third grade teacher?', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_body_fat`
--

DROP TABLE IF EXISTS `fitness_body_fat`;
CREATE TABLE IF NOT EXISTS `fitness_body_fat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `weist` int(11) NOT NULL,
  `hip` int(11) NOT NULL,
  `neck` int(11) NOT NULL,
  `measure_type` varchar(64) NOT NULL,
  `body_fat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_body_fat`
--

INSERT INTO `fitness_body_fat` (`id`, `user_id`, `height`, `weist`, `hip`, `neck`, `measure_type`, `body_fat`) VALUES
(1, 7, 5, 32, 0, 12, 'imperial', 24);

-- --------------------------------------------------------

--
-- Table structure for table `fitness_body_fat_log`
--

DROP TABLE IF EXISTS `fitness_body_fat_log`;
CREATE TABLE IF NOT EXISTS `fitness_body_fat_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `height` int(11) NOT NULL,
  `weist` int(11) NOT NULL,
  `hip` int(11) NOT NULL,
  `neck` int(11) NOT NULL,
  `measure_type` varchar(64) NOT NULL,
  `body_fat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_body_fat_log`
--

INSERT INTO `fitness_body_fat_log` (`id`, `user_id`, `date`, `height`, `weist`, `hip`, `neck`, `measure_type`, `body_fat`) VALUES
(44, 7, '2017-12-27', 5, 32, 0, 12, 'imperial', 24),
(43, 7, '2017-12-27', 5, 32, 0, 12, 'imperial', 24),
(42, 7, '2017-12-27', 5, 32, 0, 12, 'imperial', 24);

-- --------------------------------------------------------

--
-- Table structure for table `fitness_body_mass_index`
--

DROP TABLE IF EXISTS `fitness_body_mass_index`;
CREATE TABLE IF NOT EXISTS `fitness_body_mass_index` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `mass_index` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_body_mass_index`
--

INSERT INTO `fitness_body_mass_index` (`id`, `user_id`, `mass_index`) VALUES
(1, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `fitness_body_mass_index_log`
--

DROP TABLE IF EXISTS `fitness_body_mass_index_log`;
CREATE TABLE IF NOT EXISTS `fitness_body_mass_index_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `mass_index` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_body_mass_index_log`
--

INSERT INTO `fitness_body_mass_index_log` (`id`, `user_id`, `mass_index`, `date`) VALUES
(1, 7, 35, '0000-00-00'),
(2, 7, 35, '2017-12-26'),
(3, 7, 35, '2017-12-27'),
(4, 7, 35, '2017-12-27'),
(5, 7, 35, '2017-12-27');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_body_weight`
--

DROP TABLE IF EXISTS `fitness_body_weight`;
CREATE TABLE IF NOT EXISTS `fitness_body_weight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `body_weight` int(11) NOT NULL,
  `weight_type` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `user_id_2` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_body_weight`
--

INSERT INTO `fitness_body_weight` (`id`, `user_id`, `body_weight`, `weight_type`) VALUES
(1, 7, 180, 'lb'),
(2, 8, 0, 'lb');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_feedback`
--

DROP TABLE IF EXISTS `fitness_feedback`;
CREATE TABLE IF NOT EXISTS `fitness_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) NOT NULL,
  `feedback` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fitness_inbox`
--

DROP TABLE IF EXISTS `fitness_inbox`;
CREATE TABLE IF NOT EXISTS `fitness_inbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_to` int(11) NOT NULL,
  `user_from` int(11) NOT NULL,
  `read_it` varchar(64) NOT NULL,
  `deleted` varchar(64) NOT NULL,
  `message` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_to` (`user_to`),
  KEY `user_from` (`user_from`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fitness_posts`
--

DROP TABLE IF EXISTS `fitness_posts`;
CREATE TABLE IF NOT EXISTS `fitness_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_thread_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `thread_id` (`post_thread_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fitness_posts_threads`
--

DROP TABLE IF EXISTS `fitness_posts_threads`;
CREATE TABLE IF NOT EXISTS `fitness_posts_threads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `topic` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_posts_threads`
--

INSERT INTO `fitness_posts_threads` (`id`, `user_id`, `topic`) VALUES
(3, 7, 'Some Topic');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_profile`
--

DROP TABLE IF EXISTS `fitness_profile`;
CREATE TABLE IF NOT EXISTS `fitness_profile` (
  `user_id` int(11) NOT NULL,
  `about_me` text NOT NULL,
  `image` varchar(64) NOT NULL,
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_profile`
--

INSERT INTO `fitness_profile` (`user_id`, `about_me`, `image`) VALUES
(7, 'Please enter something about yourself', 'avatar_2x.png'),
(8, 'Please enter something about yourself', 'avatar_2x.png');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_security_questions`
--

DROP TABLE IF EXISTS `fitness_security_questions`;
CREATE TABLE IF NOT EXISTS `fitness_security_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `security_question` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_security_questions`
--

INSERT INTO `fitness_security_questions` (`id`, `security_question`) VALUES
(1, 'What was the last name of your third grade teacher?'),
(2, 'What was the name of the boy/girl you had your second kiss with?'),
(3, 'Where were you when you had your first alcoholic drink (or cigarette)?'),
(4, 'What was the name of your second dog/cat/goldfish/etc?'),
(5, 'Where were you when you had your first kiss?'),
(6, 'When you were young, what did you want to be when you grew up?'),
(7, ' Where were you when you first heard about 9/11?'),
(8, ' Where were you New Year\'s 2000?'),
(9, 'What\'s John\'s (or other friend/family member) middle name?'),
(10, 'Who was your childhood hero? ');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_user`
--

DROP TABLE IF EXISTS `fitness_user`;
CREATE TABLE IF NOT EXISTS `fitness_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(65) NOT NULL,
  `enabled` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_user`
--

INSERT INTO `fitness_user` (`user_id`, `role`, `username`, `password`, `enabled`) VALUES
(7, 'user', 'vitaliys', 'vitaliys', 'yes'),
(8, 'user', 'vitaliys2', 'vitaliys2', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_workout_exercise`
--

DROP TABLE IF EXISTS `fitness_workout_exercise`;
CREATE TABLE IF NOT EXISTS `fitness_workout_exercise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `exercise_name` varchar(64) NOT NULL,
  `exercise_type` varchar(64) NOT NULL,
  `sets` varchar(64) NOT NULL,
  `reps` varchar(64) NOT NULL,
  `weight` varchar(64) NOT NULL,
  `weight_type` varchar(64) NOT NULL,
  `cardio_incline` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_workout_exercise`
--

INSERT INTO `fitness_workout_exercise` (`id`, `user_id`, `exercise_name`, `exercise_type`, `sets`, `reps`, `weight`, `weight_type`, `cardio_incline`) VALUES
(20, 7, '', 'chest', '0', '4-6', '100', 'lb', '0');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_workout_routine`
--

DROP TABLE IF EXISTS `fitness_workout_routine`;
CREATE TABLE IF NOT EXISTS `fitness_workout_routine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `routine_name` varchar(64) NOT NULL,
  `public` varchar(64) NOT NULL,
  `day_of_week` varchar(64) NOT NULL,
  `chosen` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `user_id_2` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_workout_routine`
--

INSERT INTO `fitness_workout_routine` (`id`, `user_id`, `routine_name`, `public`, `day_of_week`, `chosen`) VALUES
(13, 7, 'Chest Day', 'public', 'sunday', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_workout_routine_exercises`
--

DROP TABLE IF EXISTS `fitness_workout_routine_exercises`;
CREATE TABLE IF NOT EXISTS `fitness_workout_routine_exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_routine_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `routine_id` (`workout_routine_id`),
  KEY `exercise_id` (`exercise_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_workout_routine_exercises`
--

INSERT INTO `fitness_workout_routine_exercises` (`id`, `workout_routine_id`, `exercise_id`, `user_id`) VALUES
(20, 13, 20, 7);

-- --------------------------------------------------------

--
-- Table structure for table `fitness_workout_routine_log`
--

DROP TABLE IF EXISTS `fitness_workout_routine_log`;
CREATE TABLE IF NOT EXISTS `fitness_workout_routine_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `workout_routine_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `sets` int(11) NOT NULL,
  `reps` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `weight_type` varchar(64) NOT NULL,
  `cardio_incline` int(11) NOT NULL,
  `exercise_type` varchar(64) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `workout_routine_id` (`workout_routine_id`),
  KEY `exercise_id` (`exercise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fitness_workout_routine_log`
--

INSERT INTO `fitness_workout_routine_log` (`id`, `user_id`, `workout_routine_id`, `exercise_id`, `sets`, `reps`, `weight`, `weight_type`, `cardio_incline`, `exercise_type`, `date`) VALUES
(3, 7, 13, 20, 0, 4, 0, 'lb', 0, 'chest', '2017-12-26'),
(4, 7, 13, 20, 0, 4, 0, 'lb', 0, 'chest', '2017-12-26'),
(5, 7, 13, 20, 0, 4, 50, 'lb', 0, 'chest', '2017-12-26'),
(6, 7, 13, 20, 0, 4, 100, 'lb', 0, 'chest', '2017-12-26');

-- --------------------------------------------------------

--
-- Table structure for table `fitness_workout_routine_posts`
--

DROP TABLE IF EXISTS `fitness_workout_routine_posts`;
CREATE TABLE IF NOT EXISTS `fitness_workout_routine_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routine_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `routine_id` (`routine_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ratings_of_workout_routines`
--

DROP TABLE IF EXISTS `ratings_of_workout_routines`;
CREATE TABLE IF NOT EXISTS `ratings_of_workout_routines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_routine_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workout_routine_id` (`workout_routine_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fitness_account_detail`
--
ALTER TABLE `fitness_account_detail`
  ADD CONSTRAINT `fitness_account_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_body_weight`
--
ALTER TABLE `fitness_body_weight`
  ADD CONSTRAINT `fitness_body_weight_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_inbox`
--
ALTER TABLE `fitness_inbox`
  ADD CONSTRAINT `fitness_inbox_ibfk_1` FOREIGN KEY (`user_to`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_posts`
--
ALTER TABLE `fitness_posts`
  ADD CONSTRAINT `fitness_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_posts_threads`
--
ALTER TABLE `fitness_posts_threads`
  ADD CONSTRAINT `fitness_posts_threads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_profile`
--
ALTER TABLE `fitness_profile`
  ADD CONSTRAINT `fitness_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_workout_exercise`
--
ALTER TABLE `fitness_workout_exercise`
  ADD CONSTRAINT `fitness_workout_exercise_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_workout_routine`
--
ALTER TABLE `fitness_workout_routine`
  ADD CONSTRAINT `fitness_workout_routine_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_workout_routine_exercises`
--
ALTER TABLE `fitness_workout_routine_exercises`
  ADD CONSTRAINT `fitness_workout_routine_exercises_ibfk_1` FOREIGN KEY (`workout_routine_id`) REFERENCES `fitness_workout_routine` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fitness_workout_routine_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `fitness_workout_exercise` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `fitness_workout_routine_log`
--
ALTER TABLE `fitness_workout_routine_log`
  ADD CONSTRAINT `fitness_workout_routine_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fitness_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;
