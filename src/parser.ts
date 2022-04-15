import { toJs } from './utils/json'
import { Converter } from './converter'
import { IConfig, IConvert, IOptions } from './types'

export class Parser {
	spec: Object
	openapiConfig: Object
	options: IOptions
	json: () => {}
	converter: any
	tagManage: []
	authManage: Object

	constructor (spec: any, config: IConfig) {
		const { openapiConfig, options } = config
		this.spec = spec
		this.openapiConfig = openapiConfig
		this.options = options
		this.json = toJs(spec)
		this.converter = new Converter()
		this.tagManage = []
		this.authManage = {}
	}

	getJs () {
		return this.json
	}

	convert (): IConvert {
		const { returnServers = false, serverCallback } = this.options
		const servers = this.converter.createServers(this.json, serverCallback)
		const { tags, tagManage } = this.converter.createTags(this.json)
		this.tagManage = tagManage
		const paths = this.converter.createPaths(this.json, this)

		const openapi = {
			openapi: '3.0.1',
			info: this.openapiConfig,
			components: {
				securitySchemes: this.authManage,
			},
			...returnServers && { servers },
			tags,
			paths
		}

		return openapi
	}
}
