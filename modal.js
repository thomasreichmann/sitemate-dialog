const template = document.createElement('template');
template.innerHTML = `
<style>
<style>
</style>
<h1>The component loads!</h1>`;

class Modal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
}
window.customElements.define('custom-modal', Modal);
