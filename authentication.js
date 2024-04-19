const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Dummy user database
const users = [];

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Check if username already exists
        if (users.some(user => user.username === username)) {
            return res.status(400).send('Username already exists.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = {
            username: username,
            password: hashedPassword
        };

        // Add the new user to the database
        users.push(newUser);

        // Send success response
        res.status(201).send('User registered successfully.');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





// const express = require('express');
// const session = require('express-session');
// const bcrypt = require('bcrypt');

// const app = express();
// const PORT = 3000;

// // Middleware for parsing JSON requests
// app.use(express.json());

// // Middleware for session management
// app.use(session({
//     secret: 'secret_key',
//     resave: false,
//     saveUninitialized: true
// }));

// // Dummy user database
// const users = [];

// // User registration endpoint
// app.post('/register', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = { username: req.body.username, password: hashedPassword };
//         users.push(user);
//         res.status(201).send('User registered successfully.');
//     } catch {
//         res.status(500).send('Error registering user.');
//     }
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//     const user = users.find(user => user.username === req.body.username);
//     if (user == null) {
//         return res.status(400).send('User not found.');
//     }
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             req.session.user = user;
//             res.send('Login successful.');
//         } else {
//             res.status(401).send('Incorrect password.');
//         }
//     } catch {
//         res.status(500).send('Error logging in.');
//     }
// });

// // Protected endpoint
// app.get('/protected', (req, res) => {
//     if (req.session.user) {
//         res.send('Protected resource.');
//     } else {
//         res.status(401).send('Unauthorized.');
//     }
// });

// app.get('/', (req, res) => {
//     res.send('Server is running.');
// });


// // Logout endpoint
// app.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             res.status(500).send('Error logging out.');
//         } else {
//             res.send('Logout successful.');
//         }
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
