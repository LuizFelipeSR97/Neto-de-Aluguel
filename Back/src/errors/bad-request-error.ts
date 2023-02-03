import { ApplicationError } from "@/protocols";

export function badRquestError(message: string): ApplicationError {
  return {
    name: "BadRequestError",
    message,
  };
}
