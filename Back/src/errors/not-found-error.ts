import { ApplicationError } from "@/protocols";

export function notFoundErrror(message: string): ApplicationError {
  return {
    name: "NotFoundError",
    message,
  };
}
