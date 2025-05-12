export class Model {
    constructor() {
        this.content = '';
        this.undoStack = [];
        this.redoStack = [];
    }

    updateContent(newContent) {
        if (newContent === this.content) {
            return;
        }
        if (this.undoStack.length > 30) {
            this.undoStack.shift();
        }
        this.undoStack.push(this.content);
        this.redoStack = [];
        this.content = newContent;
    }

    undo() {
        if (this.undoStack.length === 0) {
            return;
        }
        const lastState = this.undoStack.pop();
        this.redoStack.push(this.content);
        this.content = lastState;
    }

    redo() {
        if (this.redoStack.length === 0) {
            return;
        }
        const redoState = this.redoStack.pop();
        this.undoStack.push(this.content);
        this.content = redoState;
    }

    getContent() {
        return this.content;
    }
}
