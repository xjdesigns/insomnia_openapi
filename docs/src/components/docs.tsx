import React from 'react'
//@ts-ignore
import Highlight from 'react-highlight'
import 'highlight.js/styles/atom-one-dark.css'

const Docs = () => {
	return (
		<div className="ino-docs-container">
			<div className="spx-mg-bt-24">
				<h3 className="spx-mg-bt-12">Install</h3>

				<Highlight language="bash">
				{`
  npm install insomnia_openapi
  or
  npm i insomnia_openapi
  or
  yarn add insomnia_openapi
				`}
				</Highlight>
			</div>

			<div className="spx-mg-bt-24">
				<h3 className="spx-mg-bt-12">Usage</h3>

				<Highlight className="javascript">
				{`
  let openapiConfig = {
    "title": "My api",
    "description": "Internal API",
    "version": "1.0.0"
  };

  // This would be the export from insomnia as V4
  const INSOV4 = {
    ...
  }

  const parser = new Parser(INSOV4, { openapiConfig })
  const output = parser.convert()
  console.warn('output::', output)
				`}
				</Highlight>
			</div>



			<div className="spx-mg-bt-24">
				<h3 className="spx-mg-bt-12">Options</h3>
				<p className="spx-mg-bt-12">Note: since responses are not setup inside the normal document the parser tool will return back generic responses for 200, 400, 401. You can use the responseCallback function to create your own. It takes in the url and method for each path.</p>

				<Highlight className="javascript">
				{`
  const responseExample = (url, method) => {
    if (url === '/path/to/api') {
      if (method === 'get') {
        return {
          '200': {
            description: '200 response',
            content: {
              'application/json': {
                schema: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 2
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const options = {
    serverReturn: true,
    serverCallback: servers => {[]},
    responseCallback: responseExample
  }

  const parser = new Parser(INSOV4, { ..., options })
				`}
				</Highlight>
			</div>
		</div>
	)
}

export default Docs