import { ApplicationError } from "@/protocols";

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "The request was not found",
  };
}

export function badRequestError(): ApplicationError {
  return {
    name: "BadRequestError",
    message: "The request was not processed",
  };
}
