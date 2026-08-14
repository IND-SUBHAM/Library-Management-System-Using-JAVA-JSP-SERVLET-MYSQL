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
    <title>Profile - Library Management System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="navbar">
        <div class="nav-container">
            <h2>Library Management System</h2>
            <div class="nav-menu">
                <a href="dashboard.jsp">Dashboard</a>
                <a href="books.jsp">Books</a>
                <a href="profile.jsp" class="active">Profile</a>
                <a href="logout" class="btn-logout">Logout</a>
            </div>
        </div>
    </div>

    <div class="profile-container">
        <div class="profile-header">
            <h1>My Profile</h1>
        </div>

        <div class="profile-card">
            <div class="profile-info">
                <div class="info-group">
                    <label>Full Name:</label>
                    <span><%= user.getFullName() %></span>
                </div>

                <div class="info-group">
                    <label>Username:</label>
                    <span><%= user.getUsername() %></span>
                </div>

                <div class="info-group">
                    <label>Email:</label>
                    <span><%= user.getEmail() %></span>
                </div>

                <div class="info-group">
                    <label>Role:</label>
                    <span><%= user.getRole().toUpperCase() %></span>
                </div>

                <div class="info-group">
                    <label>Member ID:</label>
                    <span><%= user.getUserId() %></span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
