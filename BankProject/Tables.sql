Create database Team4_BankDB
create table Customer(
	SSN varchar(9) unique,
		Constraint CK_Customer_SSN
		CHECK (LEN(SSN) = 9 and ISNUMERIC(SSN)=1), 
	Cust_Id int identity(100000000,1) Primary Key,
	Name varchar(50),
	Address varchar(100), 
	Age numeric(3),
	CONSTRAINT identity_Chk
			CHECK (Cust_Id < 1000000000 and Cust_Id >= 100000000)
)
create table Account(
	Acct_Id int identity(1,1) Primary Key, 
	Cust_Id int foreign key references Customer(Cust_Id), 
	Acct_Type varchar(1) check(Acct_Type in ('S','C')) Default 'S',
	Balance decimal(18,2),
	CR_Date DateTime Default(getdate()),
	TR_Last_Date DateTime Default(getdate()),
	Duration int
)
create table Transactions(
	Cust_Id int foreign key references Customer(Cust_Id),
	Amount decimal(18,2),
	Tran_Date datetime Default(getdate()),
	Source_Acct int foreign key references Account(Acct_Id),
	Target_Acct int foreign key references Account(Acct_Id),
	CONSTRAINT source_cannot_be_equal_to_target_CHK
	CHECK (Source_Acct <> Target_Acct)
)