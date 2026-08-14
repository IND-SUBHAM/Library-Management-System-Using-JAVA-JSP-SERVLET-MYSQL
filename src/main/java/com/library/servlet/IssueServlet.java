package com.library.servlet;

import com.library.dao.BookDAO;
import com.library.model.User;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/issueBook")
public class IssueServlet extends HttpServlet {
    private BookDAO bookDAO = new BookDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        User user = (User) request.getSession().getAttribute("user");
        if (user == null) {
            out.print("{\"success\":false,\"message\":\"Please login first\"}");
            out.flush();
            return;
        }

        String bookIdStr = request.getParameter("bookId");
        if (bookIdStr == null || bookIdStr.isEmpty()) {
            out.print("{\"success\":false,\"message\":\"Book ID required\"}");
            out.flush();
            return;
        }

        int bookId;
        try {
            bookId = Integer.parseInt(bookIdStr);
        } catch (NumberFormatException e) {
            out.print("{\"success\":false,\"message\":\"Invalid Book ID\"}");
            out.flush();
            return;
        }

        boolean success = bookDAO.issueBook(user.getUserId(), bookId);
        String jsonResponse = success ? 
            "{\"success\":true,\"message\":\"Book issued successfully\"}" : 
            "{\"success\":false,\"message\":\"Failed to issue book (not available?)\"}";
        out.print(jsonResponse);
        out.flush();
    }
}

