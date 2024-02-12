import { createServer } from 'http';

const server = createServer();

// Listen to the request event
server.on('request', (request, res) => {
  request.on('data', (chunk) => {
    console.log('Data received:', chunk.toString());
  });
  console.log('Request received', request.url);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    }),
  );
});

server.listen(3000, () => console.log('Server is running on port 3000'));
