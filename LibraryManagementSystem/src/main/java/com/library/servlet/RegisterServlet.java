package com.library.servlet;

import com.library.dao.UserDAO;
import com.library.model.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDAO = new UserDAO();

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String fullName = request.getParameter("fullName");

        User user = new User(username, password, email, fullName, "member");

        if (userDAO.registerUser(user)) {
            request.setAttribute("successMessage", "Registration successful! Please login.");
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } else {
            request.setAttribute("errorMessage", "Registration failed! Username may already exist.");
            request.getRequestDispatcher("register.jsp").forward(request, response);
        }
    }
}
