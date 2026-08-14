<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.library.model.User"%>
<%
    User user = (User) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("index.jsp");
        return;
    }
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Library Management System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="navbar">
        <div class="nav-container">
            <h2>Library Management System</h2>
            <div class="nav-menu">
                <a href="books.jsp">Books</a>
                <a href="mybooks.jsp">My Books</a>
                <% if ("admin".equals(user.getRole()) || "librarian".equals(user.getRole())) { %>
                    <a href="admin.jsp">Admin</a>
                <% } %>
                <span class="user-info">Welcome, <%= user.getFullName() %>!</span>
                <a href="logout" class="btn-logout">Logout</a>
            </div>
        </div>
    </div>

    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome to the Library Management System</p>
        </div>

        <div class="dashboard-content">
            <div class="card">
                <h3>Browse Books</h3>
                <p>Explore our collection of books and find your next read.</p>
                <a href="books.jsp" class="btn btn-primary">View Books</a>
            </div>

            <div class="card">
                <h3>My Books</h3>
                <p>View the books you have issued and manage your reservations.</p>
                <a href="mybooks.jsp" class="btn btn-primary">My Books</a>
            </div>

            <% if ("admin".equals(user.getRole()) || "librarian".equals(user.getRole())) { %>
            <div class="card">
                <h3>Manage Library</h3>
                <p>Add, edit, or remove books from the library collection.</p>
                <a href="admin.jsp" class="btn btn-primary">Admin Panel</a>
            </div>
            <% } %>

            <div class="card">
                <h3>Profile</h3>
                <p>View and manage your profile information.</p>
                <a href="profile.jsp" class="btn btn-primary">View Profile</a>
            </div>
        </div>
    </div>
</body>
</html>
