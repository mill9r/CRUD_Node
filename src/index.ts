import { createServer, ServerResponse } from 'http';
import { handleNotFoundEndpoint, httpUserRequestEndpointHandler } from "./utils/http-request-handler";
import { IncomingMessage } from "http";

const port = process.env.PORT || 3000;

const server = createServer();



// Listen to the request event
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  if (!httpUserRequestEndpointHandler(request.method, request.url)) {
    console.log('handleNotFound', handleNotFoundEndpoint);
    handleNotFoundEndpoint(response);
  }

  // request.on('data', (chunk) => {
  //
  //   console.log('Data received:', chunk.toString());
  // });
  //
  // request.on('end', () => {
  //   console.log('end', request.url);
  // });
  //
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.end(
  //   JSON.stringify({
  //     data: 'Hello World!',
  //   }),
  // );
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
