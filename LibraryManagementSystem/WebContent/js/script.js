// Library Management System - JavaScript Functions

function normalizeBook(book) {
    const totalCopies = Number(book.copies ?? book.totalCopies ?? 0);
    const rawAvailable = book.availableCopies ?? book.available ?? totalCopies;
    const availableCopies = Math.max(0, Math.min(Number(rawAvailable), totalCopies));

    return {
        ...book,
        copies: totalCopies,
        availableCopies: availableCopies
    };
}

function getDefaultBooks() {
    return [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publisher: 'Scribner', category: 'Fiction', copies: 5, availableCopies: 5, isbn: '978-0-7432-7356-5', year: 1925 },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publisher: 'Lippincott', category: 'Fiction', copies: 4, availableCopies: 4, isbn: '978-0-06-112008-4', year: 1960 },
        { id: 3, title: '1984', author: 'George Orwell', publisher: 'Signet', category: 'Dystopian', copies: 3, availableCopies: 3, isbn: '978-0-451-52493-2', year: 1949 },
        { id: 4, title: 'Java Programming', author: 'Herbert Schildt', publisher: 'McGraw-Hill', category: 'Technology', copies: 5, availableCopies: 5, isbn: '978-0-07-180556-8', year: 2018 },
        { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', publisher: 'Little Brown', category: 'Fiction', copies: 3, availableCopies: 3, isbn: '978-0-316-76948-0', year: 1951 }
    ];
}

function getStoredBooks() {
    const storedBooks = JSON.parse(localStorage.getItem('adminBooks'));
    const books = (storedBooks && storedBooks.length ? storedBooks : getDefaultBooks()).map(normalizeBook);
    localStorage.setItem('adminBooks', JSON.stringify(books));
    return books;
}

function setStoredBooks(books) {
    localStorage.setItem('adminBooks', JSON.stringify(books.map(normalizeBook)));
}

function getIssuedBooksStorageKey(user) {
    if (!user) {
        return 'issuedBooks';
    }

    const userIdentifier = user.username || user.email || user.fullName || 'guest';
    return `issuedBooks_${userIdentifier}`;
}

function getCurrentUserIssuedBooks() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const storageKey = getIssuedBooksStorageKey(loggedInUser);
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function setCurrentUserIssuedBooks(issuedBooks) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const storageKey = getIssuedBooksStorageKey(loggedInUser);
    localStorage.setItem(storageKey, JSON.stringify(issuedBooks));
}

function getBookIssueHistory() {
    return JSON.parse(localStorage.getItem('bookIssueHistory')) || [];
}

function setBookIssueHistory(issueHistory) {
    localStorage.setItem('bookIssueHistory', JSON.stringify(issueHistory));
}

function generateIssueId() {
    const issueHistory = getBookIssueHistory();
    if (issueHistory.length === 0) {
        return 1;
    }

    return Math.max(...issueHistory.map(issue => Number(issue.issueId) || 0)) + 1;
}

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function seedSampleUsers() {
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const sampleUsers = [
        {
            fullName: 'Biswagat M Bairagi',
            email: 'djsubham774@gmail.com',
            username: 'Biswagat',
            password: 'subham123',
            role: 'admin'
        },
        {
            fullName: 'System Administrator',
            email: 'admin@library.com',
            username: 'admin',
            password: 'admin123',
            role: 'admin'
        },
        {
            fullName: 'Librarian One',
            email: 'librarian@library.com',
            username: 'librarian1',
            password: 'lib123',
            role: 'librarian'
        },
        {
            fullName: 'Member One',
            email: 'member1@library.com',
            username: 'member1',
            password: 'mem123',
            role: 'member'
        }
    ];

    sampleUsers.forEach(sample => {
        const existing = users.find(u => u.username === sample.username);
        if (existing) {
            existing.fullName = sample.fullName;
            existing.email = sample.email;
            existing.password = sample.password;
            existing.role = sample.role;
        } else {
            users.push(sample);
        }
    });

    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Handle Login Form Submit
function handleLogin(event) {
    event.preventDefault();
    
    if (!validateLoginForm()) {
        return;
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get registered users from localStorage
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('loggedIn', 'true');
        showAlert('Login successful! Welcome ' + user.fullName, 'success');
        setTimeout(function() { window.location.href = 'dashboard.html'; }, 1000);
    } else {
        showAlert('Invalid username or password', 'danger');
    }
}

// Handle Register Form Submit
function handleRegister(event) {
    event.preventDefault();
    
    if (!validateRegisterForm()) {
        return;
    }

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get existing registered users
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        showAlert('Username already exists! Please choose a different username.', 'danger');
        return;
    }

    // Create new user object
    const newUser = {
        fullName: fullName,
        email: email,
        username: username,
        password: password,
        role: 'Member' // Default role for new registrations
    };

    // Add user to array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    showAlert('Registration successful! You can now login with your credentials.', 'success');
    setTimeout(function() { window.location.href = 'login.html'; }, 1200);
}

// Form Validation
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        showAlert('Please fill in all fields', 'danger');
        return false;
    }
    return true;
}

function validateRegisterForm() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (fullName.trim() === '' || email.trim() === '' || username.trim() === '' || password.trim() === '') {
        showAlert('Please fill in all fields', 'danger');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return false;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'danger');
        return false;
    }

    return true;
}

// Handle Add Book Form Submit
function handleAddBook(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const category = document.getElementById('category').value;
    const copies = document.getElementById('copies').value;
    const year = document.getElementById('year').value;

    if (!title || !author || !category || !copies) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }

    // Get existing books or create new array
    let books = getStoredBooks();
    
    // Generate book ID
    const bookId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    
    // Create new book object
    const newBook = {
        id: bookId,
        title: title,
        author: author,
        isbn: isbn,
        category: category,
        copies: parseInt(copies),
        availableCopies: parseInt(copies),
        year: year ? parseInt(year) : new Date().getFullYear()
    };
    
    // Add book to array
    books.push(newBook);
    
    // Save to localStorage
    setStoredBooks(books);
    
    showAlert('Book added successfully!', 'success');
    event.target.reset();
    
    // Refresh the books list if the function exists
    if (typeof displayBooks === 'function') {
        displayBooks();
    }
}

// Tab Switching
function openTab(event, tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    const tabContent = document.getElementById(tabName);
    if (tabContent) {
        tabContent.classList.add('active');

        requestAnimationFrame(() => {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetTop = tabContent.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
            window.scrollTo({
                top: Math.max(targetTop, 0),
                behavior: 'smooth'
            });
        });
    }

    event.target.classList.add('active');
}

// Search/Filter
function filterBooks() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('booksTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td');
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
        tr[i].style.display = found ? '' : 'none';
    }
}

// Alert Notifications
function showAlert(message, type) {
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = `notification ${type === 'success' ? 'success' : 'error'}`;

    // Build card
    const card = document.createElement('div');
    card.className = 'notification-card';

    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    const iconI = document.createElement('i');
    iconI.className = type === 'success' ? 'fas fa-check' : 'fas fa-times';
    icon.appendChild(iconI);

    const body = document.createElement('div');
    body.className = 'notification-body';
    const title = document.createElement('h3');
    title.textContent = type === 'success' ? 'Success!' : 'Error!';
    const text = document.createElement('p');
    text.textContent = message;
    body.appendChild(title);
    body.appendChild(text);

    card.appendChild(icon);
    card.appendChild(body);
    wrapper.appendChild(card);

    // Append and auto-remove
    document.body.appendChild(wrapper);
    setTimeout(() => wrapper.remove(), 5000);
}

// Confirmation dialog using notification card
function showConfirm(message, onConfirm, titleText, onCancel) {
    const wrapper = document.createElement('div');
    wrapper.className = 'notification confirm';

    const card = document.createElement('div');
    card.className = 'notification-card';

    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    const iconI = document.createElement('i');
    iconI.className = 'fas fa-question';
    icon.appendChild(iconI);

    const body = document.createElement('div');
    body.className = 'notification-body';
    const title = document.createElement('h3');
    title.textContent = titleText || 'Confirm';
    const text = document.createElement('p');
    text.textContent = message;
    body.appendChild(title);
    body.appendChild(text);

    const actions = document.createElement('div');
    actions.className = 'notification-actions';

    const btnCancel = document.createElement('button');
    btnCancel.className = 'btn';
    btnCancel.textContent = 'Cancel';
    btnCancel.onclick = () => {
        if (onCancel) {
            try { onCancel(); } catch (e) { console.error(e); }
        }
        wrapper.remove();
    };

    const btnYes = document.createElement('button');
    btnYes.className = 'btn btn-primary';
    btnYes.textContent = 'Yes';
    btnYes.onclick = () => {
        try { onConfirm(); } catch (e) { console.error(e); }
        wrapper.remove();
    };

    actions.appendChild(btnCancel);
    actions.appendChild(btnYes);
    body.appendChild(actions);

    card.appendChild(icon);
    card.appendChild(body);
    wrapper.appendChild(card);
    document.body.appendChild(wrapper);
}

// Book Operations
function issueBook(bookId) {
    showConfirm('Do you want to issue this book?', function() {
        // Make AJAX call to issue book
        fetch('issueBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'bookId=' + bookId
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Book issued successfully!', 'success');
                location.reload();
            } else {
                showAlert('Failed to issue book', 'danger');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred', 'danger');
        });
    });
}

function returnBook(issueId) {
    showConfirm('Do you want to return this book?', function() {
        // Make AJAX call to return book
        fetch('returnBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'issueId=' + issueId
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Book returned successfully!', 'success');
                location.reload();
            } else {
                showAlert('Failed to return book', 'danger');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred', 'danger');
        });
    });
}

// Admin Functions
function deleteBook(bookId) {
    showConfirm('Are you sure you want to delete this book?', function() {
        fetch('deleteBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'bookId=' + bookId
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Book deleted successfully!', 'success');
                location.reload();
            } else {
                showAlert('Failed to delete book', 'danger');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred', 'danger');
        });
    });
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const category = document.getElementById('category').value;
    const copies = document.getElementById('copies').value;
    const year = document.getElementById('year').value;

    if (!title || !author || !category || !copies) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('category', category);
    formData.append('copies', copies);
    formData.append('year', year);

    fetch('addBook', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Book added successfully!', 'success');
            document.querySelector('.admin-form').reset();
            setTimeout(() => location.reload(), 1000);
        } else {
            showAlert('Failed to add book', 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred', 'danger');
    });
}

// Local HTML-only issue flow. Kept separate from the server-backed issueBook(bookId).
function issueBookLocally(bookId, bookTitle) {
    showConfirm(`Do you want to issue "${bookTitle}"?`, function() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            showAlert('Please login first', 'danger');
            window.location.href = 'login.html';
            return;
        }

        const books = getStoredBooks();
        const bookIndex = books.findIndex(book => Number(book.id) === Number(bookId));
        if (bookIndex === -1) {
            showAlert('Book not found', 'danger');
            return;
        }

        const selectedBook = books[bookIndex];
        if (selectedBook.availableCopies <= 0) {
            showAlert('This book is not available right now', 'danger');
            return;
        }

        const issueDate = new Date().toISOString().split('T')[0];
        const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const issueId = generateIssueId();
        
        // Store issued books per user so one account never sees another account's history.
        let issuedBooks = getCurrentUserIssuedBooks();
        issuedBooks.push({
            issueId: issueId,
            bookId: bookId,
            title: bookTitle,
            issueDate: issueDate,
            dueDate: dueDate,
            status: 'Active'
        });
        setCurrentUserIssuedBooks(issuedBooks);

        const issueHistory = getBookIssueHistory();
        issueHistory.push({
            issueId: issueId,
            username: loggedInUser.username || 'N/A',
            fullName: loggedInUser.fullName || loggedInUser.username || 'Unknown User',
            role: loggedInUser.role || 'member',
            bookId: bookId,
            title: bookTitle,
            issueDate: issueDate,
            dueDate: dueDate,
            returnDate: '',
            status: 'Issued'
        });
        setBookIssueHistory(issueHistory);

        books[bookIndex].availableCopies -= 1;
        setStoredBooks(books);
        
        showAlert(`Book issued successfully! Due Date: ${dueDate}`, 'success');
        setTimeout(function() { window.location.href = 'mybooks.html'; }, 1000);
    });
}

// Logout Confirmation
function confirmLogout() {
    showConfirm('Are you sure you want to logout?', function() {
        // Clear session data
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedIn');
        
        // Show success modal
        showLogoutSuccess();
    }, 'Logout');
}

// Show Logout Success Modal
function showLogoutSuccess() {
    console.log('showLogoutSuccess called');
    // Try to find existing modal in DOM
    let modal = document.getElementById('logoutModal');
    
    if (!modal) {
        // Create modal if it doesn't exist
        modal = document.createElement('div');
        modal.id = 'logoutModal';
        modal.className = 'logout-modal active';
        modal.setAttribute('style', 'display: flex !important;');
        
        const card = document.createElement('div');
        card.className = 'logout-modal-card';
        
        card.innerHTML = `
            <div class="logout-modal-icon"><i class="fas fa-check"></i></div>
            <h2>Logout Successful</h2>
            <p>You have been successfully logged out. Thank you for visiting! We hope to see you again soon, simply log back in</p>
            <button class="btn" onclick="window.location.href='login.html'" style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); color: white; padding: 12px 28px; border-radius: 8px; font-weight: 600; border: none; cursor: pointer;">Log In Again →</button>
        `;
        
        modal.appendChild(card);
        document.body.appendChild(modal);
    } else {
        // Show existing modal
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
    
    console.log('Logout modal displayed');
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function getStatusBadgeClass(status) {
    switch(status) {
        case 'issued':
            return 'badge-warning';
        case 'returned':
            return 'badge-success';
        case 'overdue':
            return 'badge-danger';
        default:
            return 'badge-info';
    }
}

function syncNavbarOffset() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
        document.body.classList.remove('has-navbar');
        document.documentElement.style.removeProperty('--navbar-height');
        return;
    }

    document.body.classList.add('has-navbar');
    document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
}

window.addEventListener('resize', syncNavbarOffset);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    seedSampleUsers();
    syncNavbarOffset();
    console.log('Library Management System loaded');
});

