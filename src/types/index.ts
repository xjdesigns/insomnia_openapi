export type IConfig = {
	openapiConfig: Object;
}

export type IHeader = {
	name: 'Authorization' | 'Content-Type';
}

export type IBody = {
	text: string;
	mimeType: string;
}

export type IResources = {
	_type: string;
	_id: string;
	name: string;
	data: [];
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	url: string;
	parentId: string;
	header: IHeader;
	body: IBody;
	metaSortKey: number;
}

export type IRequest = {
	header: IHeader;
	body: IBody
}

export type IData = {
	resources: [IResources];
}

export type IResponse = {
	description: string;
	content: {}
}

export type IResponses = {
	'200': IResponse;
	'400': IResponse;
	'401': IResponse;
}

export type IPath = {
	name: string;
	in: string;
	schema: Object;
}

export type IPathsPath = {
	description: string;
	tags: [];
	parameters: [];
	requestBody?: {};
	responses: [];
	security?: {};
}

export type IPaths = {
	[x: string]: IPathsPath
}
