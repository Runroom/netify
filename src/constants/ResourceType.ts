export enum ResourceType {
	XHR = 'XHR',
	Fetch = 'Fetch',
	Script = 'Script',
	Stylesheet = 'Stylesheet',
	Document = 'Document',
	Font = 'Font',
	Image = 'Image',
	Media = 'Media',
	Manifest = 'Manifest',
	TextTrack = 'TextTrack',
	EventSource = 'EventSource',
	WebSocket = 'WebSocket',
	SignedExchange = 'SignedExchange',
	Ping = 'Ping',
	CSPViolationReport = 'CSPViolationReport',
	Other = 'Other',
	//TODO check is it all
}

export const resourceTypesList = [
	ResourceType.XHR,
	ResourceType.Fetch,
	ResourceType.Script,
	ResourceType.Stylesheet,
	ResourceType.Document,
	ResourceType.Font,
	ResourceType.Image,
	ResourceType.Media,
	ResourceType.Manifest,
	ResourceType.TextTrack,
	ResourceType.EventSource,
	ResourceType.WebSocket,
	ResourceType.SignedExchange,
	ResourceType.Ping,
	ResourceType.CSPViolationReport,
	ResourceType.Other,
];
