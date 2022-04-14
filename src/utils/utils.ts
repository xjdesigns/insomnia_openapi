import { REGEX } from '../constants'
import { IRequest, IResponses, IPath } from '../types'

export function createParameters (request: IRequest, url: string): IPath[] {
	let parameters: IPath[] = []
	const pathParams: IPath[] = createPathParams(url)
	parameters = [...pathParams]

	for (const key in request) {
		if (key === 'headers') {
			for (let h = 0; h < request[key].length; h++) {
				if (request[key][h].name !== 'Authorization' || request[key][h].name !== 'Content-Type') {
					const header = {
						name: request[key][h].name,
						in: 'header',
						schema: {}
					}
					parameters.push(header)
				}
			}
		}

		if (key === 'parameters') {
			for (let h = 0; h < request[key].length; h++) {
				const param = {
					name: request[key][h].name,
					in: 'path',
					schema: {}
				}
				parameters.push(param)
			}
		}
	}

	return parameters
}

export function createSecurity (request: IRequest, that: any): {}[] {
	const security: {}[] = []
	let isJwt: boolean = false
	let isServiceToken: boolean = false
	let isBasicAuth: boolean = false

	for (const key in request) {
		if (key === 'headers') {
			for (let h = 0; h < request[key].length; h++) {
				if (request[key][h].name === 'Authorization') {
					isJwt = request[key][h].value.includes('jwt')
					isServiceToken = request[key][h].value.includes('Service Token')
					isBasicAuth = request[key][h].value.includes('Basic')

					if (isJwt || isServiceToken) {
						const auth = {
							'bearerAuth': []
						}
						security.push(auth)
					}
					if(isBasicAuth) {
						const auth = {
							'basicAuth': []
						}
						security.push(auth)
					}
				}
			}
		}

		if (key === 'authentication') {
			if (request[key].type === 'bearer') {
				isJwt = true
				const auth = {
					'bearerAuth': []
				}
				security.push(auth)
			}

			if (request[key].type === 'basic') {
				isBasicAuth = true
				const auth = {
					'basicAuth': []
				}
				security.push(auth)
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

	if (isBasicAuth) {
		that.authManage['basicAuth'] = {
			type: 'http',
			scheme: 'basic'
		}
	}

	return security
}

export function createPathParams (url: string): IPath[] {
	const pathParams: IPath[] = []
	// eslint-disable-next-line no-undef
	const params: RegExpMatchArray | null = url.match(REGEX.paramRegex);

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

export function tagLookup (id: string): string[] {
	if (id) {
		return [id]
	}

	return []
}

	// NOTE: Prompt value used is first string after 'prompt
	// prompt example: {{ _.url }}/path/to/{% prompt 'User Id', 'User Id', '', '', false, true %}
export function urlFix (url: string): string {
	let replacer: string = ''
	replacer = url.replace(REGEX.urlMatch, '')
	// eslint-disable-next-line no-undef
	const result: RegExpMatchArray | null = replacer.match(REGEX.promptRegex)
	const hasVars: boolean = REGEX.varMatch.test(replacer)

	if (result) {
		result.forEach(res => {
			// @ts-ignore
			const promptReplace = res.match(REGEX.promptValueRegex)[0]
			const makeVar = promptReplace.replace(/'/, '{').replace(/'/, '}').replace(' ', '_')
			replacer = replacer.replace(REGEX.promptRegexWBrackets, makeVar)
		})
	}

	if (hasVars) {
		replacer = replacer.replace(/{ /g, '').replace(/ }/g, '')
	}

	return replacer
}

export function createRequestBody (request: IRequest): {} | null {
	const { body } = request
	const len = Object.keys(body).length || 0

	if (len > 0) {
		if (body.text) {
			const textJson = JSON.parse(body.text)
			const tlen = Object.keys(textJson).length
			
			if (tlen > 0) {
				const properties = {}

				for (const key in textJson) {
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
export function createGenericResponses (name: string): IResponses {
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
