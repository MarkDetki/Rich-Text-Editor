import {BaseController} from './index.js';
import {InsertImageView} from '../views/index.js';

export class InsertImageController extends BaseController {
    constructor(model, apiClient) {
        super(model);
        this.insertImageView = new InsertImageView();
        this.apiClient = apiClient;
        this.insertImageView.bindInsertImage(this.handleLoadImages.bind(this));
    }

    handleInsertImage = (zettelId, text) => {
        const imageAltText = text.length > 0 ? `${text}|` : '';
        const newText = `{{${imageAltText}${zettelId}}}`;
        this.insertImageView.insertText(newText);
        this.update();
    };

    async handleLoadImages() {
        try {
            const images = await this.apiClient.listAllImages();
            this.insertImageView.loadImages(images, this.handleInsertImage);
        } catch (error) {
            console.error('Fehler beim Laden der Bilder: ', error.message);
            this.insertImageView.showWarning('Fehler beim Laden der Bilder: ' + error.message);
        }
    }
}
