const template = document.createElement('template');
template.innerHTML = `
<style>
<style>
</style>
<dialog>
  <menu>
    <button class="cancel">Cancel</button>
    <button class="confirm" value="default">Confirm</button>
  </menu>
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
		return ['visible', 'title'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'title' && this.shadowRoot) {
			this.shadowRoot.querySelector('.title').textContent = newValue;
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
