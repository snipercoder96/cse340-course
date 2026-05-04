import express from 'express';

// press CTRL + C to stop the server

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const app = express(); // Use app variable to create an Express application

app.get('/', (req, res) => {
    const message = `
        <h1>Hello from Express</h1>
        <p>Welcome to backend development with Express!</p>
    `;
    res.send(message);
});

// start the server and listen on the specified port

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});