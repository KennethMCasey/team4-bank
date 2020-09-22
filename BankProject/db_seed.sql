USE Team4_BankDB
GO

INSERT INTO Customer
VALUES
('123456789', 'Name', '17 address Ave', 3),
('000000001', 'Old Customer', 'Dakotas', 999),
('000000002', 'Wow', 'Nepal', 100)
GO
INSERT INTO Account 
(Cust_Id, Acct_Type, Balance)
VALUES
-- First Customer
(100000000, 'C', 50555 	),  
(100000000, 'S', 777000 ),
(100000000, 'C', 15000	),

-- Second Customer
(100000001, 'C', 3000	),

-- Third Customer
(100000002, 'C', 9000	),
(100000002, 'S', 13001	)
GO

INSERT INTO Transactions
(Cust_Id, Amount, Source_Acct, Target_Acct)
VALUES
-- First Customer
(100000000, 100,  1, 2		),
(100000000, 200,  2, 3		),
(100000000, 300,  1, 2		),
(100000000, 400,  1, 3		),
(100000000, 500,  3, 2		),
(100000000, -500, 1, null	),

-- Second Customer
(100000001, 1000, 4, null),
(100000001, -200, 4, null),
(100000001, -300, 4, null),

-- Third Customer
(100000002, 999,  6, 5),
(100000002, 200,  5, 6),
(100000002, 300,  5, null),
(100000002, -300, 6, null),
(100000002, 777,  5, 6)
GO

INSERT INTO Transactions
(Cust_Id, Amount, Source_Acct, Target_Acct)
VALUES
-- Third Customer
(100000002, 888,  6, 5),
(100000002, 800,  5, 6),
(100000002, 8811,  5, null),
(100000002, -800, 6, null),
(100000002, 789,  5, 6)
GO

DELETE FROM Customer
WHERE Cust_Id = 100000000

SELECT * FROM Customer;
SELECT * FROM Account;
SELECT * FROM Transactions;


SELECT * 
FROM Transactions as t
WHERE t.Source_Acct = 5 or t.Target_Acct = 5
ORDER BY t.Tran_Date DESC
