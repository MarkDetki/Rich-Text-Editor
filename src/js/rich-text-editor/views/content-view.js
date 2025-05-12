import {BaseView} from './index.js';

export class ContentView extends BaseView {
    constructor() {
        super();
        this.copyIcon = BaseView.toolbar.copyContentBtn.querySelector('.bi-clipboard');
        this.copyCheckIcon = BaseView.toolbar.copyContentBtn.querySelector('.bi-clipboard-check-fill');
    }
    bindTextInput(handler) {
        BaseView.editorInput.addEventListener('input', () => handler());
    }

    bindTextChange(handler) {
        BaseView.editorInput.addEventListener('change', () => handler());
    }

    bindCopyBtn(handler) {
        BaseView.toolbar.copyContentBtn.addEventListener('click', () => handler());
    }

    bindUndo(handler) {
        BaseView.toolbar.undoBtn.addEventListener('click', () => handler());
        document.addEventListener('keydown', (event) => {
            const isUndo = (event.ctrlKey || event.metaKey) && event.key === 'z';
            if (isUndo) {
                event.preventDefault();
                handler();
            }
        });
    }

    bindRedo(handler) {
        BaseView.toolbar.redoBtn.addEventListener('click', () => handler());
        document.addEventListener('keydown', (event) => {
            const isUndo = (event.ctrlKey || event.metaKey) && event.key === 'y';
            if (isUndo) {
                event.preventDefault();
                handler();
            }
        });
    }

    showCopyIcon() {
        this.copyCheckIcon.classList.add('d-none');
        this.copyIcon.classList.remove('d-none');
    }

    showCopySuccessIcon() {
        this.copyCheckIcon.classList.remove('d-none');
        this.copyIcon.classList.add('d-none');
    }
}
