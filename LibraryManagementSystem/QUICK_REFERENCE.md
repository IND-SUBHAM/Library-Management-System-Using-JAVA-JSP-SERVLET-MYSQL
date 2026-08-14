# Quick Reference Guide - Library Management System

## Essential Commands & File Locations

### Database Commands

**Connect to MySQL:**
```bash
mysql -u root -p
```

**Import Database:**
```bash
mysql -u root -p < database/library_db.sql
```

**Check if database exists:**
```sql
SHOW DATABASES;
USE library_db;
SHOW TABLES;
```

**Sample queries:**
```sql
-- View all users
SELECT * FROM users;

-- View all books
SELECT * FROM books;

-- Check book availability
SELECT title, available_copies, total_copies FROM books;

-- View issued books
SELECT * FROM book_issues WHERE status = 'issued';
```

---

## Tomcat Commands

### Windows
```bash
# Start Tomcat (Service)
net start "Apache Tomcat 9.0"

# Stop Tomcat
net stop "Apache Tomcat 9.0"

# Or use startup.bat
C:\apache-tomcat-9.0\bin\startup.bat

# Or use shutdown.bat
C:\apache-tomcat-9.0\bin\shutdown.bat
```

### Linux/Mac
```bash
# Start Tomcat
/path/to/tomcat/bin/startup.sh

# Stop Tomcat
/path/to/tomcat/bin/shutdown.sh

# Check if running
ps aux | grep tomcat
```

---

## File Paths Quick Lookup

```
Database File:
→ database/library_db.sql

Java Source Files:
→ src/main/java/com/library/servlet/*.java
→ src/main/java/com/library/model/*.java
→ src/main/java/com/library/dao/*.java
→ src/main/java/com/library/util/DBConnection.java

JSP Pages:
→ WebContent/*.jsp

Frontend Files:
→ WebContent/css/style.css
→ WebContent/js/script.js

Configuration:
→ WebContent/WEB-INF/web.xml
→ src/main/java/com/library/util/DBConnection.java

MySQL JDBC Driver:
→ WebContent/WEB-INF/lib/mysql-connector-java-*.jar
```

---

## Default Credentials

```
Admin Login:
  Username: admin
  Password: admin123

Librarian Login:
  Username: librarian1
  Password: lib123

Member Login:
  Username: member1
  Password: mem123
```

---

## Common File Edits

### Change MySQL Password
**File**: `src/main/java/com/library/util/DBConnection.java`
```java
private static final String DB_PASSWORD = "your_new_password";
```

### Change Tomcat Port
**File**: `{TOMCAT_HOME}/conf/server.xml`
```xml
<Connector port="8080" protocol="HTTP/1.1" ...
```

### Change Application Context
**File**: `{TOMCAT_HOME}/conf/Catalina/localhost/`
Create new XML file with custom name

---

## IDE Shortcuts (Eclipse/IntelliJ)

```
Ctrl + Shift + F        Format Code
Ctrl + /                Toggle Comment
Alt + Shift + R         Rename
Ctrl + Shift + O        Organize Imports
F11                     Debug
Ctrl + Shift + T        Find Type
Ctrl + H                Find & Replace
Ctrl + Alt + L          Reformat (IntelliJ)
```

---

## Troubleshooting Quick Fixes

### Website Not Loading
```bash
# Check if Tomcat is running
netstat -ano | findstr :8080

# Restart Tomcat
net stop "Apache Tomcat 9.0"
net start "Apache Tomcat 9.0"

# Clear browser cache (Ctrl+Shift+Delete)
```

### Database Connection Error
```sql
-- Check connection
mysql -u root -p
SHOW DATABASES;
USE library_db;
SHOW TABLES;

-- Check table count (should show 4)
-- users, books, book_issues, reservations
```

### Compile Errors
```bash
# In Eclipse:
# Project → Clean
# Project → Build All
# If still broken: Delete .project and .classpath, reimport
```

### Permission Denied Error
```bash
# Windows - Run as Administrator
# Linux/Mac - Use sudo or add user to group
```

---

## Deployment Checklist

```
Pre-Deployment:
□ Database backup created
□ All credentials updated
□ Test login with all roles
□ Test all features
□ Check error logs
□ Verify JDBC driver installed
□ Clean build successful

Deployment:
□ Create WAR file
□ Copy to Tomcat webapps/
□ Restart Tomcat
□ Verify URL works
□ Test in production environment
□ Monitor logs for errors
□ Document any issues
```

---

## URL Reference

```
Application URLs:
→ Login:       http://localhost:8080/LibraryManagementSystem/
→ Dashboard:   http://localhost:8080/LibraryManagementSystem/dashboard.jsp
→ Books:       http://localhost:8080/LibraryManagementSystem/books.jsp
→ Admin:       http://localhost:8080/LibraryManagementSystem/admin.jsp

Tomcat Admin:
→ Manager:     http://localhost:8080/manager/html
→ Host Manager: http://localhost:8080/host-manager/html

MySQL Workbench:
→ localhost:3306 (default)
```

---

## Code Snippets for Common Tasks

### Add a Book (Java)
```java
BookDAO dao = new BookDAO();
Book book = new Book("Title", "Author", "ISBN", "Category", "Publisher", 2024, 5);
dao.addBook(book);
```

### Login User (Java)
```java
UserDAO dao = new UserDAO();
User user = dao.loginUser("username", "password");
if (user != null) {
    // Login successful
}
```

### Search Books (Java)
```java
BookDAO dao = new BookDAO();
List<Book> results = dao.searchBooks("searchTerm");
```

### Create Session (JSP)
```jsp
<%
    User user = (User) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("index.jsp");
    }
%>
```

---

## Important Dates & Versions

```
Java Version:      8 or higher (Java SE 8+)
Tomcat:            9.0 (or 8.5)
MySQL:             5.7 or 8.0
Maven:             3.6 or higher (optional)
Bootstrap:         5.0 (if added)
jQuery:            3.6 (if added)
```

---

## Performance Tips

1. Use database indexes on frequently searched fields
2. Implement connection pooling
3. Minimize JSP processing
4. Cache static resources
5. Use CDN for external libraries
6. Optimize database queries
7. Use lazy loading for large datasets
8. Implement pagination

---

## Security Reminders

```
✓ Never store passwords in plain text
✓ Always validate user input
✓ Use prepared statements (prevent SQL injection)
✓ Implement CSRF tokens
✓ Set secure session cookies
✓ Use HTTPS in production
✓ Implement rate limiting
✓ Regular security audits
✓ Keep dependencies updated
✓ Use strong password policies
```

---

## Useful MySQL Commands

```sql
-- Show database info
DESCRIBE books;

-- Count records
SELECT COUNT(*) FROM users;

-- Join tables
SELECT u.full_name, b.title 
FROM book_issues bi 
JOIN users u ON bi.user_id = u.user_id 
JOIN books b ON bi.book_id = b.book_id;

-- Update availability
UPDATE books SET available_copies = available_copies - 1 
WHERE book_id = 1;

-- Find overdue books
SELECT * FROM book_issues 
WHERE return_date IS NULL AND due_date < CURDATE();
```

---

## Testing Scenarios

```
Scenario 1: Member Login & Browse
1. Login as member1
2. Go to Books page
3. Search for a book
4. View book details

Scenario 2: Admin Operations
1. Login as admin
2. Go to Admin panel
3. Add new book
4. Edit book details
5. Delete a book

Scenario 3: Database Integrity
1. Add book
2. Check database (mysql)
3. Logout and login again
4. Verify book still exists
```

---

## Support Resources

| Topic | Resource |
|-------|----------|
| Java Servlet | https://tomcat.apache.org/servlet.html |
| JSP | https://tomcat.apache.org/jsp-2.3-doc/ |
| MySQL | https://dev.mysql.com/doc/ |
| HTML/CSS | https://developer.mozilla.org/en-US/ |
| JavaScript | https://www.w3schools.com/js/ |
| Eclipse | https://www.eclipse.org/documentation/ |

---

## Version History

```
v1.0 (January 2026)
- Initial release
- Core features implemented
- Database schema created
- User authentication complete
- Book management functional
```

---

**Keep this guide handy for quick reference during development!**

Last Updated: January 2026
