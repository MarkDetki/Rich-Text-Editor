import {BaseView} from './index.js';
import {Modal} from 'bootstrap';

export class InsertLinkView extends BaseView {
    constructor() {
        super();
        this.createZettelstoreLinkModal = BaseView.editorElement.querySelector('#createZettelstoreLink');
        this.createZettelForm = BaseView.editorElement.querySelector('#createZettelForm');
        this.linkText = this.createZettelForm.querySelector('#linkText');
        this.isExternalLink = this.createZettelForm.querySelector('#externalRessource');
        this.searchZettel = this.createZettelForm.querySelector('#searchByZettelName');
        this.zettelSuggestions = this.createZettelForm.querySelector('#searchSuggestions');
    }

    hideModal() {
        const modalInstance = Modal.getOrCreateInstance(this.createZettelstoreLinkModal);
        modalInstance.hide();
    }

    bindCreateLink() {
        BaseView.toolbar.createLinkBtn.addEventListener('click', () => {
            this.resetForm();
        });
    }

    resetForm() {
        this.createZettelForm.classList.remove('was-validated');
        this.linkText.value = '';
        this.searchZettel.value = '';
        this.clearElement(this.zettelSuggestions);
    }
}
