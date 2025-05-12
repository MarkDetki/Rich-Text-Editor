import {
    ContentController,
    InsertImageController,
    TextFormattingController,
    UtilsController,
    ListController,
    InsertLinkController,
    EmojiController,
    InsertTableController,
    InsertTransclusionController,
} from './controllers/index.js';
import {Model} from './model.js';
import {Helpers} from './utils/helpers.js';
import {ZettelstoreApiClient} from '../client/zettelstore-api-client';
import {BaseView} from './views/index.js';

export class RichTextEditor {
    constructor() {
        this.model = new Model();
        this.apiClient = new ZettelstoreApiClient();
        Helpers.initBootstrap(BaseView.editorElement);
        this.initControllers();
    }
    initControllers() {
        new TextFormattingController(this.model, this.apiClient);
        new InsertImageController(this.model, this.apiClient);
        new InsertLinkController(this.model, this.apiClient);
        new UtilsController(this.model, this.apiClient);
        new ContentController(this.model, this.apiClient);
        new ListController(this.model, this.apiClient);
        new EmojiController(this.model, this.apiClient);
        new InsertTableController(this.model, this.apiClient);
        new InsertTransclusionController(this.model, this.apiClient);
    }
}
