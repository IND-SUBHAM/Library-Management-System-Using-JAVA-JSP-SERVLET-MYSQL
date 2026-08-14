<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.library.model.User"%>
<%@ page import="com.library.dao.UserDAO"%>
<%@ page import="java.util.List"%>
<%
    User user = (User) session.getAttribute("user");
    if (user == null || (!user.getRole().equals("admin") && !user.getRole().equals("librarian"))) {
        response.sendRedirect("dashboard.jsp");
        return;
    }

    UserDAO userDAO = new UserDAO();
    List<User> allUsers = userDAO.getAllUsers();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Library Management System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="navbar">
        <div class="nav-container">
            <h2>Library Management System</h2>
            <div class="nav-menu">
                <a href="dashboard.jsp">Dashboard</a>
                <a href="books.jsp">Books</a>
                <% if ("admin".equals(user.getRole()) || "librarian".equals(user.getRole())) { %>
                    <a href="admin.jsp" class="active">Admin</a>
                <% } %>
                <a href="logout" class="btn-logout">Logout</a>
            </div>
        </div>
    </div>

    <div class="admin-container">
        <div class="admin-header">
            <h1>Admin Panel</h1>
            <p>Manage the library system</p>
        </div>

        <div class="admin-tabs">
            <button class="tab-button active" onclick="openTab('books')">Manage Books</button>
            <button class="tab-button" onclick="openTab('users')">Manage Users</button>
            <button class="tab-button" onclick="openTab('issues')">Book Issues</button>
        </div>

        <!-- Manage Books Tab -->
        <div id="books" class="tab-content active">
            <h2>Add New Book</h2>
            <form class="admin-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="author">Author</label>
                        <input type="text" id="author" name="author" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="isbn">ISBN</label>
                        <input type="text" id="isbn" name="isbn">
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <input type="text" id="category" name="category" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="copies">Copies</label>
                        <input type="number" id="copies" name="copies" required>
                    </div>
                    <div class="form-group">
                        <label for="year">Publication Year</label>
                        <input type="number" id="year" name="year">
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Add Book</button>
            </form>
        </div>

        <!-- Manage Users Tab -->
        <div id="users" class="tab-content">
            <h2>Library Users</h2>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <% if (allUsers.isEmpty()) { %>
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 20px;">No users found</td>
                    </tr>
                    <% } else { %>
                        <% for (User libraryUser : allUsers) { %>
                        <tr>
                            <td><%= libraryUser.getUserId() %></td>
                            <td><%= libraryUser.getUsername() %></td>
                            <td><%= libraryUser.getFullName() %></td>
                            <td><%= libraryUser.getEmail() %></td>
                            <td><span class="badge badge-info"><%= libraryUser.getRole().toUpperCase() %></span></td>
                        </tr>
                        <% } %>
                    <% } %>
                </tbody>
            </table>
        </div>

        <!-- Book Issues Tab -->
        <div id="issues" class="tab-content">
            <h2>Book Issues & Returns</h2>
            <%@ page import="com.library.dao.BookDAO" %>
            <%@ page import="com.library.model.BookIssue" %>
            <%@ page import="java.util.List" %>
            <%
                BookDAO bookDAO = new BookDAO();
                List<BookIssue> allIssues = bookDAO.getAllIssues();
            %>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Issue ID</th>
                        <th>User</th>
                        <th>Book</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <% if (allIssues.isEmpty()) { %>
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 20px;">No issues found</td>
                    </tr>
                    <% } else { %>
                        <% for (BookIssue issue : allIssues) { %>
                        <tr>
                            <td><%= issue.getIssueId() %></td>
                            <td><%= issue.getUserName() %></td>
                            <td><%= issue.getBookTitle() %></td>
                            <td><%= issue.getIssueDate() != null ? new java.text.SimpleDateFormat("yyyy-MM-dd").format(issue.getIssueDate()) : "" %></td>
                            <td><%= issue.getDueDate() != null ? issue.getDueDate() : "" %></td>
                            <td><span class="badge <%= "returned".equals(issue.getStatus()) ? "badge-success" : "badge-warning" %>"><%= issue.getStatus().toUpperCase() %></span></td>
                            <td>
                                <% if ("issued".equals(issue.getStatus())) { %>
                                    <button class="btn btn-small btn-danger" onclick="returnBook(<%= issue.getIssueId() %>)">Return</button>
                                <% } %>
                            </td>
                        </tr>
                        <% } %>
                    <% } %>
                </tbody>
            </table>
        </div>
    </div>

    <script src="js/script.js"></script>
    <script>
        function openTab(tabName) {
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => content.classList.remove('active'));
            
            const buttons = document.querySelectorAll('.tab-button');
            buttons.forEach(button => button.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
    </script>
</body>
</html>
