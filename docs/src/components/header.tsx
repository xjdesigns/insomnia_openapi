import React from 'react'

const Header = () => {
	return (
		<header className="ino-header">
			<div className="ino-header__title">
				InsomniaV4 {`->`} OpenAPI V3
			</div>
			<div className="ino-header__ext">
				<div>
					<div className="spx-pill spx-pill--tr">
						npm install insomnia_openapi
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
