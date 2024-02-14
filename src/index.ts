import { createServer, ServerResponse } from 'http';
import { handleNotFoundEndpoint, httpUserRequestEndpointHandler } from "./utils/http-request-handler";
import { IncomingMessage } from "http";
import { handleHttpRequest } from "./utils/http-handler";
import { userController } from "./controller/user.controller";
import { userService } from "./services/user.service";
import { userDao } from "./dao/user-dao";

const port = process.env.PORT || 3000;

const server = createServer();


server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  if (!httpUserRequestEndpointHandler(request.method, request.url)) {
    handleNotFoundEndpoint(response);
  } else {
    handleHttpRequest(request, response,  userController(userService(userDao())))
  }
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
