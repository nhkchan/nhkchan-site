/*

NHKCHAN DDLs

*/

CREATE TABLE IF NOT EXISTS USERS 
(
	USERID NUMBER PRIMARY KEY,
	USERNAME VARCHAR2(50) NOT NULL UNIQUE,
	EMAIL VARCHAR2(100) NOT NULL UNIQUE,
	FIRST_NAME VARCHAR2(50),
	LAST_NAME VARCHAR2(50),
	GROUPID NUMBER NOT NULL,
	GROUPNAME VARCHAR2(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS USER_CREDENTIALS
(
	USERID NUMBER NOT NULL,
	USERNAME VARCHAR2(50) NOT NULL UNIQUE,
	PASSWORD VARCHAR2(100) NOT NULL,
	FOREIGN KEY(USERID) REFERENCES USERS(USERID)
);

/*

DMLs

*/

INSERT INTO USERS
VALUES
(
	1,
	'nhkchan',
	'kenneth.cootauco@gmail.com',
	'Kenneth',
	'Cootauco',
	1,
	'root'
);

INSERT INTO USER_CREDENTIALS
VALUES
(
	1,
	'nhkchan',
	'a2VubmV0aGg='
);