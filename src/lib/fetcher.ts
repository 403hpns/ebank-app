import axios from "axios";
import { Schema, z } from "zod";

export type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

type FetcherConfig = {
  readonly method: HTTPMethod;
  readonly schema: Schema;
  readonly body?: object;
  readonly config?: RequestInit;
};

export async function fetcher(
  path: string,
  { method, body, config, schema }: FetcherConfig,
) {
  try {
    const response = await axios(path, {
      method,
      headers: { "Content-Type": "application/json" },
      data: body && JSON.stringify(body),
    });

    if (!schema) {
      return null;
    }

    const parsedData = schema.safeParse(response.data);
    if (parsedData.success) {
      return response.data;
    }

    return null;
  } catch (err) {
    if (err) {
      throw err;
    }
  }
}
