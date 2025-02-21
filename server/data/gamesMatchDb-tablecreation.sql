-- gamematch.users definition

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_remember_token` mediumtext,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.games_genre definition

CREATE TABLE `games_genre` (
  `game_genre_id` int NOT NULL AUTO_INCREMENT,
  `game_genre_name` varchar(100) NOT NULL,
  `game_genre_popularity` int DEFAULT NULL,
  PRIMARY KEY (`game_genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.users_details definition

CREATE TABLE `users_details` (
  `user_id` int NOT NULL,
  `user_matchmaking_category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_owned_game` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `users_details_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.users_messages definition

CREATE TABLE `users_messages` (
  `receiver_user_id` int NOT NULL,
  `sender_user_id` int NOT NULL,
  `user_message` varchar(255) NOT NULL,
  `user_message_timestamp` datetime NOT NULL,
  PRIMARY KEY (`receiver_user_id`,`sender_user_id`),
  KEY `users_messages_users_FK_1` (`sender_user_id`),
  CONSTRAINT `users_messages_users_FK` FOREIGN KEY (`receiver_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_messages_users_FK_1` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.users_friends definition

CREATE TABLE `users_friends` (
  `user_friend_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_friend_id`,`user_id`),
  KEY `users_friends_users_FK_1` (`user_id`),
  CONSTRAINT `users_friends_users_FK` FOREIGN KEY (`user_friend_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_friends_users_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.games definition

CREATE TABLE `games` (
   `game_id` int NOT NULL AUTO_INCREMENT,
   `game_genre_id` int NOT NULL,
   `game_name` varchar(100) NOT NULL,
   PRIMARY KEY (`game_id`),
   KEY `games_games_genre_FK` (`game_genre_id`),
   CONSTRAINT `games_games_genre_FK` FOREIGN KEY (`game_genre_id`) REFERENCES `games_genre` (`game_genre_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.games_details definition

CREATE TABLE `games_details` (
  `game_id` int NOT NULL,
  `game_description` mediumtext,
  `game_review` int DEFAULT NULL,
  `game_price` decimal(10,0) NOT NULL,
  `game_image` mediumtext,
  `game_platform` enum('Steam','EpicGames','GOG','PS5','PS4','XboxOne','XboxSeries','NitendoSwitch') NOT NULL,
  PRIMARY KEY (`game_id`),
  CONSTRAINT `games_details_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.users_owned_games definition

CREATE TABLE `users_owned_games` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `users_owned_games_games_FK` (`game_id`),
  CONSTRAINT `users_owned_games_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  CONSTRAINT `users_owned_games_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.users_favorites_genre definition

CREATE TABLE `users_favorites_genre` (
  `user_id` int NOT NULL,
  `game_genre_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`game_genre_id`),
  KEY `users_favorites_genre_games_genre_FK` (`game_genre_id`),
  CONSTRAINT `users_favorites_genre_games_genre_FK` FOREIGN KEY (`game_genre_id`) REFERENCES `games_genre` (`game_genre_id`),
  CONSTRAINT `users_favorites_genre_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.users_favorites_games definition

CREATE TABLE `users_favorites_games` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `users_favorites_games_games_FK` (`game_id`),
  CONSTRAINT `users_favorites_games_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  CONSTRAINT `users_favorites_games_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- gamematch.users_ranks definition

CREATE TABLE `users_ranks` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `user_rank` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `users_ranks_games_FK` (`game_id`),
  CONSTRAINT `users_ranks_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  CONSTRAINT `users_ranks_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
