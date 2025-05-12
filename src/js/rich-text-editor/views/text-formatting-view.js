import {BaseView} from './index.js';

export class TextFormattingView extends BaseView {
    bindFormattingActions(textFormattingController) {
        BaseView.toolbar.italicBtn.addEventListener('click', () => {
            textFormattingController.applyItalic();
        });

        BaseView.toolbar.boldBtn.addEventListener('click', () => {
            textFormattingController.applyBold();
        });

        BaseView.toolbar.quoteBtn.addEventListener('click', () => {
            textFormattingController.applyQuote();
        });

        BaseView.toolbar.markedBtn.addEventListener('click', () => {
            textFormattingController.applyMarked();
        });

        BaseView.toolbar.insertedBtn.addEventListener('click', () => {
            textFormattingController.applyInserted();
        });

        BaseView.toolbar.strikeTroughBtn.addEventListener('click', () => {
            textFormattingController.applyStrikeThrough();
        });

        BaseView.toolbar.superscriptBtn.addEventListener('click', () => {
            textFormattingController.applySuperscript();
        });

        BaseView.toolbar.subscriptBtn.addEventListener('click', () => {
            textFormattingController.applySubscript();
        });

        BaseView.toolbar.enteredBtn.addEventListener('click', () => {
            textFormattingController.applyEntered();
        });

        BaseView.toolbar.sourceCodeBtn.addEventListener('click', () => {
            textFormattingController.applySourceCode();
        });

        BaseView.toolbar.textOutputBtn.addEventListener('click', () => {
            textFormattingController.applyTextOutput();
        });
    }

    bindInsertHorizontalRule(handler) {
        BaseView.toolbar.horizontalRule.addEventListener('click', () => {
            handler();
        });
    }

    bindInsertFootnote(handler) {
        BaseView.toolbar.footnoteBtn.addEventListener('click', () => {
            handler();
        });
    }

    bindInsertHeading(textFormattingController) {
        BaseView.toolbar.headingBtn.h1.addEventListener('click', () => {
            textFormattingController.applyHeading();
        });
        BaseView.toolbar.headingBtn.h2.addEventListener('click', () => {
            textFormattingController.applyHeading(2);
        });
        BaseView.toolbar.headingBtn.h3.addEventListener('click', () => {
            textFormattingController.applyHeading(3);
        });
        BaseView.toolbar.headingBtn.h4.addEventListener('click', () => {
            textFormattingController.applyHeading(4);
        });
        BaseView.toolbar.headingBtn.h5.addEventListener('click', () => {
            textFormattingController.applyHeading(5);
        });
    }
}
