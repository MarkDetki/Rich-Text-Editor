import {BaseView} from '../views/index.js';
import {Modal} from 'bootstrap';

export class BaseController {
    constructor(model, apiClient) {
        this.model = model;
        this.apiClient = apiClient;
    }

    update() {
        this.model.updateContent(BaseView.editorInput.value);
    }

    async openPreview(id) {
        const [meta, content] = await this.apiClient.getZettel(id);
        BaseView.zettelPreview.querySelector('#zettelPreviewLabel').innerText = meta.title;
        BaseView.zettelPreview.querySelector('.modal-body').innerHTML = content;
        Modal.getOrCreateInstance(BaseView.zettelPreview).show();
    }
}
