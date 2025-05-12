import {BaseController} from './index.js';
import {TextFormattingView} from '../views/index.js';

export class TextFormattingController extends BaseController {
    constructor(model) {
        super(model);
        this.textFormattingView = new TextFormattingView();
        this.textFormattingView.bindFormattingActions(this);
        this.textFormattingView.bindInsertHorizontalRule(this.insertHorizontalRule.bind(this));
        this.textFormattingView.bindInsertFootnote(this.insertFootnote.bind(this));
        this.textFormattingView.bindInsertHeading(this);
    }

    _wrapSelection(selectedText, tag) {
        return `${tag}${selectedText}${tag}`;
    }

    _unwrapSelection(selectedText, tag) {
        return selectedText.replaceAll(tag, '');
    }

    applyFormat(tag, regex) {
        const selectedText = this.textFormattingView.getSelectedText();
        let newText;

        if (selectedText.match(regex)) {
            newText = this._unwrapSelection(selectedText, tag);
        } else {
            newText = this._wrapSelection(selectedText, tag);
        }

        this.textFormattingView.insertText(newText, tag.length);
        this.update();
    }

    applyItalic() {
        const regex = /__[^_]+__/;
        const tag = '__';
        this.applyFormat(tag, regex);
    }

    applyBold() {
        const regex = /\*\*[^*]+\*\*/;
        const tag = '**';
        this.applyFormat(tag, regex);
    }

    applyQuote() {
        const regex = /""[^"]+""/;
        const tag = '""';
        this.applyFormat(tag, regex);
    }

    applyMarked() {
        const regex = /##[^#]+##/;
        const tag = '##';
        this.applyFormat(tag, regex);
    }

    applyInserted() {
        const regex = />>[^>]+>>/;
        const tag = '>>';
        this.applyFormat(tag, regex);
    }

    applyStrikeThrough() {
        const regex = /~~[^~]+~~/;
        const tag = '~~';
        this.applyFormat(tag, regex);
    }

    applySuperscript() {
        const regex = /\^\^[^^]+\^\^/;
        const tag = '^^';
        this.applyFormat(tag, regex);
    }

    applySubscript() {
        const regex = /,,[^,]+,,/;
        const tag = ',,';
        this.applyFormat(tag, regex);
    }

    applyEntered() {
        const regex = /''[^']+''/;
        const tag = "''";
        this.applyFormat(tag, regex);
    }

    applySourceCode() {
        const regex = /``[^`]+``/;
        const tag = '``';
        this.applyFormat(tag, regex);
    }

    applyTextOutput() {
        const regex = /==[^=]+==/;
        const tag = '==';
        this.applyFormat(tag, regex);
    }

    insertHorizontalRule() {
        this.textFormattingView.insertText('---\n');
        this.update();
    }

    insertFootnote() {
        this.textFormattingView.insertText('[^] ', 2);
        this.update();
    }

    applyHeading(n = 1) {
        this.textFormattingView.insertCharacterAtLineStart(`${'='.repeat(n)} `);
        this.update();
    }
}
