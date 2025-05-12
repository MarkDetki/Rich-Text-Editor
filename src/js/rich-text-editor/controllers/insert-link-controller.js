import {InsertLinkView} from '../views/index.js';
import {BaseController} from './index.js';

export class InsertLinkController extends BaseController {
    constructor(model, apiClient) {
        super(model);
        this.insertLinkView = new InsertLinkView();
        this.apiClient = apiClient;

        this.insertLinkView.bindCreateLink();
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.insertLinkView.createZettelForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.insertLinkView.searchZettel.addEventListener('input', this.handleSearchInput.bind(this));
    }

    async handleSearchInput(event) {
        event.preventDefault();

        if (this.insertLinkView.isExternalLink.checked) {
            return;
        }

        const query = this.insertLinkView.searchZettel.value.trim();
        if (!query) {
            this.insertLinkView.clearElement(this.insertLinkView.zettelSuggestions);
            return;
        }

        try {
            const suggestions = await this.apiClient.searchZettels(query.split(' '), 10);
            this.insertLinkView.updateSuggestions(
                query,
                suggestions,
                this.openPreview.bind(this),
                this.insertLinkView.zettelSuggestions,
                this.insertLinkView.searchZettel,
            );
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        this.insertLinkView.linkText.setCustomValidity('');
        this.insertLinkView.searchZettel.setCustomValidity('');

        if (!this.insertLinkView.linkText.value) {
            this.insertLinkView.linkText.setCustomValidity('Bitte geben Sie einen anzuzeigenden Text ein.');
        }

        try {
            if (!this.insertLinkView.isExternalLink.checked) {
                const zettelExists = await this.apiClient.doesZettelExists(
                    this.insertLinkView.searchZettel.value,
                );
                if (!zettelExists) {
                    this.insertLinkView.searchZettel.setCustomValidity(
                        'Die ID existiert nicht. Bitte eine gültige ID eingeben.',
                    );
                }
            }

            if (this.insertLinkView.createZettelForm.checkValidity()) {
                const newText = `[[${this.insertLinkView.linkText.value}|${this.insertLinkView.searchZettel.value}]]`;

                this.insertLinkView.insertText(newText);

                this.insertLinkView.hideModal();
                this.insertLinkView.resetForm();
                this.update();
            } else {
                this.insertLinkView.createZettelForm.classList.add('was-validated');
            }
        } catch (error) {
            console.error('Error validating or inserting link:', error);
        }
    }
}
