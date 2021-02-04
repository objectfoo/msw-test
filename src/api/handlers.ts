import { rest } from "msw";

const handlers = (delay: number = 0) => {
	return [
		rest.get("/api/data", async(req, res, ctx) => {
			return res(
				ctx.delay(delay),
				ctx.json({
					Error: false,
					Message: null,
					Data: [
						{ id: "01", message: "Data item 1" },
						{ id: "02", message: "Data item 2" },
						{ id: "03", message: "Data item 3" },
						{ id: "04", message: "Data item 4" },
					],
				}))
		}),
		rest.get("/api/data/error", async (req, res, ctx) => {
			return res(
				ctx.delay(delay),
				ctx.json({ Error: true, Message: "A random error occured" }));
		}),
	];
};

export default handlers;
