INSERT INTO gamesmatch.games (game_id,game_genre_id,game_name) VALUES
	 (1,2,'Elden Ring'),
	 (2,1,'God of War Ragnarök'),
	 (3,3,'Anthem'),
	 (4,1,'The Last of Us Part II'),
	 (5,9,'Hades'),
	 (6,3,'Deathloop'),
	 (7,6,'Resident Evil Village'),
	 (8,3,'Halo Infinite'),
	 (9,4,'Forza Horizon 5'),
	 (10,3,'Returnal');
INSERT INTO gamesmatch.games (game_id,game_genre_id,game_name) VALUES
	 (11,5,'Metroid Dread'),
	 (12,5,'Ratchet & Clank: Rift Apart'),
	 (13,2,'Demon''s Souls (Remake)'),
	 (14,2,'Final Fantasy VII Remake'),
	 (15,1,'Marvel''s Spider-Man: Miles Morales'),
	 (16,3,'Call of Duty: Modern Warfare II'),
	 (17,3,'Battlefield 2042'),
	 (18,3,'Far Cry 6'),
	 (19,9,'Sifu'),
	 (20,7,'Stray');
INSERT INTO gamesmatch.games (game_id,game_genre_id,game_name) VALUES
	 (21,1,'A Plague Tale: Requiem'),
	 (22,1,'Horizon Forbidden West'),
	 (23,4,'Gran Turismo 7'),
	 (24,2,'Pokémon Legends: Arceus'),
	 (25,5,'Kirby and the Forgotten Land'),
	 (26,3,'Tiny Tina''s Wonderlands'),
	 (27,5,'Sonic Frontiers'),
	 (28,1,'Forspoken'),
	 (29,1,'Star Wars Jedi: Survivor'),
	 (30,2,'Baldur''s Gate 3');
INSERT INTO gamesmatch.games (game_id,game_genre_id,game_name) VALUES
	 (31,2,'Cyberpunk 2077'),
	 (32,6,'Resident Evil 4 Remake'),
	 (33,2,'Diablo IV'),
	 (34,2,'Starfield'),
	 (35,1,'Assassin''s Creed Mirage'),
	 (36,1,'Hogwarts Legacy'),
	 (37,2,'Final Fantasy XVI'),
	 (38,6,'Alan Wake 2'),
	 (39,1,'Marvel''s Spider-Man 2'),
	 (40,8,'Forza Motorsport');
INSERT INTO gamesmatch.games (game_id,game_genre_id,game_name) VALUES
	 (41,8,'Street Fighter 6'),
	 (42,2,'Marvel''s Midnight Suns'),
	 (43,3,'Splatoon 3'),
	 (44,5,'Mario + Rabbids Sparks of Hope'),
	 (45,1,'LEGO Star Wars: The Skywalker Saga');
INSERT INTO gamesmatch.games_genre (game_genre_id,game_genre_name,game_genre_popularity) VALUES
	 (1,'Action-Adventure',NULL),
	 (2,'RPG',NULL),
	 (3,'Shooter',NULL),
	 (4,'Racing',NULL),
	 (5,'Platformer',NULL),
	 (6,'Horror',NULL),
	 (7,'Simulation',NULL),
	 (8,'Fighting',NULL),
	 (9,'Roguelike',NULL);
INSERT INTO gamesmatch.games_details (game_id,game_description,game_review,game_price,game_image,game_platform) VALUES
	 (1,'An expansive open‑world action RPG with rich lore.',94,60,NULL,'Steam,PS5,PS4,XboxOne,XboxSeries'),
	 (2,'A mythological epic blending intense combat with emotional storytelling.',91,70,NULL,'PS5'),
	 (3,'An online multiplayer shooter with sci‑fi elements.',41,40,NULL,'Steam,PS4,XboxOne'),
	 (4,'A gripping post‑apocalyptic journey with deep emotional narratives.',88,60,NULL,'PS4'),
	 (5,'A fast‑paced roguelike dungeon crawler set in Greek mythology.',93,25,NULL,'Steam,NitendoSwitch'),
	 (6,'A stylish first‑person shooter with time‑loop mechanics.',84,50,NULL,'Steam,PS5'),
	 (7,'A horror survival game blending action and mystery.',85,60,NULL,'Steam,PS5,PS4,XboxOne,XboxSeries'),
	 (8,'The latest installment in the Halo series with expansive multiplayer modes.',79,60,NULL,'Steam,XboxOne,XboxSeries'),
	 (9,'An open‑world racing experience set in vibrant landscapes.',88,60,NULL,'Steam,XboxOne,XboxSeries'),
	 (10,'A sci‑fi shooter with rogue‑like elements and intense action.',80,70,NULL,'PS5');
INSERT INTO gamesmatch.games_details (game_id,game_description,game_review,game_price,game_image,game_platform) VALUES
	 (11,'A thrilling 2D action‑adventure with classic exploration elements.',87,60,NULL,'NitendoSwitch'),
	 (12,'A visually stunning platformer with fast‑paced action and humor.',90,70,NULL,'PS5'),
	 (13,'A remake of the classic challenging action RPG with modern graphics.',90,70,NULL,'PS5'),
	 (14,'A reimagining of a beloved classic with dynamic combat and narrative depth.',87,60,NULL,'PS5,PS4'),
	 (15,'A superhero adventure featuring agile combat and stunning cityscapes.',85,50,NULL,'PS5,PS4'),
	 (16,'A modern military shooter with realistic combat scenarios.',80,70,NULL,'Steam,PS5,XboxSeries'),
	 (17,'A large‑scale shooter offering futuristic warfare and dynamic environments.',70,60,NULL,'Steam,PS5,XboxSeries'),
	 (18,'An open‑world shooter set in a politically charged island nation.',75,60,NULL,'Steam,PS5,XboxSeries'),
	 (19,'A martial arts beat ‘em up with a unique aging mechanic.',80,40,NULL,'Steam,PS5'),
	 (20,'An atmospheric adventure from the perspective of a stray cat in a futuristic city.',85,30,NULL,'Steam,PS5');
INSERT INTO gamesmatch.games_details (game_id,game_description,game_review,game_price,game_image,game_platform) VALUES
	 (21,'A dark narrative‑driven adventure set during a grim historical plague.',88,60,NULL,'Steam,PS5,XboxSeries'),
	 (22,'A sequel offering vast open‑world exploration and intense combat.',85,70,NULL,'PS5'),
	 (23,'A realistic racing simulation with a vast collection of cars and tracks.',84,70,NULL,'PS5'),
	 (24,'An innovative take on the Pokémon series with open‑world elements.',82,60,NULL,'NitendoSwitch'),
	 (25,'A charming platformer adventure with creative levels and puzzles.',80,60,NULL,'NitendoSwitch'),
	 (26,'A fantasy‑themed shooter blending humor with RPG elements.',78,60,NULL,'Steam,PS5,XboxSeries'),
	 (27,'A fresh take on the Sonic series with open‑world exploration.',73,60,NULL,'Steam,PS5,XboxOne,XboxSeries'),
	 (28,'An action‑adventure with magical abilities set in a visually striking world.',65,70,NULL,'Steam,PS5'),
	 (29,'An immersive action‑adventure set in the Star Wars universe.',82,70,NULL,'Steam,PS5,XboxSeries'),
	 (30,'A deep role‑playing experience with tactical combat and branching narratives.',95,60,NULL,'Steam,GOG');
INSERT INTO gamesmatch.games_details (game_id,game_description,game_review,game_price,game_image,game_platform) VALUES
	 (31,'A futuristic open‑world RPG set in a dystopian future.',60,50,NULL,'Steam,PS5,XboxOne'),
	 (32,'A remake of a classic horror survival game with modern graphics.',90,70,NULL,'Steam,PS5'),
	 (33,'A dark fantasy RPG featuring epic battles and deep lore.',85,60,NULL,'Steam,PS5,XboxSeries'),
	 (34,'A space epic offering vast exploration and rich storytelling.',80,70,NULL,'Steam,XboxSeries'),
	 (35,'A stealth-action adventure set in ancient cities.',85,60,NULL,'Steam,PS5'),
	 (36,'A magical journey in a modern world filled with mystery.',78,60,NULL,'Steam,PS5,XboxSeries'),
	 (37,'A high-stakes fantasy RPG with dynamic combat.',87,70,NULL,'PS5'),
	 (38,'A psychological horror sequel blending narrative and action.',82,60,NULL,'Steam,PS5,XboxSeries'),
	 (39,'An action-packed superhero adventure with breathtaking visuals.',90,70,NULL,'PS5'),
	 (40,'A realistic racing simulation showcasing next-gen performance.',85,60,NULL,'XboxSeries');
INSERT INTO gamesmatch.games_details (game_id,game_description,game_review,game_price,game_image,game_platform) VALUES
	 (41,'A competitive fighting game with robust online features.',88,50,NULL,'Steam,PS5'),
	 (42,'A strategic superhero game mixing tactics with RPG elements.',82,60,NULL,'Steam,PS5'),
	 (43,'A colorful shooter that emphasizes fun and unique gameplay.',87,60,NULL,'NitendoSwitch'),
	 (44,'A quirky tactical adventure blending humor with puzzles.',80,40,NULL,'NitendoSwitch'),
	 (45,'An expansive sandbox adventure set in a galaxy far away.',75,50,NULL,'Steam,PS5,XboxSeries');
