import React, { useState } from 'react'
import { Parser } from 'insomnia_openapi'
import { RedocStandalone } from 'redoc'

let defaultConfig = {
	"title": "",
	"description": "",
	"version": "1.0.0"
}

const Converter = () => {
	const [inoInput, setInoInput] = useState('')
	const [inoOutput, setInoOutput] = useState('')
	const [openapiConfig, setOpenapiConfig] = useState(defaultConfig)
	const [notifState, setNotifState] = useState('waiting')
	const [redocDisplay, setRedocDisplay] = useState(false)

	const handleInput = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = ev.target.value
		setInoInput(val)
		console.warn('lets go woot')
	}

	const handleConvert = () => {
		try {
			const parser = new Parser(JSON.parse(inoInput), { openapiConfig })
			const output: any = parser.convert()
			setInoOutput(JSON.stringify(output, null, '  '))
			setNotifState('success')
			console.warn('output::', output)
		} catch (err) {
			setNotifState('error')
			setInoOutput('')
			console.error(err)
		}
	}

	const updateConfig = (ev: React.ChangeEvent<HTMLInputElement>, key: string) => {
		const value = ev.target.value
		setOpenapiConfig(prevState => {
			return {
				...prevState,
				[key]: value
			}
		});
	}

	const openRedoc = () => {
		if (inoOutput) {
			setRedocDisplay(true)
		}
	}

	const handleReset = () => {
		setOpenapiConfig(defaultConfig)
		setInoInput('')
		setInoOutput('')
		setNotifState('waiting')
	}

	const notifColor = () => {
		if (notifState === 'error') {
			return 'ino-notifbar--err'
		}

		if (notifState === 'success') {
			return 'ino-notifbar--sc'
		}
	}

	const fileHandler = async (ev: any) => {
		const file = ev.target.files.item(0)
		
		try {
			const text = await file.text();
			setInoInput(text)
		} catch (err) {
			setNotifState('error')
			console.error(err)
		}
	}

	const saveJson = () => {
		if (inoOutput) {
			const body = document.body
			const a = document.createElement('a')
			const file = new Blob([inoOutput], { type: 'application/json' })
			a.href = URL.createObjectURL(file)
			a.download = 'openapi.json'
			body.appendChild(a)
			a.click()
			body.removeChild(a)
		}
	}

	return (
		<div>
			<div className={`ino-notifbar ${notifColor()}`}>{notifState}</div>
			<div className="ino-convert-container spx-form">
				<div className="ino-c-input">
					<textarea className="spx-textarea" onChange={handleInput} placeholder="Input from insomnia v4 JSON export" value={inoInput} />
				</div>
				<div className="ino-c-actions">
					<div>
						<label className="spx-label" htmlFor="title">Title</label>
						<input type="text" id="title" className="spx-input" onChange={ev => updateConfig(ev, 'title')} placeholder="API Title" />
					</div>
					<div>
						<label className="spx-label" htmlFor="description">Description</label>
						<input type="text" id="description" className="spx-input" onChange={ev => updateConfig(ev, 'description')} placeholder="API Description" />
					</div>
					<div>
						<label className="spx-label" htmlFor="version">Version</label>
						<input type="text" id="version" className="spx-input" onChange={ev => updateConfig(ev, 'version')} placeholder="API Version" />
					</div>
					<div>
						<label className="spx-label" htmlFor="fileApi">Use File</label>
						<input type="file" accept=".json" id="fileApi" className="spx-input" onChange={fileHandler} />
					</div>
					<div className="spx-mg-bt-12">
						<button className="spx-btn spx-btn--pr spx-btn--block" onClick={handleConvert}>Convert</button>
					</div>
					<div className="spx-mg-bt-12">
						<button className="spx-btn spx-btn--sd spx-btn--block" onClick={handleReset}>Reset</button>
					</div>
					<div className="spx-mg-bt-12">
						<button className="spx-btn spx-btn--pr--inverted spx-btn--block" onClick={saveJson} disabled={!inoOutput}>Download</button>
					</div>
					<div className="spx-mg-bt-12">
						<button className="spx-btn spx-btn--pr--inverted spx-btn--block" onClick={openRedoc} disabled={!inoOutput}>Redoc</button>
					</div>
					<div className="spx-mg-bt-12">
						<p className="ino-txt-sm">
							If you have imported an openapi spec already or built out using the design document, you can still use
							the tool but in the insomnia payload there is already a yaml export.
						</p>
					</div>
				</div>
				<div className="ino-c-output">
					<textarea className="spx-textarea" value={inoOutput} readOnly placeholder="Export to OpenApi V3" />
				</div>
			</div>

			{redocDisplay && (
				<div className="ino-redoc">
					<div className="ino-redoc-close">
						<button className="spx-btn spx-btn--sm spx-btn--circle" onClick={() => setRedocDisplay(false)}>X</button>
					</div>
					<div className="ino-redoc-cont">
						<RedocStandalone spec={JSON.parse(inoOutput)} />
					</div>
					<div className="ino-redoc-overlay" />
				</div>
			)}
		</div>
	)
}

export default Converter