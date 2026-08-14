<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.library.dao.BookDAO"%>
<%@ page import="com.library.model.Book"%>
<%@ page import="java.util.List"%>
<%@ page import="com.library.model.User"%>
<%
    User user = (User) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("index.jsp");
        return;
    }

    BookDAO bookDAO = new BookDAO();
    List<Book> books = bookDAO.getAllBooks();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Books - Library Management System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="navbar">
        <div class="nav-container">
            <h2>Library Management System</h2>
            <div class="nav-menu">
                <a href="dashboard.jsp">Dashboard</a>
                <a href="books.jsp" class="active">Books</a>
                <a href="mybooks.jsp">My Books</a>
                <% if ("admin".equals(user.getRole()) || "librarian".equals(user.getRole())) { %>
                    <a href="admin.jsp">Admin</a>
                <% } %>
                <a href="logout" class="btn-logout">Logout</a>
            </div>
        </div>
    </div>

    <div class="books-container">
        <div class="books-header">
            <h1>Library Books</h1>
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Search books by title, author or ISBN..." onkeyup="filterBooks()">
            </div>
        </div>

        <div class="books-table-container">
            <table class="books-table" id="booksTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Category</th>
                        <th>Available</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <% for (Book book : books) { %>
                    <tr>
                        <td><%= book.getTitle() %></td>
                        <td><%= book.getAuthor() %></td>
                        <td><%= book.getIsbn() %></td>
                        <td><%= book.getCategory() %></td>
                        <td><%= book.getAvailableCopies() %></td>
                        <td><%= book.getTotalCopies() %></td>
                        <td>
                            <% if (book.getAvailableCopies() > 0) { %>
                                <button class="btn btn-small btn-success" onclick="issueBook(<%= book.getBookId() %>)">Issue</button>
                            <% } else { %>
                                <button class="btn btn-small btn-disabled" disabled>Not Available</button>
                            <% } %>
                        </td>
                    </tr>
                    <% } %>
                </tbody>
            </table>
        </div>
    </div>

    <script src="js/script.js"></script>
    <script>
        function filterBooks() {
            const input = document.getElementById("searchInput");
            const filter = input.value.toUpperCase();
            const table = document.getElementById("booksTable");
            const tr = table.getElementsByTagName("tr");

            for (let i = 1; i < tr.length; i++) {
                const td = tr[i].getElementsByTagName("td");
                let found = false;
                for (let j = 0; j < td.length - 1; j++) {
                    if (td[j]) {
                        const txtValue = td[j].textContent || td[j].innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            found = true;
                            break;
                        }
                    }
                }
                tr[i].style.display = found ? "" : "none";
            }
        }

        function issueBook(bookId) {
            fetch('issueBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'bookId=' + bookId
            })
            .then(response => response.text())
            .then(data => {
                const result = JSON.parse(data);
                if (result.success) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert(result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred');
            });
        }
    </script>
</body>
</html>
