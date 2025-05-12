import {Collapse, Tab, Tooltip} from 'bootstrap';

export class Helpers {
    static initBootstrap(editorElement) {
        editorElement
            .querySelectorAll('[data-bs-toggle="tooltip"]')
            .forEach((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));

        editorElement.querySelectorAll('.collapse').forEach((collapseEl) => new Collapse(collapseEl));

        editorElement.querySelectorAll('.nav-tabs .nav-link').forEach((tabEl) => new Tab(tabEl));
    }
}
