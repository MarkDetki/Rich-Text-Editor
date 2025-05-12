import {BaseController} from './index.js';
import {InsertTransclusionView} from '../views/index.js';

export class InsertTransclusionController extends BaseController {
    constructor(model, apiClient) {
        super(model, apiClient);
        this.insertTransclusionView = new InsertTransclusionView();
        this.insertTransclusionView.bindSearchInput(this.handleSearchInput.bind(this));
        this.insertTransclusionView.bindFormSubmit(this.handleFormSubmit.bind(this));
    }

    async handleSearchInput(event) {
        event.preventDefault();

        const query = this.insertTransclusionView.searchInput.value.trim();
        if (!query) {
            this.insertTransclusionView.clearElement(this.insertTransclusionView.zettelSuggestions);
            return;
        }

        try {
            const suggestions = await this.apiClient.searchZettels(query.split(' '), 10);
            this.insertTransclusionView.updateSuggestions(
                query,
                suggestions,
                this.openPreview.bind(this),
                this.insertTransclusionView.zettelSuggestions,
                this.insertTransclusionView.searchInput,
            );
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.insertTransclusionView.createTransclusionForm);
        const zettelId = formData.get('zettel-id');
        this.insertTransclusionView.searchInput.setCustomValidity('');

        try {
            if (zettelId) {
                if (!(await this.apiClient.doesZettelExists(zettelId))) {
                    this.insertTransclusionView.searchInput.setCustomValidity(
                        'Die ID existiert nicht. Bitte eine gültige ID eingeben.',
                    );
                }
            }

            if (this.insertTransclusionView.createTransclusionForm.checkValidity()) {
                let newText = this.createTransclusionMarkup(formData);

                this.insertTransclusionView.insertText(newText);

                this.insertTransclusionView.hideModal();
                this.insertTransclusionView.resetForm();
                this.update();
            } else {
                this.insertTransclusionView.createTransclusionForm.classList.add('was-validated');
            }
        } catch (error) {
            console.error('Error validating or inserting link:', error);
        }
    }

    createTransclusionMarkup(formData) {
        const zettelId = formData.get('zettel-id');
        const fragmentId = formData.get('fragment-id');
        const queryExpression = formData.get('search-query');
        switch (formData.get('transclusion-mode')) {
            case 'inline':
                return `{{${zettelId}${fragmentId !== '' ? '#' + fragmentId : ''}}}\n`;
            case 'query':
                return `{{{query:${queryExpression}}}}\n`;
            case 'complete':
                return `{{{${zettelId}}}}\n`;
            default:
                return `{{${zettelId}}}\n`;
        }
    }
}
