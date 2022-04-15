import {
	createParameters,
	createSecurity,
	createGenericResponses,
	tagLookup,
	urlFix,
	createRequestBody
} from './utils/utils'
import { IResources, IData, IPaths } from './types'

export class Converter {
	createTags (data: IData) {
		const isTypeRGroup: IResources[] = []
		const tags: {}[] = []
		const tagManage: {} = {}
		const dupeTags: string[] = []
		const { resources } = data
		const len = resources.length

		for (let i = 0; i < len; i++) {
			if (resources[i]._type === 'request_group') {
				isTypeRGroup.push(resources[i])
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

	createPaths (data: IData, parent: any): IPaths {
		const that = parent
		const isTypeRequest: IResources[] = []
		const paths: {} = {}
		const { resources } = data
		const len = resources.length

		for (let i = 0; i < len; i++) {
			if (resources[i]._type === 'request') {
				isTypeRequest.push(resources[i]);
			}
		}

		for (let r = 0; r < isTypeRequest.length; r++) {
			const method = isTypeRequest[r].method.toLowerCase()
			const url = urlFix(isTypeRequest[r].url)
			const data = {
				description: isTypeRequest[r].name,
				tags: tagLookup(that.tagManage[isTypeRequest[r].parentId]),
				parameters: createParameters(isTypeRequest[r], url),
				...createRequestBody(isTypeRequest[r]) && { requestBody: createRequestBody(isTypeRequest[r]) },
				responses: createGenericResponses(isTypeRequest[r].name),
				...createSecurity(isTypeRequest[r], that) && { security: createSecurity(isTypeRequest[r], that) }
			}

			if (paths[url]) {
				paths[url][method] = data
			} else {
				paths[url] = {
					[method]: data
				}
			}
		}

		return paths;
	}

	// Server data coming I dont think we need
	// But I could still output if we wanted a curated list from Insomnia
	createServers (data: IData): {}[] {
		const isTypeEnv: IResources[] = []
		const servers: {}[] = []
		const { resources } = data
		const len = resources.length

		for (let i = 0; i < len; i++) {
			if (resources[i]._type === 'environment') {
				isTypeEnv.push(resources[i]);
			}
		}

		// NOTE: This is passing in JWT stuff ????
		// @ts-ignore
		isTypeEnv.sort((a, b) => a.metaSortKey > b.metaSortKey)

		for (let s = 0; s < isTypeEnv.length; s++) {
			if (isTypeEnv[s].data) {
				for (const e in isTypeEnv[s].data) {
					const server = {
						url: isTypeEnv[s].data[e],
						description: `${isTypeEnv[s].name} ${e}`
					}
					servers.push(server)
				}
			}
		}

		return servers;
	}
}