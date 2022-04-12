import {
	createParameters,
	createSecurity,
	createGenericResponses,
	tagLookup,
	urlFix,
	createRequestBody
} from './utils/utils'

type IResources = {
	_type: string;
	_id: string;
	name: string;
}

type IData = {
	resources: [IResources];
}

export class Converter {
	createTags (data: IData) {
		let is_type_rgroup: any[] = []
		const tags: {}[] = []
		const tagManage: {} = {}
		const dupeTags: string[] = []
		const { resources } = data
		const len = resources.length

		for (let i = 0; i < len; i++) {
			if (resources[i]._type === 'request_group') {
				is_type_rgroup.push(resources[i])
				// @ts-ignore
				if (!dupeTags.includes(resources[i].name)) {
					const tag = {
						name: resources[i].name
					}
					tags.push(tag)
				}
				dupeTags.push(resources[i].name)
				tagManage[resources[i]._id] = resources[i].name
			}
		}

		return { tags, tagManage }
	}

	// TODO: Paths cannot be dynamic from the insomnia
	// example {{ _.internalUrl }}/internal/washd2d/jobs/complex/{% prompt 'Complex Id', 'Complex Id', '', '', false, true %}
	// Prompt value used is first string after 'prompt
	createPaths (data: IData, parent: any) {
		const that = parent
		let is_type_request: any[] = []
		const paths: {} = {}
		const { resources } = data
		const len = resources.length

		for (let i = 0; i < len; i++) {
			if (resources[i]._type === 'request') {
				is_type_request.push(resources[i]);
			}
		}

		for (let r = 0; r < is_type_request.length; r++) {
			const method = is_type_request[r].method.toLowerCase()
			const url = urlFix(is_type_request[r].url)
			if (paths[url]) {
				paths[url][method] = {
					description: is_type_request[r].name,
					tags: tagLookup(that.tagManage[is_type_request[r].parentId]),
					parameters: createParameters(is_type_request[r], url),
					...createRequestBody(is_type_request[r]) && { requestBody: createRequestBody(is_type_request[r]) },
					responses: createGenericResponses(is_type_request[r].name),
					...createSecurity(is_type_request[r], that) && { security: createSecurity(is_type_request[r], that) }
				}
			} else {
				paths[url] = {
					[method]: {
						description: is_type_request[r].name,
						tags: tagLookup(that.tagManage[is_type_request[r].parentId]),
						parameters: createParameters(is_type_request[r], url),
						...createRequestBody(is_type_request[r]) && { requestBody: createRequestBody(is_type_request[r]) },
						responses: createGenericResponses(is_type_request[r].name),
						...createSecurity(is_type_request[r], that) && { security: createSecurity(is_type_request[r], that) }
					}
				}
			}
		}

		return paths;
	}

	// Server data coming I dont think we need
	// But I could still output if we wanted a curated list from Insomnia
	createServers (data) {
		// expects full payload for resources, could clean up
		let is_type_env: any[] = []
		const servers: {}[] = []
		const { resources } = data
		const len = resources.length

		for (let i = 0; i < len; i++) {
			if (resources[i]._type === 'environment') {
				is_type_env.push(resources[i]);
			}
		}

		// NOTE: This is passing in JWT stuff ????
		// @ts-ignore
		is_type_env.sort((a, b) => a.metaSortKey > b.metaSortKey)

		for (let s = 0; s < is_type_env.length; s++) {

			if (is_type_env[s].data) {
				for (const e in is_type_env[s].data) {
					const server = {
						url: is_type_env[s].data[e],
						description: `${is_type_env[s].name} ${e}`
					}
					servers.push(server)
				}
			}
		}

		return servers;
	}
}