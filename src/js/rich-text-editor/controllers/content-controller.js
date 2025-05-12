import {BaseController} from './index.js';
import {ContentView} from '../views/index.js';

export class ContentController extends BaseController {
    constructor(model) {
        super(model);
        this.contentView = new ContentView();
        this.typingTimeout = null;
        this.contentView.bindTextInput(this.handleTextInput.bind(this));
        this.contentView.bindTextChange(this.handleTextChange.bind(this));
        this.contentView.bindCopyBtn(this.handleCopyText.bind(this));
        this.contentView.bindUndo(this.handleUndo.bind(this));
        this.contentView.bindRedo(this.handleRedo.bind(this));
    }

    handleTextInput() {
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
            this.update();
        }, 250);
    }

    handleTextChange() {
        this.update();
    }

    async handleCopyText() {
        await navigator.clipboard.writeText(this.model.content);
        this.contentView.showCopySuccessIcon();
        setTimeout(() => {
            this.contentView.showCopyIcon();
        }, 1000);
    }

    handleUndo() {
        this.model.undo();
        ContentView.editorInput.value = this.model.getContent();
    }

    handleRedo() {
        this.model.redo();
        ContentView.editorInput.value = this.model.getContent();
    }
}
