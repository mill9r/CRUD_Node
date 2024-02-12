import { IncomingMessage, ServerResponse } from 'http';

const handleHttpRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  callback: (
    method: string | undefined,
    url: string | undefined,
    res?: ServerResponse,
    body?: string,
  ) => void,
) => {
  let body = '';
  req.on('data', (chunk: ArrayBuffer) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(req.method, req.url, res, JSON.parse(body));
  });
};

export { handleHttpRequest };
