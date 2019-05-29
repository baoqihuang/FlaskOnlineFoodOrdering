CREATE TABLE "DeletedOrder" (
	"user_id"	INTEGER NOT NULL,
	"order_id"	INTEGER NOT NULL,
	PRIMARY KEY("user_id","order_id")
);

CREATE TABLE "Item" (
	"id"	INTEGER,
	"name"	VARCHAR(50),
	"price"	REAL,
	"description"	VARCHAR(10000),
	"ingredient"	VARCHAR(10000),
	"cal"	INTEGER,
	"rating"	REAL,
	"picurl"	VARCHAR(200),
	"category"	VARCHAR(50),
	PRIMARY KEY("id")
);

CREATE TABLE "Userorders" (
	"user_id"	INTEGER NOT NULL,
	"order_id"	INTEGER NOT NULL,
	PRIMARY KEY("user_id","order_id")
);

CREATE TABLE "itemsinorder" (
	"id"	INTEGER NOT NULL,
	"order_id"	INTEGER,
	"item_id"	INTEGER,
	"quantity"	INTEGER NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "order" (
	"id"	INTEGER NOT NULL,
	"total"	FLOAT NOT NULL,
	"time"	TIMESTAMP NOT NULL,
	"ifcancelable"	BOOLEAN NOT NULL,
	"ifpickup"	BOOLEAN NOT NULL,
	"status"	VARCHAR(20) NOT NULL,
	"user_id"	INTEGER NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "review" (
	"id"	INTEGER NOT NULL,
	"user_id"	INTEGER,
	"order_id"	INTEGER,
	"item_id"	INTEGER,
	"comment"	VARCHAR(1000) NOT NULL,
	"reviewable"	BOOLEAN NOT NULL,
	"reviewtime"	TIMESTAMP,
	PRIMARY KEY("id"),
);

CREATE TABLE "shoppingcart" (
	"user_id"	INTEGER NOT NULL,
	"item_id"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	PRIMARY KEY("user_id","item_id")
);

CREATE TABLE "user" (
	"id"	INTEGER NOT NULL,
	"first"	VARCHAR(50) NOT NULL,
	"last"	VARCHAR(50) NOT NULL,
	"email"	VARCHAR(50) NOT NULL UNIQUE,
	"username"	VARCHAR(50) NOT NULL UNIQUE,
	"password"	VARCHAR(500) NOT NULL,
	"user_type"	VARCHAR(50) NOT NULL,
	"phonenumber"	VARCHAR(15),
	PRIMARY KEY("id")
);

