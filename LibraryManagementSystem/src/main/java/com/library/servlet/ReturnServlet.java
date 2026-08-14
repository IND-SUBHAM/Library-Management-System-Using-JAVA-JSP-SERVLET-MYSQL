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

@WebServlet("/returnBook")
public class ReturnServlet extends HttpServlet {
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

        String issueIdStr = request.getParameter("issueId");
        if (issueIdStr == null || issueIdStr.isEmpty()) {
            out.print("{\"success\":false,\"message\":\"Issue ID required\"}");
            out.flush();
            return;
        }

        int issueId;
        try {
            issueId = Integer.parseInt(issueIdStr);
        } catch (NumberFormatException e) {
            out.print("{\"success\":false,\"message\":\"Invalid Issue ID\"}");
            out.flush();
            return;
        }

        boolean success = bookDAO.returnBook(issueId);
        String jsonResponse = success ? 
            "{\"success\":true,\"message\":\"Book returned successfully\"}" : 
            "{\"success\":false,\"message\":\"Failed to return book\"}";
        out.print(jsonResponse);
        out.flush();
    }
}

