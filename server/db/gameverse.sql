-- gameverse.games definition

CREATE TABLE `games` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.users definition

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.game_details definition

CREATE TABLE `game_details` (
  `game_id` int NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `review_score` int NOT NULL,
  `price` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ranks` json DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  CONSTRAINT `games_details_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.game_developers definition

CREATE TABLE `game_developers` (
  `game_id` int NOT NULL,
  `developer` varchar(100) NOT NULL,
  PRIMARY KEY (`game_id`,`developer`),
  CONSTRAINT `game_developers_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.game_genres definition

CREATE TABLE `game_genres` (
  `game_id` int NOT NULL,
  `genre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`game_id`,`genre`),
  CONSTRAINT `games_genre_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.refresh_tokens definition

CREATE TABLE `refresh_tokens` (
  `user_id` int NOT NULL,
  `token_id` longtext NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `refresh_token_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.user_details definition

CREATE TABLE `user_details` (
  `user_id` int NOT NULL,
  `matchmaking_category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `users_details_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.user_favorite_developers definition

CREATE TABLE `user_favorite_developers` (
  `user_id` int NOT NULL,
  `developer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`,`developer`),
  CONSTRAINT `users_platforms_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.user_favorite_games definition

CREATE TABLE `user_favorite_games` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `hours_played` int DEFAULT '0',
  `completion` int DEFAULT '0',
  `skill_level` set('Casual','Intermediate','Good','Expert','Pro') DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rank` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `users_favorites_games_games_FK` (`game_id`),
  CONSTRAINT `users_favorites_games_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  CONSTRAINT `users_favorites_games_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.user_favorite_genres definition

CREATE TABLE `user_favorite_genres` (
  `user_id` int NOT NULL,
  `genre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`,`genre`),
  CONSTRAINT `users_favorites_genres_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.user_friends definition

CREATE TABLE `user_friends` (
  `friend_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`friend_id`,`user_id`),
  KEY `users_friends_users_FK_1` (`user_id`),
  CONSTRAINT `users_friends_users_FK` FOREIGN KEY (`friend_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_friends_users_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.user_messages definition

CREATE TABLE `user_messages` (
  `receiver_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `user_message` varchar(255) NOT NULL,
  `message_timestamp` datetime NOT NULL,
  PRIMARY KEY (`receiver_id`,`sender_id`),
  KEY `users_messages_users_FK_1` (`sender_id`),
  CONSTRAINT `users_messages_users_FK` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_messages_users_FK_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gameverse.user_ranks definition

CREATE TABLE `user_ranks` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `rank` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `users_ranks_games_FK` (`game_id`),
  CONSTRAINT `users_ranks_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  CONSTRAINT `users_ranks_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;