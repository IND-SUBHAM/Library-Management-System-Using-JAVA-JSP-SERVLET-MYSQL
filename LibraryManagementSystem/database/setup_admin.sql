-- Setup Admin User for Library Management System
-- Run this: cd "c:/Users/LENOVO/Project 3/LibraryManagementSystem/database" && "C:/Program Files/MySQL/MySQL Server 8.0/bin/mysql.exe" -u root -p library_db < setup_admin.sql

USE library_db;

-- Insert or Update custom admin user (MySQL 5.7+ syntax)
INSERT INTO users (username, password, email, full_name, role) 
VALUES ('Biswagat', 'subham123', 'biswagat@library.com', 'Biswagat M Bairagi', 'admin')
ON DUPLICATE KEY UPDATE
    password = VALUES(password),
    email = VALUES(email),
    full_name = VALUES(full_name),
    role = VALUES(role);

INSERT INTO users (username, password, email, full_name, role)
VALUES ('admin', 'admin123', 'admin@library.com', 'System Administrator', 'admin')
ON DUPLICATE KEY UPDATE
    password = VALUES(password),
    email = VALUES(email),
    full_name = VALUES(full_name),
    role = VALUES(role);

-- Insert other sample users if missing
INSERT IGNORE INTO users (username, password, email, full_name, role) VALUES
('librarian1', 'lib123', 'librarian@library.com', 'Librarian One', 'librarian'),
('member1', 'mem123', 'member@library.com', 'Member One', 'member');

-- Verify all admin users
SELECT username, full_name, role FROM users WHERE role = 'admin';

-- Show all users
SELECT username, role FROM users ORDER BY role, username;

