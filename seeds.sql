INSERT INTO departments (d_id, department_name)
VALUES 
(1, 'Sales'),
(2, 'Human Resources'),
(3, 'Engineering'),
(4, 'IT'),
(5, 'Finance'),
(6, 'Executive');

INSERT INTO roles (r_id, title, salary, department_id)
VALUES 
(1, 'Account Executive', 100000, 1),
(2, 'Sr Account Executive', 150000, 1),
(3, 'Sales Director', 200000, 1),
(4, 'HR Coordinator', 75000, 2),
(5, 'HR Generalist', 85000, 2),
(6, 'HR Director', 100000, 2),
(7, 'Jr Developer', 85000, 3),
(8, 'Sr Developer', 125000, 3),
(9, 'Programming Director', 225000, 3),
(10, 'IT Project Manager', 850000, 4),
(11, 'IT Project Director', 100000, 4),
(12, 'Chief Executive Officer', 300000, 6),
(13, 'Chief Operating Officer', 275000, 6),
(14, 'Chief Financial Officer', 275000, 5);


INSERT INTO employees (e_id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Dottie', 'O''Neil', 12, NULL),
(2, 'Becky', 'Houlihan', 13, 1),
(3, 'April', 'Romper', 14, 1),
(4, 'Dale', 'Robson', 3, 1),
(5, 'William', 'Louie', 9, 2),
(6, 'Carl', 'Cliffbeard', 11, 2),
(7, 'Jackie', 'O''Rourke', 6, 2),
(8, 'Bob', 'Johnson', 1, 4),
(9, 'Frank', 'Dodson', 1, 4),
(10, 'Jim', 'Bobson', 2, 4),
(11, 'Frankie', 'Codson', 4, 7),
(12, 'Bill', 'Brewer', 5, 7),
(13, 'Dom', 'Chewer', 5, 7),
(14, 'Mary', 'Bronson', 7, 5),
(15, 'Sarah', 'Robbie', 8, 5),
(16, 'Jeb', 'Johnnygriff', 10, 6),
(17, 'Barton', 'Heathcliff', 10, 6);