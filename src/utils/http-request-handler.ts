import { URL_MATCHER } from "../constants/api-routes.constant";
import { ServerResponse } from "http";


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

export { httpUserRequestEndpointHandler, handleNotFoundEndpoint };
