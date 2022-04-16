import { useState } from 'react'
import Header from './components/header'
import Converter from './components/converter'
import Docs from './components/docs'

function App() {
	const [selected, setSelected] = useState('')

	const handleSelected = (selected: string): void => {
		setSelected(selected)
	}

	return (
		<div className="app">
			<Header />

			{selected === '' && (
				<div className="ino-selection">
					<div>
						<button className="spx-btn spx-btn--pr spx-btn--block" onClick={() => handleSelected('Docs')}>Docs</button>
					</div>

					<div>
						<button className="spx-btn spx-btn--pr spx-btn--block" onClick={() => handleSelected('Converter')}>Converter</button>
					</div>
				</div>
			)}

			{selected === 'Docs' && <Docs />}
			{selected === 'Converter' && <Converter />}
		</div>
	)
}

export default App
