import {BaseController} from './index.js';
import {BaseView, ListView} from '../views/index.js';

export class ListController extends BaseController {
    constructor(model) {
        super(model);
        this.listView = new ListView();

        this.listView.bindInsertOrdered(() => this.handleOrdered());
        this.listView.bindInsertUnordered(() => this.handleUnordered());
        this.listView.bindInsertDefinition(() => this.handleDefinition());
        this.listView.bindEnterOnColonLine(() => this.handleEnterOnColonLine());
    }

    handleOrdered() {
        this.listView.insertCharacterAtLineStart('#');
        this.update();
    }

    handleUnordered() {
        this.listView.insertCharacterAtLineStart('*');
        this.update();
    }

    handleDefinition() {
        const {selectionStart, selectionEnd, value} = BaseView.editorInput;

        const beforeText = value.substring(0, selectionStart);
        const selectedText = value.substring(selectionStart, selectionEnd);
        const afterText = value.substring(selectionEnd);

        const lines = selectedText.split('\n');

        const formattedLines = lines.map((line, index) => {
            if (index % 2 === 0) {
                return `; ${line}`;
            } else {
                return `: ${line}`;
            }
        });

        const newText = formattedLines.join('\n');

        BaseView.editorInput.value = beforeText + newText + afterText;

        const newSelectionEnd = selectionStart + newText.length;
        BaseView.editorInput.setSelectionRange(newSelectionEnd, newSelectionEnd);

        BaseView.editorInput.focus();

        this.update();
    }

    handleEnterOnColonLine() {
        const {selectionStart, value} = BaseView.editorInput;

        const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
        let lineEnd = value.indexOf('\n', selectionStart);
        if (lineEnd === -1) {
            lineEnd = value.length;
        }
        const currentLine = value.substring(lineStart, lineEnd);
        const prevLineEnd = lineStart - 1;
        const prevLineStart = value.lastIndexOf('\n', prevLineEnd - 1) + 1;
        const lineBefore = value.substring(prevLineStart, prevLineEnd);

        let newLinePrefix = null;
        if (currentLine.trim().startsWith(': ')) {
            newLinePrefix = '; ';
        } else if (currentLine.trim().startsWith('; ')) {
            newLinePrefix = ': ';
        } else if (currentLine.trim().startsWith('# ')) {
            newLinePrefix = '# ';
        } else if (currentLine.trim().startsWith('* ')) {
            newLinePrefix = '* ';
        }

        const beforeText = value.substring(0, selectionStart);
        const afterText = value.substring(selectionStart);

        if (newLinePrefix !== null) {
            const newText = '\n' + newLinePrefix;
            BaseView.editorInput.value = beforeText + newText + afterText;

            const newCursorPosition = selectionStart + newText.length;
            BaseView.editorInput.setSelectionRange(newCursorPosition, newCursorPosition);
            this.update();
            BaseView.editorInput.focus();
        } else if (
            (lineBefore.trim().startsWith(':') ||
                lineBefore.trim().startsWith(';') ||
                lineBefore.trim().startsWith('#') ||
                lineBefore.trim().startsWith('*')) &&
            (currentLine.trim().startsWith(':') ||
                currentLine.trim().startsWith(';') ||
                currentLine.trim().startsWith('#') ||
                currentLine.trim().startsWith('*'))
        ) {
            // Check if the last line only contains the list identifier
            if (
                currentLine.trim() === ':' ||
                currentLine.trim() === ';' ||
                currentLine.trim() === '#' ||
                currentLine.trim() === '*'
            ) {
                // Remove the line if it only contains the identifier
                const newBeforeText = value.substring(0, lineStart);
                const newAfterText = value.substring(lineEnd);
                BaseView.editorInput.value = newBeforeText + newAfterText;

                const newCursorPosition = lineStart;
                BaseView.editorInput.setSelectionRange(newCursorPosition, newCursorPosition);
            } else {
                // Allow normal line breaks for lines without list prefixes
                BaseView.editorInput.value = beforeText + '\n' + afterText;
                const newCursorPosition = selectionStart + 1;
                BaseView.editorInput.setSelectionRange(newCursorPosition, newCursorPosition);
                BaseView.editorInput.focus();
            }
        } else {
            // Allow normal line breaks for non-list lines
            BaseView.editorInput.value = beforeText + '\n' + afterText;
            const newCursorPosition = selectionStart + 1;
            BaseView.editorInput.setSelectionRange(newCursorPosition, newCursorPosition);
            BaseView.editorInput.focus();
        }
    }
}
