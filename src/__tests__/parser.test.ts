import { Parser } from '../parser'

describe('Parser::', () => {
	it('should handle a basic v4 conversion', () => {
		const openapiConfig = {
			"title": "My API",
			"description": "Internal API",
			"version": "1.0.0"
		};

		const insomniaV4Export = {
			"_type": "export",
			"__export_format": 4,
			"__export_date": "2022-04-06T21:54:47.662Z",
			"__export_source": "insomnia.desktop.app:v2022.2.1",
			"resources": [
				{
					"_id": "req_e563dd5508744349b2cd602d6d540d8b",
					"parentId": "fld_7926343b4ed44d8a9cb991fc66852bdb",
					"modified": 1649195034234,
					"created": 1648146016614,
					"url": "{{ _.internalUrl }}/some-path/{% prompt 'Order ID', 'OrderId', '', '', false, true %}/things",
					"name": "Create things",
					"description": "",
					"method": "POST",
					"body": {
						"mimeType": "application/json",
						"text": "{\n\t\"codes\": \"1111\"\n}"
					},
					"parameters": [],
					"headers": [
						{
							"description": "",
							"id": "pair_bbd58053856d47938f8b521addd8037e",
							"name": "Authorization",
							"value": "Bearer {% prompt 'Service Token', 'Service Token', '', '', false, true %}"
						},
						{
							"description": "",
							"id": "pair_b218288d8fc84bfba9597d07bc54e0ba",
							"name": "Content-Type",
							"value": "application/json"
						}
					],
					"authentication": {},
					"metaSortKey": -1648135201284,
					"isPrivate": false,
					"settingStoreCookies": true,
					"settingSendCookies": true,
					"settingDisableRenderRequestBody": false,
					"settingEncodeUrl": true,
					"settingRebuildPath": true,
					"settingFollowRedirects": "global",
					"_type": "request"
				}
			]
		}

		const expected =  {
			"openapi": "3.0.1",
			"info": {
			 "title": "My API",
			 "description": "Internal API",
			 "version": "1.0.0"
			},
			"components": {
			 "securitySchemes": {
				"bearerAuth": {
				 "type": "http",
				 "scheme": "bearer"
				}
			 }
			},
			"tags": [],
			"paths": {
			 "/some-path/{Order_ID}/things": {
				"post": {
				 "description": "Create things",
				 "tags": [],
				 "parameters": [
					{
					 "name": "Order_ID",
					 "in": "path",
					 "schema": {
						"type": "string"
					 },
					 "required": true
					},
					{
					 "name": "Content-Type",
					 "in": "header",
					 "schema": {}
					}
				 ],
				 "requestBody": {
					"content": {
					 "application/json": {
						"schema": {
						 "type": "object",
						 "properties": {
							"codes": {
							 "type": "string",
							 "example": "1111"
							}
						 }
						}
					 }
					}
				 },
				 "responses": {
					"200": {
					 "description": "Create things 200 response generic",
					 "content": {
						"application/json": {}
					 }
					},
					"400": {
					 "description": "Create things 400 response generic",
					 "content": {
						"application/json": {}
					 }
					},
					"401": {
					 "description": "Create things 401 Not Authenticated",
					 "content": {
						"application/json": {}
					 }
					}
				 },
				 "security": [
					{
					 "bearerAuth": []
					}
				 ]
				}
			 }
			}
		}

		const parser = new Parser(insomniaV4Export, { openapiConfig })
		const parsed = parser.convert()
		expect(parsed).toEqual(expected)
	})
})
