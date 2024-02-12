import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../services/user-service.interface';
import { URL_MATCHER } from '../constants/api-routes.constant';
import { HttpMethod } from '../constants/http.enum';
import { ServiceUuidIsInvalidException } from '../exceptions/service-exceptions';
import { createChain, handle400Request, handle404Request } from "../utils/http-request-handler";

export const userController =
  (service: UserService) =>
  async (
    method: string | undefined,
    url: string | undefined,
    res: ServerResponse<IncomingMessage>,
    body?: any,
  ) => {
    const parsedUrl = url?.match(URL_MATCHER);
    const userId = parsedUrl && parsedUrl[1];
    const errorHandlerChain = createChain(handle404Request, handle400Request);


    {
      if (method === HttpMethod.GET && userId) {
        const result = await service.getById(userId).catch((error) => {
          errorHandlerChain(error, res, `${userId}`, null);
        });
      }

      if (method === HttpMethod.POST && body) {
        const result = await service.create(body).catch((error) => {
          errorHandlerChain(error, res, `${userId}`, null);
        });
      }

      if (method === HttpMethod.PUT && userId) {
        const result = await service.update(userId, body).catch((error) => {
          errorHandlerChain(error, res, `${userId}`, null);
        });
      }

      if (method === HttpMethod.DELETE && userId) {
        const result = await service.delete(userId).catch((error) => {
          errorHandlerChain(error, res, `${userId}`, null);
        });

        if(result){
          res.writeHead(204, { 'Content-Type': 'application/json' });
          res.end();
        }
      }
    }
  };
