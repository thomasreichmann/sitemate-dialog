const template = document.createElement('template');
template.innerHTML = `
<style>
<style>
dialog {}

::backdrop,
dialog + .backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}

dialog {
  border: none;
  border-radius: 10px;
}

.content {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content button {
	text-transform: uppercase;
	text-decoration: none;
	padding: 20px;
	border-radius: 5px;
	display: inline-block;
	transition: all 0.4s ease 0s;
}

.content button:hover {
	background: #434343;
	transition: all 0.4s ease 0s;
}
</style>
<dialog>
  <div class="content">
    <h1 class="message"></h1>
    <menu>
      <button class="confirm">Yes</button>
      <button class="cancel">Cancel</button>
    </menu>
  </div>
</dialog>`;

class Modal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		let dialog = this.shadowRoot.querySelector('dialog');

		// Check if modal is visible from the start
		if (this.getAttribute('visible')) {
			dialog.showModal();
		}
	}

	connectedCallback() {
		this.attachEventHandlers();
	}

	// Attach handlers to both buttons
	attachEventHandlers() {
		const cancelButton = this.shadowRoot.querySelector('.cancel');
		cancelButton.addEventListener('click', e => {
			this.dispatchEvent(new CustomEvent('cancel'));
			this.removeAttribute('visible');
		});
		const confirmbutton = this.shadowRoot.querySelector('.confirm');
		confirmbutton.addEventListener('click', e => {
			this.dispatchEvent(new CustomEvent('confirm'));
			this.removeAttribute('visible');
		});
	}

	static get observedAttributes() {
		return ['visible', 'message'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'message' && this.shadowRoot) {
			this.shadowRoot.querySelector('.message').textContent = newValue;
		}
		if (name === 'visible' && this.shadowRoot) {
			if (newValue === null) {
				this.shadowRoot.querySelector('dialog').close();
			} else {
				this.shadowRoot.querySelector('dialog').showModal();
			}
		}
	}
}
window.customElements.define('custom-modal', Modal);
