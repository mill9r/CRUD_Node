import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from "../services/user-service.interface";

export const userController = (service: UserService) => {
  return {
    get: async (res: ServerResponse) => {
      const users = await service.get();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(users));
    },
    getById: async (res: ServerResponse, id: string) => {
      const user = await service.getById(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    },
    create: async (res: ServerResponse, body: string) => {
      const user = await service.create(body);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    },
    update: async (res: ServerResponse, id: string, body: string) => {
      const user = await service.update(id, body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    },
    delete: async (res: ServerResponse, id: string) => {
      const result = await service.delete(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    },
  };
};


