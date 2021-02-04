import { AppService, DataResponse } from "./app-service";
import { WindowProxy, IWindowProxy } from "./common/window-proxy";
import { server, rest } from "./api/test-server";

jest.mock("./common/window-proxy");

let service: AppService;
let windowMock: IWindowProxy;

beforeEach(() => {
	windowMock = new WindowProxy();
	service = new AppService(windowMock);
});

it("should navigate to a uri", () => {
	WhenUserNavigates();
	expect(windowMock.GoUri).toHaveBeenCalledWith("/uri");
});

it("should successfully load data", async () => {
	await WhenDataIsLoaded();

	expect(service.IsLoading.Value).toBe(false);
	expect(service.Data.Value).toStrictEqual([
		{ id: "01", "message": "Data item 1" },
		{ id: "02", "message": "Data item 2" },
		{ id: "03", "message": "Data item 3" },
		{ id: "04", "message": "Data item 4" },
	]);
});

it("should be in error state when server returns an error", async () => {
	GivenHttpError();
	await WhenDataIsLoaded();

	expect(service.IsLoading.Value).toBe(false);
	expect(service.LoadingError.Value).toEqual("An api error occured: 500 Server error");
});

function GivenHttpError() {
	server.use(
		rest.get("/api/data", async (req, res, ctx) => {
			return res(ctx.status(500, "Server error"));
		})
	);
}

function WhenDataIsLoaded(): Promise<void | DataResponse> {
	return service.LoadData();
}

function WhenUserNavigates(): void {
	service.NavigateTo("/uri");
}
