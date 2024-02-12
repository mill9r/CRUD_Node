import { ServerResponse } from "http";

export type Handler = (error: Error, res: ServerResponse, id: string, next: Handler | null) => void;
