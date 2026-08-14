<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ page import="com.library.model.User" %>
        <%@ page import="com.library.dao.BookDAO" %>
            <%@ page import="com.library.model.BookIssue" %>
                <%@ page import="java.util.List" %>
                    <% User user=(User) session.getAttribute("user"); if (user==null) {
                        response.sendRedirect("index.jsp"); return; } BookDAO bookDAO=new BookDAO(); List<BookIssue>
                        myIssues = bookDAO.getMyIssues(user.getUserId());
                        %>
                        <!DOCTYPE html>
                        <html>

                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>My Books - Library Management System</title>
                            <link rel="stylesheet" href="css/style.css">
                        </head>

                        <body>
                            <div class="navbar">
                                <div class="nav-container">
                                    <h2>Library Management System</h2>
                                    <div class="nav-menu">
                                        <a href="dashboard.jsp">Dashboard</a>
                                        <a href="books.jsp">Books</a>
                                        <a href="mybooks.jsp" class="active">My Books</a>
                                        <% if ("admin".equals(user.getRole()) || "librarian" .equals(user.getRole())) {
                                            %>
                                            <a href="admin.jsp">Admin</a>
                                            <% } %>
                                                <a href="#" class="btn-logout"
                                                    onclick="confirmLogout(); return false;">Logout</a>
                                    </div>
                                </div>
                            </div>

                            <div class="mybooks-container">
                                <div class="mybooks-header">
                                    <h1>My Books</h1>
                                    <p>Books you have issued</p>
                                </div>

                                <div class="books-table-container">
                                    <table class="books-table">
                                        <thead>
                                            <tr>
                                                <th>Book Title</th>
                                                <th>Issue Date</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <% if (myIssues.isEmpty()) { %>
                                                <tr>
                                                    <td colspan="5" style="text-align: center; padding: 20px;">No books
                                                        issued yet</td>
                                                </tr>
                                                <% } else { %>
                                                    <% for (BookIssue issue : myIssues) { %>
                                                        <tr>
                                                            <td>
                                                                <%= issue.getBookTitle() %>
                                                            </td>
                                                            <td>
                                                                <%= issue.getIssueDate() !=null ? new
                                                                    java.text.SimpleDateFormat("yyyy-MM-dd").format(issue.getIssueDate())
                                                                    : "" %>
                                                            </td>
                                                            <td>
                                                                <%= issue.getDueDate() !=null ? issue.getDueDate() : ""
                                                                    %>
                                                            </td>
                                                            <td>
                                                                <% if ("returned".equals(issue.getStatus())) { %><span
                                                                        class="badge badge-success">RETURNED</span>
                                                                    <% } else if ("overdue".equals(issue.getStatus())) {
                                                                        %><span
                                                                            class="badge badge-danger">OVERDUE</span>
                                                                        <% } else { %><span
                                                                                class="badge badge-warning">ISSUED</span>
                                                                            <% } %>
                                                            </td>
                                                            <td>
                                                                <% if ("issued".equals(issue.getStatus())) { %>
                                                                    <button class="btn btn-small btn-danger"
                                                                        onclick="returnBook(<%= issue.getIssueId() %>)">Return</button>
                                                                    <% } else { %>
                                                                        <span class="status-completed">Returned</span>
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
                        </body>

                        </html>