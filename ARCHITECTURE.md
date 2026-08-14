# Architecture & System Design

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         WEB BROWSER                              │
│                    (Client - User Interface)                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  HTML Pages (JSP) + CSS Styling + JavaScript Validation   ││
│  │  ├─ Login Page                                             ││
│  │  ├─ Dashboard                                              ││
│  │  ├─ Books Listing                                          ││
│  │  └─ Admin Panel                                            ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ HTTP/HTTPS
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│              APACHE TOMCAT WEB SERVER (Port: 8080)              │
│              Application Server & Request Handler               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Servlet Container                              ││
│  │  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ││
│  │  │   Login      │   │  Register    │   │  Logout      │   ││
│  │  │  Servlet     │   │  Servlet     │   │  Servlet     │   ││
│  │  └──────────────┘   └──────────────┘   └──────────────┘   ││
│  │         ↓                ↓                   ↓              ││
│  │  ┌──────────────────────────────────────────────────────┐  ││
│  │  │        Session Management (HttpSession)             │  ││
│  │  │  - User authentication                              │  ││
│  │  │  - Role-based access control                        │  ││
│  │  │  - Session timeout (30 mins)                        │  ││
│  │  └──────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Business Logic Layer (Servlets)                ││
│  │  ┌──────────────────────────────────────────────────────┐  ││
│  │  │  com.library.servlet.*                               │  ││
│  │  │  - Request routing                                   │  ││
│  │  │  - Request parameter handling                        │  ││
│  │  │  - Response generation                              │  ││
│  │  └──────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Data Access Layer (DAO)                        ││
│  │  ┌──────────────────┐        ┌──────────────────┐          ││
│  │  │    UserDAO       │        │    BookDAO       │          ││
│  │  ├──────────────────┤        ├──────────────────┤          ││
│  │  │+ login()         │        │+ getAllBooks()   │          ││
│  │  │+ register()      │        │+ getBookById()   │          ││
│  │  │+ getUserById()   │        │+ searchBooks()   │          ││
│  │  │                  │        │+ addBook()       │          ││
│  │  │                  │        │+ updateBook()    │          ││
│  │  │                  │        │+ deleteBook()    │          ││
│  │  └──────────────────┘        └──────────────────┘          ││
│  └─────────────────────────────────────────────────────────────┘│
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Database Connection Layer                      ││
│  │  ┌──────────────────────────────────────────────────────┐  ││
│  │  │  DBConnection.java                                   │  ││
│  │  │  - JDBC Connection pooling                          │  ││
│  │  │  - MySQL driver loading                             │  ││
│  │  │  - Connection lifecycle management                  │  ││
│  │  │  - SQL PreparedStatement usage                      │  ││
│  │  └──────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ JDBC
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│              MYSQL DATABASE SERVER (Port: 3306)                 │
│              Data Storage & Persistence Layer                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  Database: library_db                        ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐     ││
│  │  │   users     │  │   books     │  │  book_issues    │     ││
│  │  ├─────────────┤  ├─────────────┤  ├─────────────────┤     ││
│  │  │ user_id (PK)│  │ book_id (PK)│  │ issue_id (PK)   │     ││
│  │  │ username    │  │ title       │  │ user_id (FK)    │     ││
│  │  │ password    │  │ author      │  │ book_id (FK)    │     ││
│  │  │ email       │  │ isbn        │  │ issue_date      │     ││
│  │  │ full_name   │  │ category    │  │ due_date        │     ││
│  │  │ role        │  │ publisher   │  │ return_date     │     ││
│  │  │ created_at  │  │ total_copies│  │ status          │     ││
│  │  │             │  │ available   │  │                 │     ││
│  │  │             │  │ description │  │                 │     ││
│  │  └─────────────┘  └─────────────┘  └─────────────────┘     ││
│  │  ┌────────────────────────────────────────────────────┐    ││
│  │  │          reservations                              │    ││
│  │  ├────────────────────────────────────────────────────┤    ││
│  │  │ reservation_id (PK), user_id (FK), book_id (FK)    │    ││
│  │  │ reservation_date, status                           │    ││
│  │  └────────────────────────────────────────────────────┘    ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## MVC Architecture Implementation

```
┌──────────────────────────────────────────────────────────────────┐
│                    MODEL-VIEW-CONTROLLER PATTERN                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  VIEW LAYER (Presentation)                                       │
│  ├─ JSP Pages                                                    │
│  │  ├─ index.jsp (Login Form)                                   │
│  │  ├─ register.jsp (Registration Form)                         │
│  │  ├─ dashboard.jsp (Dashboard View)                           │
│  │  ├─ books.jsp (Books List View)                              │
│  │  └─ admin.jsp (Admin Interface)                              │
│  │                                                               │
│  ├─ Static Resources                                             │
│  │  ├─ css/style.css (Styling)                                  │
│  │  └─ js/script.js (Client-side Validation)                    │
│  │                                                               │
│  └─ Rendered Output: HTML + CSS + JavaScript                    │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  CONTROLLER LAYER (Request Handling)                             │
│  ├─ Servlets                                                     │
│  │  ├─ LoginServlet                                              │
│  │  │  └─ Handles: POST /login                                  │
│  │  ├─ RegisterServlet                                           │
│  │  │  └─ Handles: POST /register                               │
│  │  └─ LogoutServlet                                             │
│  │     └─ Handles: GET /logout                                  │
│  │                                                               │
│  └─ Flow:                                                        │
│     Request → Servlet (route) → DAO (process) → View (render)  │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  MODEL LAYER (Data & Business Logic)                             │
│  ├─ Entity Models                                                │
│  │  ├─ User.java (Properties: id, name, email, role)           │
│  │  └─ Book.java (Properties: id, title, author, copies)       │
│  │                                                               │
│  ├─ Data Access Objects (DAO)                                   │
│  │  ├─ UserDAO.java                                             │
│  │  │  ├─ loginUser()                                           │
│  │  │  ├─ registerUser()                                        │
│  │  │  └─ getUserById()                                         │
│  │  │                                                           │
│  │  └─ BookDAO.java                                             │
│  │     ├─ getAllBooks()                                         │
│  │     ├─ searchBooks()                                         │
│  │     ├─ addBook()                                             │
│  │     ├─ updateBook()                                          │
│  │     └─ deleteBook()                                          │
│  │                                                               │
│  └─ Database Connection                                          │
│     └─ DBConnection.java (JDBC Management)                      │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### User Login Flow
```
User Browser
     │
     ├─ Enter credentials (username, password)
     │
     ↓
HTTP POST to /login
     │
     ↓
LoginServlet
     │
     ├─ Extract parameters
     │
     ↓
UserDAO.loginUser()
     │
     ├─ Execute SQL query
     │
     ↓
MySQL Database (users table)
     │
     ├─ Compare credentials
     │
     ↓
Return User object or null
     │
     ↓
LoginServlet
     │
     ├─ If valid:
     │  ├─ Create Session
     │  ├─ Store user in session
     │  ├─ Redirect to dashboard.jsp
     │
     ├─ If invalid:
     │  ├─ Set error message
     │  ├─ Forward to index.jsp
     │
     ↓
View rendered HTML to browser
```

### Book Search Flow
```
User Browser
     │
     ├─ Enter search keyword
     │
     ↓
JavaScript: filterBooks()
     │
     ├─ Filter DOM elements
     │
     ↓
Show/Hide matching rows
     │
     ↓
Display filtered results
```

---

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────┐
│ Frontend (HTML/CSS/JS)                                   │
│ ┌───────────────────────────────────────────────────────┐│
│ │ index.jsp ←→ LoginServlet ←→ UserDAO ←→ MySQL        ││
│ └───────────────────────────────────────────────────────┘│
│                                                          │
│ ┌───────────────────────────────────────────────────────┐│
│ │ books.jsp ←→ BookDAO ←→ MySQL                         ││
│ └───────────────────────────────────────────────────────┘│
│                                                          │
│ ┌───────────────────────────────────────────────────────┐│
│ │ admin.jsp ←→ BookDAO/UserDAO ←→ MySQL                ││
│ └───────────────────────────────────────────────────────┘│
│                                                          │
│ ┌───────────────────────────────────────────────────────┐│
│ │ Session Management (HttpSession)                      ││
│ │ └─ Stores: user, userId, role                        ││
│ └───────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│          Development Environment                 │
│  ├─ IDE: Eclipse/IntelliJ                       │
│  ├─ Java Compiler                               │
│  └─ Local Tomcat Server                         │
└─────────────────────────────────────────────────┘
              ↓ (Build & Deploy)
┌─────────────────────────────────────────────────┐
│          Production Environment                  │
│  ┌─────────────────────────────────────────────┐│
│  │ Production Server                            ││
│  │ ├─ Apache Tomcat 9.0                         ││
│  │ ├─ Java Runtime Environment                  ││
│  │ └─ Application Instance                      ││
│  └─────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────┐│
│  │ Database Server                              ││
│  │ ├─ MySQL 5.7/8.0                            ││
│  │ ├─ Database: library_db                      ││
│  │ └─ Backup & Recovery Setup                   ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────┐
│              SECURITY LAYERS                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Layer 1: AUTHENTICATION                            │
│  ├─ Username/Password validation                   │
│  ├─ Session creation                               │
│  └─ Login attempt tracking                         │
│                                                     │
│ Layer 2: AUTHORIZATION                             │
│  ├─ Role-based access control (RBAC)              │
│  ├─ User roles: Admin, Librarian, Member          │
│  └─ Feature access control                         │
│                                                     │
│ Layer 3: DATA PROTECTION                           │
│  ├─ SQL Injection prevention (PreparedStatement)  │
│  ├─ Input validation                               │
│  └─ Error handling                                 │
│                                                     │
│ Layer 4: SESSION MANAGEMENT                        │
│  ├─ HttpSession with 30-min timeout               │
│  ├─ Secure session cookies                         │
│  └─ Session invalidation on logout                │
│                                                     │
│ Layer 5: FUTURE ENHANCEMENTS                       │
│  ├─ Password hashing (BCrypt)                      │
│  ├─ CSRF token implementation                      │
│  ├─ SSL/TLS encryption                             │
│  └─ Two-factor authentication                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Technology Stack Overview

```
┌───────────────────┐
│    Browser        │
│  (Any modern)     │
└────────┬──────────┘
         │
    ┌────▼─────────────────────────────┐
    │   Frontend Technology             │
    ├──────────────────────────────────┤
    │ • HTML5                           │
    │ • CSS3 (Responsive Design)        │
    │ • JavaScript (Vanilla)            │
    └────┬──────────────────────────────┘
         │
    ┌────▼─────────────────────────────┐
    │   Web Server / Application Server │
    ├──────────────────────────────────┤
    │ • Apache Tomcat 9.0              │
    │ • Port: 8080                     │
    │ • Servlet Container              │
    └────┬──────────────────────────────┘
         │
    ┌────▼─────────────────────────────┐
    │   Backend Technology              │
    ├──────────────────────────────────┤
    │ • Java (JDK 8+)                  │
    │ • JSP/Servlets                   │
    │ • JDBC                           │
    │ • MVC Architecture               │
    └────┬──────────────────────────────┘
         │
    ┌────▼─────────────────────────────┐
    │   Database Technology             │
    ├──────────────────────────────────┤
    │ • MySQL 5.7/8.0                  │
    │ • Port: 3306                     │
    │ • 4 Tables with relationships    │
    └───────────────────────────────────┘
```

---

## Page Load & Rendering Flow

```
1. User Request
   └─ Browser sends HTTP request

2. Servlet Processing
   ├─ Tomcat receives request
   ├─ Routes to appropriate Servlet
   ├─ Servlet processes request
   └─ Calls appropriate DAO method

3. Database Query
   ├─ DAO builds SQL query
   ├─ Executes via JDBC
   ├─ MySQL processes query
   └─ Returns ResultSet

4. Object Mapping
   ├─ DAO maps ResultSet to Model objects
   ├─ Creates List/Object instances
   └─ Returns to Servlet

5. JSP Rendering
   ├─ Servlet forwards to JSP
   ├─ JSP processes model data
   ├─ Generates HTML with CSS
   └─ Adds JavaScript functionality

6. HTTP Response
   ├─ Tomcat prepares response
   ├─ Sets headers
   ├─ Sends HTML to browser
   └─ Browser renders page

7. Client-side Processing
   ├─ HTML rendered
   ├─ CSS applied
   ├─ JavaScript initialized
   └─ Page interactive
```

---

## System Requirements & Specifications

```
Minimum Requirements:
├─ RAM: 2 GB
├─ Storage: 1 GB available
├─ Java: JDK 8+
├─ Tomcat: 8.5+
├─ MySQL: 5.7+
└─ Browser: Modern (Chrome, Firefox, Edge, Safari)

Recommended:
├─ RAM: 4 GB+
├─ Storage: 5 GB available
├─ Java: JDK 11 LTS or 17 LTS
├─ Tomcat: 9.0+
├─ MySQL: 8.0+
└─ Browser: Latest version
```

---

**Architecture designed for scalability, maintainability, and security.**

Last Updated: January 2026
