import { URL_MATCHER } from '../constants/api-routes.constant';
import { IncomingMessage, ServerResponse } from 'http';
import { ServiceUuidIsInvalidException } from '../exceptions/service-exceptions';
import { DaoUserNotExistError } from '../exceptions/dao-exceptions';
import { Handler } from '../models/error-chain.interface';

const httpUserRequestEndpointHandler = (
  method: string | undefined,
  url: string | undefined,
) => {
  if (!method || !url) {
    return false;
  }

  return !!url?.match(URL_MATCHER);
};

const handleNotFoundEndpoint = (res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'The resource you requested could not be found',
    }),
  );
};

const handle404Request: Handler = (
  error: Error,
  res: ServerResponse<IncomingMessage>,
  id: string,
  next,
) => {
  if (error instanceof DaoUserNotExistError) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: `id === ${id} doesn't exist`,
      }),
    );
  } else if (next) {
    next(error, res, id, null);
  }
};

const handle400Request: Handler = (
  error: Error,
  res: ServerResponse<IncomingMessage>,
  id: string,
  next,
) => {
  if (error instanceof ServiceUuidIsInvalidException) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: `User id is invalid: ${id}`,
      }),
    );
  } else if (next) {
    next(error, res, id, null);
  }
};

function createChain(...handlers: Handler[]): Handler {
  return (error, res, id, _) => {
    const [firstHandler, ...remainingHandlers] = handlers;
    let nextHandler: Handler | null = null;

    if (remainingHandlers.length > 0) {
      nextHandler = createChain(...remainingHandlers);
    }

    if (firstHandler) {
      firstHandler(error, res, id, nextHandler);
    }
  };
}

export {
  httpUserRequestEndpointHandler,
  handleNotFoundEndpoint,
  handle404Request,
  handle400Request,
  createChain,
};
