/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: gameverse
-- ------------------------------------------------------
-- Server version	11.4.3-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `friend_requests`
--

DROP TABLE IF EXISTS `friend_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend_requests` (
  `user_id1` int(11) NOT NULL,
  `user_id2` int(11) NOT NULL,
  `requestor` enum('user_id1','user_id2') NOT NULL,
  PRIMARY KEY (`user_id1`,`user_id2`),
  KEY `users_friends_users_FK_1` (`user_id2`),
  CONSTRAINT `users_friend_requests_FK_friend` FOREIGN KEY (`user_id1`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_friend_requests_FK_user` FOREIGN KEY (`user_id2`) REFERENCES `users` (`user_id`),
  CONSTRAINT `friend_requests_check` CHECK (`user_id1` < `user_id2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_requests`
--

LOCK TABLES `friend_requests` WRITE;
/*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_details`
--

DROP TABLE IF EXISTS `game_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_details` (
  `game_id` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `review_score` int(11) NOT NULL,
  `price` varchar(100) NOT NULL,
  `image_name` longtext DEFAULT NULL,
  `ranks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ranks`)),
  PRIMARY KEY (`game_id`),
  CONSTRAINT `games_details_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_details`
--

LOCK TABLES `game_details` WRITE;
/*!40000 ALTER TABLE `game_details` DISABLE KEYS */;
INSERT INTO `game_details` VALUES
(1,'Embrace mind-blowing moments as you’re pulled deep into the many worlds of Split Fiction, a boundary-pushing co-op adventure.',9,'49,99€','header-0.webp',NULL),
(2,'An online co-op horror game with up to 6 players. Locate valuable, fully physics-based objects and handle them with care as you retrieve and extract to satisfy your creator\'s desires.',9,'9,75€','header-1.webp',NULL),
(3,'The unbridled force of nature runs wild and relentless, with environments transforming drastically from one moment to the next. This is a story of monsters and humans and their struggles to live in harmony in a world of duality.',6,'69,99€','header-2.webp',NULL),
(4,'For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.',8,'Free','header-3.webp','[\"Silver I\", \"Silver II\", \"Silver III\", \"Silver IV\", \"Silver Elite\", \"Silver Elite Master\", \"Gold Nova I\", \"Gold Nova II\", \"Gold Nova III\", \"Gold Nova Master\", \"Master Guardian I\", \"Master Guardian II\", \"Master Guardian Elite\", \"Distinguished Master Guardian\", \"Legendary Eagle\", \"Legendary Eagle Master\", \"Supreme Master First Class\", \"Global Elite\"]'),
(5,'FragPunk is a thrilling 5v5 hero shooter where Shard Cards allow you to break the rules of combat and ensure that no two rounds are ever the same. Get ready to unleash your skills!',6,'Free','header-4.webp',NULL),
(6,'Welcome to THRONE AND LIBERTY, a free-to-play, multi-platform MMORPG. With an always changing environment, Massive Scale PvPvE, and the ability to transform into creatures to battle across land, sea, and air.',5,'Free','header-6.webp',NULL),
(7,'EA SPORTS FC™ 25 gives you more ways to win for the club. Team up with friends in your favourite modes with the new 5v5 Rush, and manage your club to victory as FC IQ delivers more tactical control than ever before.',5,'20,99€','header-7.webp',NULL),
(8,'Curate and manage incredible museums! Explore to discover amazing artifacts. Design and refine the layout, keep staff happy, guests entertained, donations plentiful… and children off the exhibits',9,'29,99€','header-8.webp',NULL),
(9,'Experience an epic action-adventure story set in feudal Japan! Become a lethal shinobi assassin and powerful legendary samurai as you explore a beautiful open world in a time of chaos.',7,'69,99€','header-9-1741682833646.webp',NULL),
(10,'A thrilling story-driven action RPG, with a rich open world, set in 15th century Medieval Europe. Experience the ultimate medieval adventure - through the eyes of young Henry - as you embark on a journey of epic proportions.',8,'59,99€','header-10-1741682833647.webp',NULL),
(11,'War Thunder is the most comprehensive free-to-play, cross-platform, MMO military game dedicated to aviation, armoured vehicles, and naval craft, from the early 20th century to the most advanced modern combat units. Join now and take part in major battles on land, in the air, and at sea.',6,'Free','header-11-1741682833647.webp',NULL),
(12,'Experience authentic Cold War combat and join the struggle for the sprawling, mid-Atlantic island of Everon and its smaller, offshore territory, Arland – or take on the role of Game Master and create your very own scenarios for others to enjoy.',6,'39,99€','header-12-1741682833647.webp',NULL),
(13,'Explore the vibrant open world landscapes of Mexico with limitless, fun driving action in the world’s greatest cars.',8,'29,99€','header-13-1741682833648.webp',NULL),
(14,'Baldur’s Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons &amp; Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power.',9,'59,99€','header-14-1741682833648.webp',NULL),
(15,'Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.',8,'38,99€','header-15.webp',NULL),
(16,'Tom Clancy\'s Rainbow Six® Siege is an elite, tactical team-based shooter where superior planning and execution triumph.',8,'3,99€','header-16-1741682833649.webp','[\"Copper\", \"Bronze\", \"Silver\", \"Gold\", \"Platinum\", \"Emerald\", \"Diamond\", \"Champions\"]'),
(17,'Love, fight, scheme, and claim greatness. Determine your noble house’s legacy in the sprawling grand strategy of Crusader Kings III. Death is only the beginning as you guide your dynasty’s bloodline in the rich and larger-than-life simulation of the Middle Ages.',8,'14,99€','header-17-1741682833649.webp',NULL),
(18,'Anno 1800™ – Lead the Industrial Revolution! Welcome to the dawn of the Industrial Age. The path you choose will define your world. Are you an innovator or an exploiter? A conqueror or a liberator? How the world remembers your name is up to you.',6,'5,99€','header-18-1741682833649.webp',NULL),
(19,'Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.',8,'29,99€','header-19-1741682833650.webp',NULL),
(20,'A storm is coming. Venture into the complete Ghost of Tsushima DIRECTOR’S CUT on PC; forge your own path through this open-world action adventure and uncover its hidden wonders. Brought to you by Sucker Punch Productions, Nixxes Software and PlayStation Studios.',8,'40,19€','header-20-1741682833650.webp',NULL),
(21,'Foundation is a grid-less, laidback medieval city-building game with a focus on organic development, monument construction and resource management.',8,'33,99€','header-21-1741682833650.webp',NULL),
(22,'Apex Legends is the award-winning, free-to-play Hero Shooter from Respawn Entertainment. Master an ever-growing roster of legendary characters with powerful abilities, and experience strategic squad play and innovative gameplay in the next evolution of Hero Shooter and Battle Royale.',6,'Free','header-22-1741682833651.webp','[\"Bronze\", \"Silver\", \"Gold\", \"Platinum\", \"Diamond\", \"Master\", \"Apex Predator\"]'),
(23,'Victory is at your fingertips! Your ability to lead your nation is your supreme weapon, the strategy game Hearts of Iron IV lets you take command of any nation in World War II; the most engaging conflict in world history.',8,'14,99€','header-23-1741682833651.webp',NULL),
(24,'The award-winning strategy game franchise returns with a revolutionary new chapter. Sid Meier\'s Civilization® VII empowers you to build the greatest empire the world has ever known!',5,'69,99€','header-24-1741682833651.webp',NULL),
(25,'Celebrate THRONE AND LIBERTY\'S Wilds of Talandre launch with a Gold Talandre Celebration pack that includes 6,000 Lucent, lucky looking Clover Wolfertinger glide morph and a Black Swan outfit and headpiece. Lucent may be subject to a 3-day holding period for usage within the Auction House.',5,'99,99€','header-25-1741682833652.webp',NULL),
(26,'Call of Duty®: Black Ops 6 is signature Black Ops across a cinematic single-player Campaign, a best-in-class Multiplayer experience and with the epic return of Round-Based Zombies.',5,'79,99€','header-26-1741682833652.webp','[\"Bronze\", \"Silver\", \"Gold\", \"Platinum\", \"Diamond\", \"Crimson\", \"Iridescent\", \"Top 250\"]'),
(27,'Embark on an epic journey across war-torn 19th-century Japan in this open-world action RPG from Team NINJA, the veteran studio behind &quot;Nioh&quot; and &quot;NINJA GAIDEN.&quot;',7,'49,99€','header-27-1741682833652.webp',NULL),
(28,'Awaken as an unstoppable warrior and battle alongside your friends in this story-driven free-to-play online action game',8,'Free','header-28-1741682833653.webp',NULL),
(29,'Play with life and discover the possibilities. Unleash your imagination and create a world of Sims that’s wholly unique. Explore and customize every detail from Sims to homes–and much more.',8,'Free','header-29.webp',NULL),
(30,'Avatar: Frontiers of Pandora™ is a first-person, action-adventure game set in the Western Frontier. Reconnect with your lost heritage and discover what it truly means to be Na\'vi as you join other clans to protect Pandora.',5,'23,09€','header-30-1741682833653.webp',NULL),
(31,'Yu-Gi-Oh! MASTER DUEL is the ultimate free-to-play cross-platform strategy card game with fast-paced Duels, stunning HD graphics and a new, dynamic soundtrack! Get ready to challenge Duelists around the world!',6,'Free','header-31-1741682833653.webp',NULL),
(32,'Fight, farm, build and work alongside mysterious creatures called &quot;Pals&quot; in this completely new multiplayer, open world survival and crafting game!',9,'21,74€','header-32-1741682833654.webp',NULL),
(33,'DREDGE is a single-player fishing adventure with a sinister undercurrent. Sell your catch, upgrade your boat, and dredge the depths for long-buried secrets. Explore a mysterious archipelago and discover why some things are best left forgotten.',9,'12,49€','header-33-1741682833654.webp',NULL),
(34,'Travel across Europe as king of the road, a trucker who delivers important cargo across impressive distances! With dozens of cities to explore, your endurance, skill and speed will all be pushed to their limits.',9,'19,99€','header-34-1741682833654.webp',NULL),
(35,'Path of Exile 2 is a next generation Action RPG from Grinding Gear Games, featuring co-op for up to six players. Set years after the original Path of Exile, you will return to the dark world of Wraeclast and seek to end the corruption that is spreading.',8,'27,75€','header-35-1741682833655.webp',NULL),
(36,'THE CRITICALLY ACCLAIMED FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',8,'59,99€','header-36-1741682833655.webp',NULL),
(37,'The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.',8,'39,99€','header-37-1741682833655.webp',NULL),
(38,'Company of Heroes 3 combines heart-pounding combat with deeper strategic choices in a stunning Mediterranean theatre of war. In Company of Heroes 3, every battle tells a story...what\'s yours?',5,'27,49€','header-38.webp',NULL),
(39,'Embark on an odyssey for the Lost Ark in a vast, vibrant world: explore new lands, seek out lost treasures, and test yourself in thrilling action combat in this action-packed free-to-play RPG.',5,'Free','header-39-1741682833656.webp',NULL),
(40,'Experience the first-ever open world Star Wars™ game and explore distinct locations across the galaxy, both iconic and new. Risk it all as scoundrel Kay Vess, seeking freedom and the means to start a new life.',6,'34,99€','header-40-1741682833656.webp',NULL),
(41,'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.',8,'59,99€','header-41-1741682833657.webp',NULL),
(42,'Become the legendary part man, part machine, all cop hero and deliver justice in Old Detroit.',8,'9,99€','header-42-1741682833657.webp',NULL),
(43,'Played by over 20 million Adventurers - Black Desert Online is an open-world, action MMORPG. Experience intense, action-packed combat, battle massive world bosses, fight alongside friends to siege and conquer castles, and train in professions such as fishing, trading, crafting, cooking, and more!',6,'0,99€','header-43-1741682833657.webp',NULL),
(44,'The only aim in Rust is to survive. Everything wants you to die - the island’s wildlife, other inhabitants, the environment, and other survivors. Do whatever it takes to last another night.',8,'39,99€','header-44-1741682833658.webp',NULL),
(45,'Celebrate THRONE AND LIBERTY\'S Wilds of Talandre launch with a Silver Talandre Celebration pack that includes 2,875 Lucent, a Dappled Lumicora dash and swim in style Steam Tsarca morph. Lucent may be subject to a 3-day holding period for usage within the Auction House.',5,'49,99€','header-45-1741682833658.webp',NULL),
(46,'Celebrate The Bloodline in Showcase. Compete online in MyGM. Expanded gameplay includes intergender wrestling, chain wrestling, barricade diving, the return of Promos + much more!',5,'59,99€','header-46-1741682833658.webp',NULL),
(47,'Le Mans is a continually evolving story... powered by emotion, speed and glory. Le Mans Ultimate - the official game of the FIA World Endurance Championship and 24 Hours of Le Mans.',6,'30,44€','header-47-1741682833658.webp',NULL),
(48,'You are Flameborn, last ember of hope of a dying race. Awaken, survive the terror of a corrupting fog, and reclaim the lost beauty of your kingdom. Venture into a vast world, vanquish punishing bosses, build grand halls and forge your path in this co-op survival action RPG for up to 16 players.',8,'29,99€','header-48-1741682833659.webp',NULL),
(49,'Wartales is an open world RPG in which you lead a group of mercenaries in their search for wealth across a massive medieval universe. Explore the world, recruit companions, collect bounties and unravel the secrets of the tombs of the ancients!',8,'17,49€','header-49-1741682833659.webp',NULL),
(50,'Marvel Rivals is a Super Hero Team-Based PVP Shooter! Assemble an all-star Marvel squad, devise countless strategies by combining powers to form unique Team-Up skills and fight in destructible, ever-changing battlefields across the continually evolving Marvel universe!',8,'Free','header-50.webp','[\"Bronze\", \"Silver\", \"Gold\", \"Platinum\", \"Diamond\", \"Grandmaster\", \"Eternity\", \"One Above All\"]'),
(51,'Overwatch 2 is a critically acclaimed, team-based shooter game set in an optimistic future with an evolving roster of heroes. Team up with friends and jump in today.',2,'Free','header-51.webp','[\"Bronze\", \"Silver\", \"Gold\", \"Platinum\", \"Diamond\", \"Master\", \"Grandmaster\", \"Champion\", \"Top 500\"]');
/*!40000 ALTER TABLE `game_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_developers`
--

DROP TABLE IF EXISTS `game_developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_developers` (
  `game_id` int(11) NOT NULL,
  `developer` varchar(100) NOT NULL,
  PRIMARY KEY (`game_id`,`developer`),
  CONSTRAINT `game_developers_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_developers`
--

LOCK TABLES `game_developers` WRITE;
/*!40000 ALTER TABLE `game_developers` DISABLE KEYS */;
INSERT INTO `game_developers` VALUES
(1,'Hazelight Studios'),
(2,'semiwork'),
(3,'CAPCOM Co., Ltd.'),
(4,'Valve'),
(5,'Bad Guitar Studio'),
(6,'NCSOFT'),
(7,'EA Canada'),
(7,'EA Romania'),
(8,'Two Point Studios'),
(9,'Ubisoft Belgrade'),
(9,'Ubisoft Bordeaux'),
(9,'Ubisoft Bucharest & Craiova'),
(9,'Ubisoft Chengdu'),
(9,'Ubisoft Montpellier'),
(9,'Ubisoft Montreal'),
(9,'Ubisoft Osaka'),
(9,'Ubisoft Philippines'),
(9,'Ubisoft Quebec'),
(9,'Ubisoft Shanghai'),
(9,'Ubisoft Singapore'),
(9,'Ubisoft Sofia'),
(9,'Ubisoft Ukraine'),
(10,'Warhorse Studios'),
(11,'Gaijin Entertainment'),
(12,'Bohemia Interactive'),
(13,'Playground Games'),
(14,'Larian Studios'),
(15,'Saber Interactive'),
(16,'Ubisoft Montreal'),
(17,'Paradox Development Studio'),
(18,'Ubisoft Mainz'),
(19,'FromSoftware, Inc.'),
(20,'Nixxes Software'),
(20,'Sucker Punch Productions'),
(21,'Polymorph Games'),
(22,'Respawn'),
(23,'Paradox Development Studio'),
(24,'Firaxis Games'),
(25,'NCSOFT'),
(26,'Activision Shanghai'),
(26,'Beenox'),
(26,'Demonware'),
(26,'High Moon Studios'),
(26,'Infinity Ward'),
(26,'Raven Software'),
(26,'Sledgehammer Games'),
(26,'Treyarch'),
(27,'KOEI TECMO GAMES CO., LTD.'),
(28,'Digital Extremes'),
(29,'Maxis'),
(30,'Massive Entertainment – A Ubisoft Studio'),
(31,'KONAMI'),
(32,'Pocketpair'),
(33,'Black Salt Games'),
(34,'SCS Software'),
(35,'Grinding Gear Games'),
(36,'FromSoftware, Inc.'),
(37,'Arrowhead Game Studios'),
(38,'Relic Entertainment'),
(39,'Smilegate RPG'),
(40,'Massive Entertainment – A Ubisoft Studio'),
(41,'CD PROJEKT RED'),
(42,'Teyon'),
(43,'Pearl Abyss'),
(44,'Facepunch Studios'),
(45,'NCSOFT'),
(46,'Visual Concepts'),
(47,'Studio 397'),
(48,'Keen Games GmbH'),
(49,'Shiro Games'),
(50,'Blizzard'),
(51,'NetEase');
/*!40000 ALTER TABLE `game_developers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_genres`
--

DROP TABLE IF EXISTS `game_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_genres` (
  `game_id` int(11) NOT NULL,
  `genre` varchar(100) NOT NULL,
  PRIMARY KEY (`game_id`,`genre`),
  CONSTRAINT `games_genre_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_genres`
--

LOCK TABLES `game_genres` WRITE;
/*!40000 ALTER TABLE `game_genres` DISABLE KEYS */;
INSERT INTO `game_genres` VALUES
(1,'Action'),
(1,'Adventure'),
(2,'Action'),
(2,'Early Access'),
(3,'Action'),
(3,'Adventure'),
(3,'RPG'),
(4,'Action'),
(4,'Competitive'),
(4,'Free To Play'),
(5,'Action'),
(5,'Free To Play'),
(6,'Action'),
(6,'Adventure'),
(6,'Free To Play'),
(6,'MMO'),
(6,'RPG'),
(7,'Simulation'),
(7,'Sports'),
(8,'Casual'),
(8,'Indie'),
(8,'Simulation'),
(8,'Strategy'),
(9,'Action'),
(9,'Adventure'),
(9,'RPG'),
(10,'Action'),
(10,'Adventure'),
(10,'RPG'),
(11,'Action'),
(11,'Free To Play'),
(11,'MMO'),
(11,'Simulation'),
(12,'Action'),
(12,'Simulation'),
(12,'Strategy'),
(13,'Action'),
(13,'Adventure'),
(13,'Racing'),
(13,'Simulation'),
(13,'Sports'),
(14,'Adventure'),
(14,'RPG'),
(14,'Strategy'),
(15,'Action'),
(15,'Adventure'),
(15,'RPG'),
(16,'Action'),
(17,'RPG'),
(17,'Simulation'),
(17,'Strategy'),
(18,'Simulation'),
(18,'Strategy'),
(19,'Action'),
(19,'Adventure'),
(20,'Action'),
(20,'Adventure'),
(21,'Indie'),
(21,'Simulation'),
(21,'Strategy'),
(22,'Action'),
(22,'Competitive'),
(22,'Free To Play'),
(23,'Simulation'),
(23,'Strategy'),
(24,'Simulation'),
(24,'Strategy'),
(25,'Action'),
(25,'Adventure'),
(25,'Free To Play'),
(25,'MMO'),
(25,'RPG'),
(26,'Action'),
(26,'Competitive'),
(27,'Action'),
(27,'Adventure'),
(27,'RPG'),
(28,'Action'),
(28,'Free To Play'),
(28,'RPG'),
(29,'Adventure'),
(29,'Casual'),
(29,'Free To Play'),
(29,'Simulation'),
(30,'Action'),
(30,'Adventure'),
(31,'Free To Play'),
(31,'Simulation'),
(31,'Strategy'),
(32,'Action'),
(32,'Adventure'),
(32,'Early Access'),
(32,'Indie'),
(32,'RPG'),
(33,'Adventure'),
(33,'RPG'),
(34,'Indie'),
(34,'Simulation'),
(35,'Action'),
(35,'Adventure'),
(35,'Early Access'),
(35,'MMO'),
(35,'RPG'),
(36,'Action'),
(36,'RPG'),
(37,'Action'),
(38,'Action'),
(38,'Strategy'),
(39,'Action'),
(39,'Adventure'),
(39,'Free To Play'),
(39,'MMO'),
(39,'RPG'),
(40,'Action'),
(40,'Adventure'),
(41,'RPG'),
(42,'Action'),
(42,'Adventure'),
(43,'Action'),
(43,'Adventure'),
(43,'MMO'),
(43,'RPG'),
(43,'Simulation'),
(43,'Strategy'),
(44,'Action'),
(44,'Adventure'),
(44,'Indie'),
(44,'MMO'),
(44,'RPG'),
(45,'Action'),
(45,'Adventure'),
(45,'Free To Play'),
(45,'MMO'),
(45,'RPG'),
(46,'Simulation'),
(46,'Sports'),
(47,'Early Access'),
(47,'Racing'),
(48,'Action'),
(48,'Adventure'),
(48,'Early Access'),
(48,'RPG'),
(49,'Adventure'),
(49,'Indie'),
(49,'RPG'),
(49,'Strategy'),
(50,'Competitive'),
(50,'Free To Play'),
(51,'Competitive'),
(51,'Free To Play');
/*!40000 ALTER TABLE `game_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES
(1,'Split Fiction'),
(2,'R.E.P.O.'),
(3,'Monster Hunter Wilds'),
(4,'Counter-Strike 2'),
(5,'FragPunk'),
(6,'THRONE AND LIBERTY'),
(7,'EA SPORTS FC™ 25'),
(8,'Two Point Museum'),
(9,'Assassin’s Creed Shadows'),
(10,'Kingdom Come: Deliverance II'),
(11,'War Thunder'),
(12,'Arma Reforger'),
(13,'Forza Horizon 5'),
(14,'Baldur\'s Gate 3'),
(15,'Warhammer 40k: Space Marine 2'),
(16,'Rainbow Six® Siege'),
(17,'Crusader Kings III'),
(18,'Anno 1800'),
(19,'Sekiro™: Shadows Die Twice'),
(20,'Ghost of Tsushima'),
(21,'Foundation'),
(22,'Apex Legends™'),
(23,'Hearts of Iron IV'),
(24,'Sid Meier\'s Civilization VII'),
(25,'Talandre Celebration Pack: Gold'),
(26,'Call of Duty®: Black Ops 6'),
(27,'Rise of the Ronin'),
(28,'Warframe'),
(29,'The Sims™ 4'),
(30,'Avatar: Frontiers of Pandora™'),
(31,'Yu-Gi-Oh! Master Duel'),
(32,'Palworld'),
(33,'DREDGE'),
(34,'Euro Truck Simulator 2'),
(35,'Path of Exile 2'),
(36,'ELDEN RING'),
(37,'HELLDIVERS™ 2'),
(38,'Company of Heroes 3'),
(39,'Lost Ark'),
(40,'Star Wars Outlaws'),
(41,'Cyberpunk 2077'),
(42,'RoboCop: Rogue City'),
(43,'Black Desert'),
(44,'Rust'),
(45,'Talandre Celebration Pack: Silver'),
(46,'WWE 2K25'),
(47,'Le Mans Ultimate'),
(48,'Enshrouded'),
(49,'Wartales'),
(50,'Marvel Rivals'),
(51,'Overwatch® 2');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refresh_tokens` (
  `user_id` int(11) NOT NULL,
  `token_id` longtext NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `refresh_token_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES
(33,'de997ca2-abd9-436e-83c8-e1a823dbdfb1'),
(34,'82dcff74-2555-403d-8298-9097e64f6cc9');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_details` (
  `user_id` int(11) NOT NULL,
  `matchmaking_category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `users_details_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorite_developers`
--

DROP TABLE IF EXISTS `user_favorite_developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_favorite_developers` (
  `user_id` int(11) NOT NULL,
  `developer` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`,`developer`),
  CONSTRAINT `users_platforms_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorite_developers`
--

LOCK TABLES `user_favorite_developers` WRITE;
/*!40000 ALTER TABLE `user_favorite_developers` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorite_developers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorite_games`
--

DROP TABLE IF EXISTS `user_favorite_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_favorite_games` (
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `hours_played` int(11) DEFAULT 0,
  `completion` int(11) DEFAULT 0,
  `skill_level` set('Casual','Intermediate','Good','Expert','Pro') DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `rank` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `users_favorites_games_games_FK` (`game_id`),
  CONSTRAINT `users_favorites_games_games_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  CONSTRAINT `users_favorites_games_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorite_games`
--

LOCK TABLES `user_favorite_games` WRITE;
/*!40000 ALTER TABLE `user_favorite_games` DISABLE KEYS */;
INSERT INTO `user_favorite_games` VALUES
(34,3,0,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_favorite_games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorite_genres`
--

DROP TABLE IF EXISTS `user_favorite_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_favorite_genres` (
  `user_id` int(11) NOT NULL,
  `genre` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`,`genre`),
  CONSTRAINT `users_favorites_genres_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorite_genres`
--

LOCK TABLES `user_favorite_genres` WRITE;
/*!40000 ALTER TABLE `user_favorite_genres` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorite_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_friends`
--

DROP TABLE IF EXISTS `user_friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_friends` (
  `friend_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`friend_id`,`user_id`),
  KEY `users_friends_users_FK_1` (`user_id`),
  CONSTRAINT `users_friends_users_FK` FOREIGN KEY (`friend_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_friends_users_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_friends`
--

LOCK TABLES `user_friends` WRITE;
/*!40000 ALTER TABLE `user_friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_messages`
--

DROP TABLE IF EXISTS `user_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_messages` (
  `receiver_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `user_message` varchar(255) NOT NULL,
  `message_timestamp` datetime NOT NULL,
  PRIMARY KEY (`receiver_id`,`sender_id`),
  KEY `users_messages_users_FK_1` (`sender_id`),
  CONSTRAINT `users_messages_users_FK` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_messages_users_FK_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_messages`
--

LOCK TABLES `user_messages` WRITE;
/*!40000 ALTER TABLE `user_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(33,'nino','nino@n.com','$2b$10$q8gPWD9/AxB5rEUzzsf2i.vkED4/AUWBbocin4oSvtfUKx1VUUsdO'),
(34,'nino2','nino@testtest.com','$2b$10$.1rnBrQeFno0G/UEPDT5qu8RDHowI8mXA5ACJerlo1a02MZ2qsk3C'),
(1001,'UserTest1','userTest1@t.com','sdfsdfsdfsdf'),
(1002,'UserTEst2','userTest2@t.com','jkljkljklkhjkl'),
(1003,'UserTest3','userTest3@t.com','srtysrtyrstysrtyrty'),
(1004,'UserTest4','userTest4@t.com','ftiutyurtyurtsy');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-03-24  0:38:31
