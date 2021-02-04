import { setupWorker } from "msw"
import handlers from "./handlers"

const delay = 1000;

export const worker = setupWorker(...handlers(delay));
