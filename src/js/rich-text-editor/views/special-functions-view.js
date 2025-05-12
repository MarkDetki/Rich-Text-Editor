import {BaseView} from './index.js';

export class SpecialFunctionsView extends BaseView {
    constructor() {
        super();
    }

    bindAddFootnote() {
        this.toolbar.footnoteBtn.addEventListener('click', () => this.footnote());
    }

    footnote() {
        const {selectionEnd, value} = this.editorElement;

        const newText = '[^]';

        const beforeText = value.substring(0, selectionEnd);
        const afterText = value.substring(selectionEnd);

        this.editorElement.value = beforeText + newText + afterText;

        const cursorPosition = beforeText.length + newText.length - 1;

        this.editorElement.setSelectionRange(cursorPosition, cursorPosition);
        this.editorElement.focus();
    }
}
