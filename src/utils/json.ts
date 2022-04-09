export function toJs(json: JSON) {
	try {
		return JSON.parse(JSON.stringify(json))
	} catch (err) {
		throw Error('Unable to parse JSON')
	}
}
