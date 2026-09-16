/**
 * THE ONE LINE.
 *
 * Swap `./compose.adapter` for `./http.adapter` when the backend lands and set
 * NEXT_PUBLIC_QUOTE_ENDPOINT. Nothing else in the app changes — QuoteForm
 * imports only from here.
 */
export { submitQuote } from "./compose.adapter";
export { composeMessage, validate } from "./compose.adapter";
export type { QuotePayload, SubmitResult } from "./types";
