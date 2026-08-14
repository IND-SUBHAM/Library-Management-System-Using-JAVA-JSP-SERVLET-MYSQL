# Library Management System - Installation Guide

## Complete Step-by-Step Setup Guide

### Prerequisites
- Windows/Linux/Mac OS
- Java 8 or higher
- Apache Tomcat 8.5 or higher
- MySQL Server 5.7 or higher
- IDE: Eclipse, IntelliJ IDEA, or STS
- MySQL Workbench (optional)

---

## STEP 1: Download and Install Required Software

### 1.1 Install Java Development Kit (JDK)
1. Visit: https://www.oracle.com/java/technologies/downloads/
2. Download JDK 8 or latest version
3. Run the installer and follow the wizard
4. Set JAVA_HOME environment variable:
   - **Windows**: 
     - Right-click "This PC" → Properties → Environment Variables
     - New Variable: JAVA_HOME = C:\Program Files\Java\jdk1.8.0_xxx
   - **Linux/Mac**: Add to ~/.bashrc or ~/.zshrc:
     ```
     export JAVA_HOME=/path/to/jdk
     export PATH=$JAVA_HOME/bin:$PATH
     ```
5. Verify: Open command prompt and run `java -version`

### 1.2 Install Apache Tomcat
1. Visit: https://tomcat.apache.org/download-90.cgi
2. Download Tomcat 9.0 (Windows Service Installer or zip)
3. **Windows Installer**: Run installer, select "Service" during installation
4. **Zip File**: Extract to a folder (e.g., C:\apache-tomcat-9.0.xx)
5. Verify: Open browser and go to http://localhost:8080 (should see Tomcat welcome page)

### 1.3 Install MySQL Server
1. Visit: https://dev.mysql.com/downloads/mysql/
2. Download MySQL Server 8.0 or 5.7
3. Run the installer:
   - Choose setup type: "Developer Default" or "Server only"
   - MySQL Server Port: 3306 (default)
   - MySQL Root Password: Set a strong password (remember it!)
   - Configure MySQL as Windows Service (Windows only)
4. Verify: Open MySQL Command Line and run `mysql -u root -p` (enter password)

### 1.4 Install MySQL Workbench (Optional but Recommended)
1. Visit: https://dev.mysql.com/downloads/workbench/
2. Download and install MySQL Workbench
3. Launch and connect to localhost with root user

### 1.5 Install IDE (Eclipse or IntelliJ)
**For Eclipse/STS:**
1. Visit: https://www.eclipse.org/downloads/
2. Download Eclipse IDE for Enterprise Java Developers
3. Extract and run eclipse.exe

**For IntelliJ IDEA:**
1. Visit: https://www.jetbrains.com/idea/download/
2. Download Community Edition (free)
3. Run installer

---

## STEP 2: Database Setup

### 2.1 Create Database Using MySQL Workbench
1. Open MySQL Workbench
2. Click on "+" next to "MySQL Connections"
3. Enter connection details:
   - Connection Name: Local MySQL
   - Hostname: localhost
   - Port: 3306
   - Username: root
   - Password: (your MySQL password)
4. Click "Test Connection" → OK → OK
5. Double-click the connection to open it
6. File → Open SQL Script
7. Select `database/library_db.sql` from the project
8. Click "Execute All" (or press Ctrl+Shift+Enter)
9. Database and tables will be created

### 2.2 Create Database Using Command Line
1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Navigate to the database folder:
   ```
   cd c:\Users\LENOVO\Project 3\LibraryManagementSystem\database
   ```
3. Run the SQL script:
   ```
   mysql -u root -p < library_db.sql
   ```
4. Enter your MySQL root password when prompted
5. Tables will be created with sample data

### 2.3 Verify Database Creation
1. Open MySQL Workbench or Command Line
2. Run: `USE library_db; SHOW TABLES;`
3. You should see: users, books, book_issues, reservations

---

## STEP 3: Configure the Project

### 3.1 Import Project into Eclipse/STS
1. Open Eclipse/STS
2. File → Import → Existing Projects into Workspace
3. Select root directory: `c:\Users\LENOVO\Project 3\LibraryManagementSystem`
4. Click Finish
5. Project will be imported

### 3.2 Add MySQL JDBC Driver
1. Download MySQL Connector/J:
   - Visit: https://dev.mysql.com/downloads/connector/j/
   - Download: Platform Independent (ZIP Archive)
2. Extract the ZIP file
3. Copy `mysql-connector-java-8.0.xx.jar` to:
   ```
   LibraryManagementSystem\WebContent\WEB-INF\lib\
   ```
4. Right-click project → Build Path → Configure Build Path
5. Click "Add JARs" → Navigate to WEB-INF/lib → Select mysql-connector-java jar → OK

### 3.3 Update Database Connection Details
1. Open: `src/main/java/com/library/util/DBConnection.java`
2. Update credentials (if different from defaults):
   ```java
   private static final String DB_URL = "jdbc:mysql://localhost:3306/library_db";
   private static final String DB_USER = "root";
   private static final String DB_PASSWORD = "your_mysql_password"; // Change this!
   ```
3. Save the file

---

## STEP 4: Configure Tomcat in Eclipse/STS

### 4.1 Add Tomcat Runtime
1. Window → Preferences (Eclipse) or Eclipse → Preferences (macOS)
2. Server → Runtime Environments
3. Click Add
4. Select "Apache Tomcat v9.0" → Next
5. Click Browse and select Tomcat installation folder
6. Click Finish → Apply and Close

### 4.2 Convert Project to Faceted Form
1. Right-click project → Properties
2. Search for "Facet" in the filter
3. Click "Project Facets"
4. Click "Convert to faceted form"
5. Ensure "Java" is version 1.8 or higher
6. Ensure "Dynamic Web Module" is selected
7. Apply and Close

---

## STEP 5: Build and Run

### 5.1 Build Project
1. Right-click project → Clean
2. Project → Build All
3. Check for any build errors in the console

### 5.2 Run on Tomcat
1. Right-click project → Run As → Run on Server
2. Select Apache Tomcat v9.0 → Finish
3. Eclipse will deploy the application
4. Browser should open automatically to: http://localhost:8080/LibraryManagementSystem/

### 5.3 Access the Application
- URL: http://localhost:8080/LibraryManagementSystem/
- Login with default credentials (see below)

---

## STEP 6: Test the Application

### Login with Default Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Librarian Account:**
- Username: `librarian1`
- Password: `lib123`

**Member Account:**
- Username: `member1`
- Password: `mem123`

### Test Features
1. Login with member account
2. Go to "Books" page - should see 5 sample books
3. Click "Issue" to issue a book (not fully implemented yet)
4. Login as Librarian/Admin to access Admin Panel
5. Try adding a new book

---

## STEP 7: (Optional) Deploy to External Tomcat

### 7.1 Create WAR File
1. Right-click project → Export → WAR file
2. Destination: C:\apache-tomcat-9.0\webapps\LibraryManagementSystem.war
3. Click Finish

### 7.2 Copy WAR File
- The WAR file will be automatically extracted when Tomcat restarts

### 7.3 Restart Tomcat
- Windows: Services → Apache Tomcat 9.0 → Restart
- Or manually stop/start in CATALINA_HOME/bin

---

## Troubleshooting

### Issue: "404 Page Not Found"
**Solution:**
- Ensure Tomcat is running
- Check URL: http://localhost:8080/LibraryManagementSystem/
- Check Eclipse console for deployment errors
- Restart Tomcat and reload browser

### Issue: "Cannot connect to database"
**Solution:**
- Ensure MySQL is running
  - Windows: Services → MySQL80 (or version) → check if running
  - Mac/Linux: Terminal → `sudo service mysql status`
- Verify credentials in DBConnection.java
- Check MySQL port is 3306
- Ensure library_db database exists: `mysql -u root -p`
  - Run: `SHOW DATABASES;` (should show library_db)

### Issue: "MySQL Connector JAR not found"
**Solution:**
- Download MySQL Connector/J from official MySQL website
- Place in WebContent/WEB-INF/lib/
- Rebuild project: Project → Clean → Build

### Issue: "Servlet not found"
**Solution:**
- Ensure web.xml has correct servlet mappings
- Rebuild project: Project → Clean
- Right-click project → Refresh (F5)

### Issue: JSP files showing code instead of rendering
**Solution:**
- Ensure proper JSP container (Tomcat)
- Check file extension is .jsp (not .jsp.txt)
- Restart Tomcat
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: Compile Errors
**Solution:**
- Project → Clean and Build
- Ensure JDK is properly configured
- Check if MySQL connector JAR is in build path
- If persists, delete .project and .classpath, reimport project

---

## File Structure Reference

```
LibraryManagementSystem/
├── src/main/java/com/library/
│   ├── servlet/
│   │   ├── LoginServlet.java
│   │   ├── LogoutServlet.java
│   │   └── RegisterServlet.java
│   ├── model/
│   │   ├── User.java
│   │   └── Book.java
│   ├── dao/
│   │   ├── UserDAO.java
│   │   └── BookDAO.java
│   └── util/
│       └── DBConnection.java
├── WebContent/
│   ├── index.jsp (Login)
│   ├── register.jsp
│   ├── dashboard.jsp
│   ├── books.jsp
│   ├── mybooks.jsp
│   ├── admin.jsp
│   ├── profile.jsp
│   ├── css/style.css
│   ├── js/script.js
│   └── WEB-INF/
│       ├── web.xml
│       └── lib/ (add mysql-connector-java.jar here)
├── database/
│   └── library_db.sql
├── .project
├── .classpath
└── README.md
```

---

## Next Steps

1. **Customize**: Modify styles in `css/style.css`
2. **Enhance**: Add more features like email notifications
3. **Secure**: Implement password hashing and encryption
4. **Deploy**: Deploy to production Tomcat server
5. **Backup**: Regularly backup MySQL database

---

## Support Resources

- Eclipse Documentation: https://www.eclipse.org/documentation/
- Apache Tomcat: https://tomcat.apache.org/
- MySQL Documentation: https://dev.mysql.com/doc/
- Java Servlets: https://docs.oracle.com/javaee/7/tutorial/servlets.htm
- JSP Documentation: https://projects.eclipse.org/projects/ee4j.jsp

---

**Installation completed! Your Library Management System is ready to use.**
