import { Observable, ObservableArray } from "@residualeffect/reactor";
import { WindowProxy } from "common/window-proxy";

export interface Data {
	id: string;
	message: string;
}

export interface DataResponse {
	Data: Data[]
}

async function getData(url: string): Promise<DataResponse> {
	const response = await fetch(url, { mode: "cors", cache: "no-cache" });

	if (!response.ok) {
		throw new Error(`An api error occured: ${response.status} ${response.statusText}`);
	}

	return await response
		.json()
		.then((json) => {
			if (json.Error === true) {
				throw new Error(json.Message);
			}
			return json;
		});
}

export class AppService {
	constructor(windowProxy?: WindowProxy) {
		this.WindowProxy = windowProxy ?? WindowProxy.Instance;
		this.Data = new ObservableArray<Data>([]);
		this.IsLoading = new Observable(false);
		this.LoadingError = new Observable("");
	}

	public LoadData(): Promise<void | DataResponse> {
		this.LoadingError.Value = "";
		this.IsLoading.Value = true;

		return getData("/api/data")
			.then((response) => {
				this.Data.Value = response.Data;
			})
			.catch((e) => {
				this.LoadingError.Value = e.message;
			})
			.finally(() => this.IsLoading.Value = false);
	}


	public NavigateTo(uri: string) {
		this.WindowProxy.GoUri(uri);
	}

	public Data: ObservableArray<Data>;
	public IsLoading: Observable<boolean>;
	public LoadingError: Observable<string>;
	private WindowProxy: WindowProxy;
}