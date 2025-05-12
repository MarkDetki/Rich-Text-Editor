import {BaseView} from './index.js';

export class ListView extends BaseView {
    bindInsertOrdered(orderedHandler) {
        BaseView.toolbar.listBtn.ordered.addEventListener('click', () => {
            orderedHandler();
        });
    }

    bindInsertUnordered(unorderedHandler) {
        BaseView.toolbar.listBtn.unordered.addEventListener('click', () => {
            unorderedHandler();
        });
    }

    bindInsertDefinition(definitionHandler) {
        BaseView.toolbar.listBtn.definition.addEventListener('click', () => {
            definitionHandler();
        });
    }

    bindEnterOnColonLine(enterOnColonLineHandler) {
        BaseView.editorInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const {selectionStart, value} = BaseView.editorInput;

                // Determine the current line
                const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
                const currentLine = value.substring(lineStart, selectionStart).trim();

                if (
                    currentLine.startsWith(':') ||
                    currentLine.startsWith(';') ||
                    currentLine.startsWith('#') ||
                    currentLine.startsWith('*')
                ) {
                    event.preventDefault();
                    enterOnColonLineHandler();
                }
            }
        });
    }
}
