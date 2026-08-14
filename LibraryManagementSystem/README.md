# Library Management System

A comprehensive web-based library management system built with Java, JSP, HTML, CSS, and JavaScript with MySQL database backend.

## Features

- **User Management**: Registration, login, and role-based access (Admin, Librarian, Member)
- **Book Management**: Add, edit, delete, and search books
- **Book Issuing**: Issue books to members and track book availability
- **Book Returns**: Process book returns and manage overdue books
- **User Dashboard**: Personalized dashboard for different user roles
- **Responsive Design**: Modern, mobile-friendly interface
- **Database Integration**: Persistent storage using MySQL

## System Requirements

- Java Development Kit (JDK) 8 or higher
- Apache Tomcat Server 8.5 or higher
- MySQL Server 5.7 or higher
- MySQL Workbench (optional, for database management)
- IDE: Eclipse, IntelliJ IDEA, or STS (Spring Tool Suite)

## Project Structure

```
LibraryManagementSystem/
├── src/main/java/com/library/
│   ├── servlet/          # Servlet classes (LoginServlet, RegisterServlet, etc.)
│   ├── model/            # Model classes (User, Book)
│   ├── dao/              # Data Access Objects (UserDAO, BookDAO)
│   └── util/             # Utility classes (DBConnection)
├── WebContent/
│   ├── index.jsp         # Login page
│   ├── register.jsp      # Registration page
│   ├── dashboard.jsp     # Main dashboard
│   ├── books.jsp         # Books listing page
│   ├── mybooks.jsp       # My books page
│   ├── admin.jsp         # Admin panel
│   ├── profile.jsp       # User profile page
│   ├── css/
│   │   └── style.css     # Stylesheet
│   ├── js/
│   │   └── script.js     # JavaScript functions
│   └── WEB-INF/
│       └── web.xml       # Web application configuration
└── database/
    └── library_db.sql    # Database setup script
```

## Setup Instructions

### 1. Database Setup

1. Open MySQL Workbench or MySQL command line
2. Execute the SQL script to create the database:
   ```bash
   mysql -u root -p < database/library_db.sql
   ```
3. Default credentials (update in DBConnection.java if different):
   - Username: `root`
   - Password: (leave empty or update as needed)

### 2. IDE Setup (Using Eclipse/STS)

1. Open Eclipse/STS
2. Go to File > Import > Existing Projects into Workspace
3. Select the LibraryManagementSystem folder
4. Right-click project > Properties > Project Facets
5. Convert to faceted form (if needed)
6. Select Java version 8 or higher
7. Apply and Close

### 3. Configure Database Connection

1. Edit `src/main/java/com/library/util/DBConnection.java`
2. Update database credentials:
   ```java
   private static final String DB_URL = "jdbc:mysql://localhost:3306/library_db";
   private static final String DB_USER = "root";
   private static final String DB_PASSWORD = "your_password"; // Change this
   ```

### 4. Add MySQL JDBC Driver

1. Download MySQL JDBC driver: https://dev.mysql.com/downloads/connector/j/
2. Place the JAR file in `WebContent/WEB-INF/lib/`

### 5. Configure Apache Tomcat

1. In Eclipse, go to Preferences > Server > Runtime Environments
2. Click Add and select Apache Tomcat version
3. Select the Tomcat installation directory
4. Click Apply and Close

### 6. Deploy Application

1. Right-click project > Run As > Run on Server
2. Select Apache Tomcat server
3. Click Finish

The application should now be accessible at: `http://localhost:8080/LibraryManagementSystem/`

## Default Login Credentials

Use these credentials to test the application:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Librarian | librarian1 | lib123 |
| Member | member1 | mem123 |

## Key Functionality

### For Members:
- Browse available books
- Issue books (if available)
- View issued books
- View and manage profile

### For Librarians:
- All member functions
- Add new books to the library
- Edit book information
- View and manage book issues and returns
- Access admin panel

### For Admins:
- All librarian functions
- Delete books
- Manage user accounts
- Access complete admin panel

## API Endpoints

- `POST /login` - User login
- `POST /register` - User registration
- `GET /logout` - User logout
- `GET /books` - View all books
- `POST /issueBook` - Issue a book to user
- `POST /returnBook` - Return an issued book
- `POST /addBook` - Add new book (Admin/Librarian)
- `POST /deleteBook` - Delete a book (Admin)

## Technologies Used

- **Backend**: Java, JSP, Servlets
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: MySQL
- **Server**: Apache Tomcat
- **JDBC**: MySQL Connector/J

## Future Enhancements

- Email notifications for book issues and returns
- Fine management system
- Advanced search and filtering
- Book reservations queue
- User activity logs
- Reports generation
- Integration with Spring Framework
- REST API implementation

## Troubleshooting

### Database Connection Failed
- Ensure MySQL server is running
- Check database credentials in DBConnection.java
- Verify MySQL JDBC driver is in WEB-INF/lib

### JSP Pages Not Loading
- Check if Tomcat is running
- Verify web.xml configuration
- Check browser console for errors

### Servlet Not Found
- Ensure web.xml has correct servlet mappings
- Rebuild the project
- Clear Tomcat work directory and redeploy

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please refer to the code comments or contact the development team.

---

**Last Updated**: January 2026
