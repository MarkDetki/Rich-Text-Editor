import {Toast} from 'bootstrap';

export class BaseView {
    static editorElement = document.querySelector('.rich-text-editor');
    static editorInput = document.querySelector('textarea#editor-input');
    static toolbar = this.initToolbar();
    static toastContainer = this.editorElement.querySelector('.toast-container');
    static zettelPreview = this.editorElement.querySelector('#zettelPreviewModal');

    static initToolbar() {
        return {
            italicBtn: this.editorElement.querySelector('.italic'),
            boldBtn: this.editorElement.querySelector('.bold'),
            quoteBtn: this.editorElement.querySelector('.quote'),
            markedBtn: this.editorElement.querySelector('.marked'),
            insertedBtn: this.editorElement.querySelector('.inserted'),
            strikeTroughBtn: this.editorElement.querySelector('.strikeTrough'),
            sourceCodeBtn: this.editorElement.querySelector('.source_code'),
            textOutputBtn: this.editorElement.querySelector('.text_output'),
            superscriptBtn: this.editorElement.querySelector('.superscript'),
            subscriptBtn: this.editorElement.querySelector('.subscript'),
            enteredBtn: this.editorElement.querySelector('.entered'),
            createLinkBtn: this.editorElement.querySelector('.createLink'),
            listBtn: {
                unordered: this.editorElement.querySelector('.unordered-list'),
                ordered: this.editorElement.querySelector('.ordered-list'),
                definition: this.editorElement.querySelector('.definition-list'),
            },
            insertImageBtn: this.editorElement.querySelector('.embedImageDialogToggle'),
            insertLinkBtn: this.editorElement.querySelector('#createLinkButton'),
            copyContentBtn: this.editorElement.querySelector('#copyContent'),
            fullscreenBtn: this.editorElement.querySelector('#fullscreen'),
            undoBtn: this.editorElement.querySelector('#undo'),
            redoBtn: this.editorElement.querySelector('#redo'),
            horizontalRule: this.editorElement.querySelector('#horizontalRule'),
            footnoteBtn: this.editorElement.querySelector('#footnote'),
            headingBtn: {
                h1: this.editorElement.querySelector('#heading-h1'),
                h2: this.editorElement.querySelector('#heading-h2'),
                h3: this.editorElement.querySelector('#heading-h3'),
                h4: this.editorElement.querySelector('#heading-h4'),
                h5: this.editorElement.querySelector('#heading-h5'),
            },
        };
    }

    showLoadingSpinner(container) {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner-border');
        spinner.role = 'status';
        const spinnerInner = document.createElement('span');
        spinnerInner.classList.add('visually-hidden');
        spinner.appendChild(spinnerInner);
        container.appendChild(spinner);
    }

    hideLoadingSpinner(container) {
        const spinner = container.querySelector('.spinner-border');
        if (spinner) spinner.remove();
    }

    insertText(newText, offset = 0) {
        const {selectionStart, selectionEnd, value} = BaseView.editorInput;

        const beforeText = value.substring(0, selectionStart);
        const afterText = value.substring(selectionEnd);

        BaseView.editorInput.value = beforeText + newText + afterText;

        const cursorPosition = beforeText.length + newText.length - offset;

        BaseView.editorInput.setSelectionRange(cursorPosition, cursorPosition);
        BaseView.editorInput.focus();
    }

    insertCharacterAtLineStart(character) {
        const {selectionStart, selectionEnd, value} = BaseView.editorInput;

        // Determine the start and end of the selection
        const startOfSelection = value.lastIndexOf('\n', selectionStart - 1) + 1;
        const endOfSelection = value.indexOf('\n', selectionEnd);
        const endOfSelectionAdjusted = endOfSelection === -1 ? value.length : endOfSelection;

        // Extract the selected text
        const selectedText = value.substring(startOfSelection, endOfSelectionAdjusted);

        // Split the selected text into lines
        const lines = selectedText.split('\n');

        // Prepend the character to each line
        const modifiedLines = lines.map((line) => `${character} ${line}`);

        // Join the modified lines back
        const modifiedText = modifiedLines.join('\n');

        // Update the editor's value
        BaseView.editorInput.value =
            value.substring(0, startOfSelection) + modifiedText + value.substring(endOfSelectionAdjusted);

        // Set the cursor position after the modified text
        const newCursorStart = startOfSelection + modifiedText.length;
        BaseView.editorInput.setSelectionRange(newCursorStart, newCursorStart);

        // Focus on the editor
        BaseView.editorInput.focus();
    }

    getSelectedText() {
        const {selectionStart, selectionEnd, value} = BaseView.editorInput;
        return value.substring(selectionStart, selectionEnd);
    }

    showWarning(msg) {
        const toastEl = document.createElement('div');
        toastEl.className = 'toast align-items-center text-bg-warning border-0';
        toastEl.role = 'alert';
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');

        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body text-black" data-bs-animation="true">${msg}</div>
                <button type="button" class="btn-close btn-close-black me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        BaseView.toastContainer.appendChild(toastEl);

        const toast = new Toast(toastEl);

        toast.show();
    }

    clearElement(elm) {
        elm.innerHTML = '';
    }

    updateSuggestions(searchText, suggestions, handleOpenPreview, suggestionsContainerElm, searchInputElm) {
        this.clearElement(suggestionsContainerElm);
        if (!suggestions.length) {
            const noResults = document.createElement('div');
            noResults.textContent = 'No results found';
            noResults.classList.add('no-results', 'text-muted', 'p-2', 'text-center');
            suggestionsContainerElm.appendChild(noResults);
            return;
        }

        const suggestionList = document.createElement('ul');
        suggestionList.classList.add('list-group');
        suggestionList.setAttribute('role', 'listbox');

        suggestions.forEach(([id, title], index) => {
            const suggestionItem = document.createElement('li');
            suggestionItem.setAttribute('role', 'option');
            suggestionItem.setAttribute('tabindex', index);
            suggestionItem.classList.add(
                'list-group-item',
                'list-group-item-action',
                'd-flex',
                'justify-content-between',
                'align-items-center',
                'bg-light',
            );
            suggestionItem.style.cursor = 'pointer';

            const textContainer = document.createElement('div');
            textContainer.classList.add('d-flex', 'flex-column', 'me-3');

            const titleParagraph = document.createElement('p');
            titleParagraph.textContent = title;
            titleParagraph.classList.add('mb-1');

            const zettelIdParagraph = document.createElement('p');
            zettelIdParagraph.textContent = id;
            zettelIdParagraph.classList.add('text-muted', 'm-0', 'font-monospace');

            textContainer.appendChild(titleParagraph);
            textContainer.appendChild(zettelIdParagraph);

            const previewBtn = document.createElement('button');
            previewBtn.classList.add('btn', 'btn-light');
            previewBtn.innerHTML = '<i class="bi bi-eye"></i>';

            previewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenPreview(id);
            });

            suggestionItem.appendChild(textContainer);
            suggestionItem.appendChild(previewBtn);

            suggestionItem.addEventListener('click', () => {
                searchInputElm.value = id;
            });

            suggestionList.appendChild(suggestionItem);
        });

        suggestionsContainerElm.appendChild(suggestionList);
    }
}
