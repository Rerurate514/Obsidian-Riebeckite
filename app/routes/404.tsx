import type { Context } from "hono";
import { NotFound } from "../components/not-found";

const handler = (c: Context) => c.render(<NotFound />);

export default handler;
