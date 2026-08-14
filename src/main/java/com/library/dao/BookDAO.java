package com.library.dao;

import com.library.model.Book;
import com.library.model.BookIssue;
import com.library.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class BookDAO {

    public boolean addBook(Book book) {
        String query = "INSERT INTO books (title, author, isbn, category, publisher, publication_year, total_copies, available_copies) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, book.getTitle());
            stmt.setString(2, book.getAuthor());
            stmt.setString(3, book.getIsbn());
            stmt.setString(4, book.getCategory());
            stmt.setString(5, book.getPublisher());
            stmt.setInt(6, book.getPublicationYear());
            stmt.setInt(7, book.getTotalCopies());
            stmt.setInt(8, book.getAvailableCopies());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                Book book = new Book();
                book.setBookId(rs.getInt("book_id"));
                book.setTitle(rs.getString("title"));
                book.setAuthor(rs.getString("author"));
                book.setIsbn(rs.getString("isbn"));
                book.setCategory(rs.getString("category"));
                book.setPublisher(rs.getString("publisher"));
                book.setPublicationYear(rs.getInt("publication_year"));
                book.setTotalCopies(rs.getInt("total_copies"));
                book.setAvailableCopies(rs.getInt("available_copies"));
                books.add(book);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }

    public Book getBookById(int bookId) {
        String query = "SELECT * FROM books WHERE book_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, bookId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Book book = new Book();
                book.setBookId(rs.getInt("book_id"));
                book.setTitle(rs.getString("title"));
                book.setAuthor(rs.getString("author"));
                book.setIsbn(rs.getString("isbn"));
                book.setCategory(rs.getString("category"));
                book.setPublisher(rs.getString("publisher"));
                book.setPublicationYear(rs.getInt("publication_year"));
                book.setTotalCopies(rs.getInt("total_copies"));
                book.setAvailableCopies(rs.getInt("available_copies"));
                return book;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Book> searchBooks(String keyword) {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            String searchKeyword = "%" + keyword + "%";
            stmt.setString(1, searchKeyword);
            stmt.setString(2, searchKeyword);
            stmt.setString(3, searchKeyword);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Book book = new Book();
                book.setBookId(rs.getInt("book_id"));
                book.setTitle(rs.getString("title"));
                book.setAuthor(rs.getString("author"));
                book.setIsbn(rs.getString("isbn"));
                book.setCategory(rs.getString("category"));
                book.setPublisher(rs.getString("publisher"));
                book.setPublicationYear(rs.getInt("publication_year"));
                book.setTotalCopies(rs.getInt("total_copies"));
                book.setAvailableCopies(rs.getInt("available_copies"));
                books.add(book);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }

    public boolean updateBook(Book book) {
        String query = "UPDATE books SET title = ?, author = ?, category = ?, publisher = ?, " +
                "publication_year = ?, total_copies = ?, available_copies = ? WHERE book_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, book.getTitle());
            stmt.setString(2, book.getAuthor());
            stmt.setString(3, book.getCategory());
            stmt.setString(4, book.getPublisher());
            stmt.setInt(5, book.getPublicationYear());
            stmt.setInt(6, book.getTotalCopies());
            stmt.setInt(7, book.getAvailableCopies());
            stmt.setInt(8, book.getBookId());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteBook(int bookId) {
        String query = "DELETE FROM books WHERE book_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, bookId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean issueBook(int userId, int bookId) {
        Connection conn = null;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false);
            
            // Check available copies
            String checkQuery = "SELECT available_copies FROM books WHERE book_id = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkQuery);
            checkStmt.setInt(1, bookId);
            ResultSet rs = checkStmt.executeQuery();
            if (!rs.next() || rs.getInt("available_copies") <= 0) {
                return false;
            }
            
            // Insert issue record (due_date = 14 days)
            String issueQuery = "INSERT INTO book_issues (user_id, book_id, due_date, status) VALUES (?, ?, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'issued')";
            PreparedStatement issueStmt = conn.prepareStatement(issueQuery);
            issueStmt.setInt(1, userId);
            issueStmt.setInt(2, bookId);
            issueStmt.executeUpdate();
            
            // Decrement available copies
            String updateQuery = "UPDATE books SET available_copies = available_copies - 1 WHERE book_id = ?";
            PreparedStatement updateStmt = conn.prepareStatement(updateQuery);
            updateStmt.setInt(1, bookId);
            updateStmt.executeUpdate();
            
            conn.commit();
            return true;
        } catch (SQLException e) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) { ex.printStackTrace(); }
            }
            e.printStackTrace();
            return false;
        } finally {
            if (conn != null) {
                try { conn.setAutoCommit(true); conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        }
    }

    public boolean returnBook(int issueId) {
        Connection conn = null;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false);
            
            // Verify issue exists and get book_id
            String selectQuery = "SELECT book_id FROM book_issues WHERE issue_id = ? AND status = 'issued'";
            PreparedStatement selectStmt = conn.prepareStatement(selectQuery);
            selectStmt.setInt(1, issueId);
            ResultSet rs = selectStmt.executeQuery();
            if (!rs.next()) {
                return false;
            }
            int bookId = rs.getInt("book_id");
            
            // Update issue status
            String updateIssueQuery = "UPDATE book_issues SET status = 'returned', return_date = CURDATE() WHERE issue_id = ?";
            PreparedStatement updateIssueStmt = conn.prepareStatement(updateIssueQuery);
            updateIssueStmt.setInt(1, issueId);
            updateIssueStmt.executeUpdate();
            
            // Increment available copies
            String updateBookQuery = "UPDATE books SET available_copies = available_copies + 1 WHERE book_id = ?";
            PreparedStatement updateBookStmt = conn.prepareStatement(updateBookQuery);
            updateBookStmt.setInt(1, bookId);
            updateBookStmt.executeUpdate();
            
            conn.commit();
            return true;
        } catch (SQLException e) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) { ex.printStackTrace(); }
            }
            e.printStackTrace();
            return false;
        } finally {
            if (conn != null) {
                try { conn.setAutoCommit(true); conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        }
    }

    public List<BookIssue> getMyIssues(int userId) {
        List<BookIssue> issues = new ArrayList<>();
        String query = """
            SELECT bi.issue_id, bi.user_id, u.full_name as user_name, bi.book_id, b.title as book_title,
                   bi.issue_date, bi.due_date, bi.return_date, bi.status
            FROM book_issues bi
            JOIN users u ON bi.user_id = u.user_id
            JOIN books b ON bi.book_id = b.book_id
            WHERE bi.user_id = ? 
            ORDER BY bi.issue_date DESC
            """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                BookIssue issue = new BookIssue();
                issue.setIssueId(rs.getInt("issue_id"));
                issue.setUserId(rs.getInt("user_id"));
                issue.setUserName(rs.getString("user_name"));
                issue.setBookId(rs.getInt("book_id"));
                issue.setBookTitle(rs.getString("book_title"));
                issue.setIssueDate(rs.getTimestamp("issue_date"));
                issue.setDueDate(rs.getDate("due_date"));
                issue.setReturnDate(rs.getDate("return_date"));
                issue.setStatus(rs.getString("status"));
                issues.add(issue);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return issues;
    }

    public List<BookIssue> getAllIssues() {
        List<BookIssue> issues = new ArrayList<>();
        String query = """
            SELECT bi.issue_id, bi.user_id, u.full_name as user_name, bi.book_id, b.title as book_title,
                   bi.issue_date, bi.due_date, bi.return_date, bi.status
            FROM book_issues bi
            JOIN users u ON bi.user_id = u.user_id
            JOIN books b ON bi.book_id = b.book_id
            ORDER BY bi.issue_date DESC
            """;
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                BookIssue issue = new BookIssue();
                issue.setIssueId(rs.getInt("issue_id"));
                issue.setUserId(rs.getInt("user_id"));
                issue.setUserName(rs.getString("user_name"));
                issue.setBookId(rs.getInt("book_id"));
                issue.setBookTitle(rs.getString("book_title"));
                issue.setIssueDate(rs.getTimestamp("issue_date"));
                issue.setDueDate(rs.getDate("due_date"));
                issue.setReturnDate(rs.getDate("return_date"));
                issue.setStatus(rs.getString("status"));
                issues.add(issue);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return issues;
    }
}

