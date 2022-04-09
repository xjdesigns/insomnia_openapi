export function createParameters(request, url: string) {
	let parameters: any[] = []
	const pathParams: any[] = createPathParams(url)
	parameters = [...pathParams]

	for (let key in request) {
		if (key === 'headers') {
			for (let h = 0; h < request[key].length; h++) {
				if (request[key][h].name !== 'Authorization' || request[key][h].name === 'Content-Type') {
					const header = {
						name: request[key][h].name,
						in: 'header',
						schema: {}
					}
					parameters.push(header)
				}
			}
		}
	}

	return parameters
}

export function createSecurity(request, that: any) {
	let security: {}[] = []
	let isJwt: boolean = false
	let isServiceToken: boolean = false

	for (let key in request) {
		if (key === 'headers') {
			for (let h = 0; h < request[key].length; h++) {
				if (request[key][h].name === 'Authorization') {
					const authType = request[key][h].value.includes('Bearer');
					isJwt = request[key][h].value.includes('jwt')
					isServiceToken = request[key][h].value.includes('Service Token')
					const auth = {
						'bearerAuth': []
					}
					security.push(auth)
				}
			}
		}
	}

	if (isJwt) {
		that.authManage['bearerAuth'] = {
			type: 'http',
			scheme: 'bearer'
		}
	}

	if (isServiceToken) {
		that.authManage['bearerAuth'] = {
			type: 'http',
			scheme: 'bearer'
		}
	}

	return security
}

export function createPathParams(url: string) {
	const pathParams: any[] = []
	const paramRegex: RegExp = /{(.*?)}/g;
	const params: RegExpMatchArray | null = url.match(paramRegex);

	if (params && params.length > 0) {
		params.forEach(p => {
			const path = {
				name: p.replace('{', '').replace('}', ''),
				in: 'path',
				schema: {
					type: 'string'
				},
				required: true
			}
			pathParams.push(path)
		})
	}

	return pathParams
}

export function tagLookup(id: string) {
	if (id) {
		return [id]
	}

	return []
}

// NOTE: See note on createPath method
export function urlFix(url: string) {
	let replacer: string = ''
	const promptRegex: RegExp = /{%(.*?)%}/g
	const promptValueRegex: RegExp = /'(.*?)'/g
	const promptReg: RegExp = /({%.*?%})/ // leave off the global to grab match
	const urlMatch: RegExp = /({{.*?}})/g

	replacer = url.replace(urlMatch, '')
	const result: RegExpMatchArray | null = replacer.match(promptRegex)

	if (result) {
		result.forEach(res => {
			// @ts-ignore
			const promptReplace = res.match(promptValueRegex)[0]
			const makeVar = promptReplace.replace(/'/, '{').replace(/'/, '}').replace(' ', '_')
			replacer = replacer.replace(promptReg, makeVar)
		})
	}


	return replacer
}

export function createRequestBody(request) {
	const { body } = request
	const len = Object.keys(body).length || 0

	if (len > 0) {
		if (body.text) {
			const textJson = JSON.parse(body.text)
			const tlen = Object.keys(textJson).length
			
			if (tlen > 0) {
				const properties = {}

				for (let key in textJson) {
					properties[key] = {
						type: typeof textJson[key],
						example: textJson[key]
					}
				}

				const content = {
					[body.mimeType]: {
						schema: {
							type: 'object',
							properties
						}
					}
				}

				return { content };
			}
		}
		return null
	} else {
		return null
	}
}

// Since I do not see data being passed back for responses I am just making this up for now
// Need to do more testing
export function createGenericResponses(name: string) {
	const responses = {
		'200': {
			description: `${name} 200 response generic`,
			content: {
				'application/json': {}
			}
		},
		'400': {
			description: `${name} 400 response generic`,
			content: {
				'application/json': {}
			}
		},
		'401': {
			description: `${name} 401 Not Authenticated`,
			content: {
				'application/json': {}
			}
		}
	}
	return responses;
}
