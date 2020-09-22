USE MASTER
GO
DROP DATABASE IF EXISTS Team4_BankDB
CREATE DATABASE Team4_BankDB
GO
USE Team4_BankDB
GO

DROP TABLE IF EXISTS Customer
CREATE TABLE Customer(
	Cust_Id int IDENTITY(100000000,1) PRIMARY KEY,
	SSN varchar(9) unique,
		Constraint CK_Customer_SSN
		CHECK (LEN(SSN) = 9 and ISNUMERIC(SSN)=1), 
	Name varchar(50),
	Address varchar(100), 
	Age numeric(3),
	CONSTRAINT identity_Chk
			CHECK (Cust_Id < 1000000000 and Cust_Id >= 100000000)
);

DROP TABLE IF EXISTS Account
CREATE TABLE Account(
	Acct_Id int IDENTITY(1,1) PRIMARY KEY, 
	Cust_Id int NOT NULL
        FOREIGN KEY references Customer(Cust_Id)
        ON DELETE CASCADE, 
	Acct_Type char(1) NOT NULL check(Acct_Type in ('S','C')) DEFAULT 'S',
	Balance decimal(18,2),
	CR_Date datetime NOT NULL DEFAULT SYSUTCDATETIME(),
	TR_Last_Date datetime,
    -- Duration in HH:MM:SS:mmm 24-hour format, e.g. 26:01:00:000 is an account that is 26 hrs 1 minute old
	Duration AS STUFF(
        CONVERT(VARCHAR(20), CONVERT(datetime, SYSUTCDATETIME()) - CR_Date, 114),
        1, 2, 
        DATEDIFF(hh, 0, CONVERT(datetime, SYSUTCDATETIME())  - CR_Date)
    )
);

DROP TABLE IF EXISTS Transactions
CREATE TABLE Transactions(
	Cust_Id int NOT NULL
        FOREIGN KEY references Customer(Cust_Id)
        ON DELETE CASCADE,
	Amount decimal(18,2) NOT NULL,
	Tran_Date datetime NOT NULL DEFAULT SYSUTCDATETIME(),
	Source_Acct int NOT NULL FOREIGN KEY references Account(Acct_Id),
	Target_Acct int FOREIGN KEY references Account(Acct_Id),
	CONSTRAINT source_cannot_be_equal_to_target_CHK
	CHECK (Source_Acct <> Target_Acct)
)
GO
