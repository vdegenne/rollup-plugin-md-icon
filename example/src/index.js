import {LitElement, html} from 'lit';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';
import symbolsStyleSheet from './symbols.css' assert {type: 'css'};

document.adoptedStyleSheets.push(symbolsStyleSheet);

class MyElement extends LitElement {
	render() {
		return html`
			<md-icon-button>
				<md-icon>settings</md-icon>
			</md-icon-button>
			<md-icon-button>
				<md-icon>delete</md-icon>
			</md-icon-button>
			<md-icon-button>
				<md-icon>add</md-icon>
			</md-icon-button>
			<md-icon-button>
				<md-icon>remove_red_eye</md-icon>
			</md-icon-button>
			<md-icon-button>
				<md-icon>map</md-icon>
			</md-icon-button>
			<md-icon-button>
				<md-icon>people</md-icon>
			</md-icon-button>
		`;
	}
}

window.customElements.define('my-element', MyElement);
