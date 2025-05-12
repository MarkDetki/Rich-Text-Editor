import {BaseView} from './index.js';
import {Modal} from 'bootstrap';

export class InsertTransclusionView extends BaseView {
    constructor() {
        super();
        this.createTransclusionModal = BaseView.editorElement.querySelector('#createZettelstoreTransclusion');
        this.createTransclusionForm = this.createTransclusionModal.querySelector(
            '#createZettelTransclusionForm',
        );
        this.zettelSuggestions = this.createTransclusionForm.querySelector('#searchSuggestionsTransclusion');
        this.radioBtns = this.createTransclusionForm.querySelectorAll('input[type=radio]');
        this.searchInput = this.createTransclusionForm.querySelector('#searchByZettelNameTransclusion');
        this.fragmentIdentifierInput = this.createTransclusionForm.querySelector(
            '#transclusionFragmentIdentifier',
        );
        this.transclusionSearchQueryInput =
            this.createTransclusionForm.querySelector('#transclusionSearchQuery');
        this.initForm();
        this.bindDynamicTransclusionForm();
    }

    bindSearchInput(handler) {
        this.searchInput.addEventListener('input', (event) => handler(event));
    }

    bindFormSubmit(handler) {
        this.createTransclusionForm.addEventListener('submit', (event) => handler(event));
    }

    hideModal() {
        const modalInstance = Modal.getOrCreateInstance(this.createTransclusionModal);
        modalInstance.hide();
    }

    resetForm() {
        this.createTransclusionForm.classList.remove('was-validated');
        this.fragmentIdentifierInput.value = '';
        this.searchInput.value = '';
        this.transclusionSearchQueryInput.value = '';
        this.clearElement(this.zettelSuggestions);
    }

    bindDynamicTransclusionForm() {
        this.radioBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                this.changeForm(event.target.value);
            });
        });
    }

    initForm() {
        const formData = new FormData(this.createTransclusionForm);
        this.changeForm(formData.get('transclusion-mode'));
    }

    changeForm(mode) {
        if (mode === 'inline') {
            this.transclusionSearchQueryInput.setAttribute('disabled', '');
            this.searchInput.removeAttribute('disabled');
            this.fragmentIdentifierInput.removeAttribute('disabled');
        } else if (mode === 'query') {
            this.transclusionSearchQueryInput.removeAttribute('disabled');
            this.searchInput.setAttribute('disabled', '');
            this.fragmentIdentifierInput.setAttribute('disabled', '');
        } else {
            this.transclusionSearchQueryInput.setAttribute('disabled', '');
            this.searchInput.removeAttribute('disabled', '');
            this.fragmentIdentifierInput.setAttribute('disabled', '');
        }
    }
}
