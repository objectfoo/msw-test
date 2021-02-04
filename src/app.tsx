import React from "react";
import { useObservable } from "common/use-observable";
import { AppService, Data } from "./app-service";
import Loading from "./common/loading";
import "./app.css";

export const App = () => {
	const [service] = React.useState(() => new AppService());
	React.useEffect(() => {service.LoadData()}, [service]);
	const isLoading = useObservable(service.IsLoading);
	const loadingError = useObservable(service.LoadingError);
	const data = useObservable(service.Data);

	return (
		<div className="app">
			<Loading
				LoadErrorMessage={loadingError}
				IsLoading={isLoading}
				RenderChildren={() => <DataView data={data} service={service} />}
				RenderError={() => <button onClick={() => service.LoadData()}>Try Again</button>}
			/>
		</div>
	);
}

const DataView: React.FC<{
	data: readonly Data[];
	service: AppService;
}> = (props) => {
	return(
		<>
			<ul>
				{props.data.map((item) => <li key={item.id}>{item.message}</li>)}
			</ul>
			<button onClick={() => props.service.LoadData()}>Reload</button>
			<button onClick={() => props.service.NavigateTo("https://google.com")}>Go Google</button>
		</>
	);
};









