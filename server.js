const http = require('http');
const imie = 'Adrian Wachowski';
const port = 8080;


/////////////////logi
const startTime = new Date();
console.log(`Start serwera: ${startTime.toISOString()}`);
console.log(`Autor: ${imie}`);
console.log(`Nasłuchuje na porcie: ${port}`);
///////////////////



const server = http.createServer((req, res) => {
    //pobierz ip klienta
    const ip = req.socket.remoteAddress || 'unknown';

    //pobierz datetime
    const datetime = new Date();

    //ciało apki
    const response = `
        <html>
            <head><title>Server Info</title></head>
            <body>
                <p>Twoje IP: ${ip}</p><br>
                <p>Aktualny czas: ${datetime.toISOString()}</p>
                <button>ten guzik nic nie robi</button>
            </body>
        </html>
    `;

    // Send the response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(response);
});

// Start the server
server.listen(port, () => {
    console.log(`Działa i nasłuchuje na ${port}`);
});
