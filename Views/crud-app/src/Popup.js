import React from 'react';
import ReactDom from 'react-dom';
import Classes from './Popup.module.css';

const Popup = (props) => {
	setTimeout(() => {
		props.setVisibility('hidden');
	}, 10000);
	return ReactDom.createPortal(
		<div
			className={Classes.popup}
			style={{
				background: props.background,
				visibility: props.visibility,
			}}>
			<div>
				<h3>{props.message}</h3>
			</div>
		</div>,
		document.querySelector('#popup')
	);
};

export default Popup;
