CREATE TABLE `encarregados_locais` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`cidade` varchar(100) NOT NULL,
	`bairro` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `encarregados_locais_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `encarregados_regionais` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`cidade` varchar(100) NOT NULL,
	`bairro` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `encarregados_regionais_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ensaios_locais_regiao` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dia` varchar(100) NOT NULL,
	`horas` varchar(10) NOT NULL,
	`cidade` varchar(100) NOT NULL,
	`comum` varchar(100) NOT NULL,
	`encarregado` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ensaios_locais_regiao_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ensaios_locais_tangara` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dia` varchar(100) NOT NULL,
	`horas` varchar(10) NOT NULL,
	`comum` varchar(100) NOT NULL,
	`encarregado` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ensaios_locais_tangara_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `examinadoras` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`cidade` varchar(100) NOT NULL,
	`bairro` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `examinadoras_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hino_silencio_eventos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hora` varchar(20) NOT NULL,
	`descricao` text NOT NULL,
	`ordem` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hino_silencio_eventos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `onde_posso_tocar_categorias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tipo` varchar(100) NOT NULL,
	`musico_oficializado` varchar(10) NOT NULL,
	`musico_nao_oficializado` varchar(10) NOT NULL,
	`musico_rjm_batizado` varchar(10) NOT NULL,
	`musico_rjm_nao_batizado` varchar(10) NOT NULL,
	`musico_ensaios` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `onde_posso_tocar_categorias_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posicao_orquestra_familias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`familia` varchar(100) NOT NULL,
	`instrumentos` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posicao_orquestra_familias_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recomendacoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`descricao` text NOT NULL,
	`ordem` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `recomendacoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `secretaria_musical` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`funcao` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `secretaria_musical_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
