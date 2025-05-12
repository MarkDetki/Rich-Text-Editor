import {BaseView} from './index.js';

export class InsertTableView extends BaseView {
    constructor() {
        super();
        this.createTableDialog = document.querySelector('.createTableDialog');
        this.initTableDialog();
    }

    initTableDialog(handleInsertTableMarkup) {
        let gridMarkup = '';

        for (let i = 0; i < 10; i++) {
            // 10 rows
            for (let j = 0; j < 10; j++) {
                // 10 columns per row
                gridMarkup += `<div class="grid-cell" data-row="${i + 1}" data-col="${j + 1}"></div>`;
            }
        }

        this.createTableDialog.innerHTML = `<div class="grid-container">${gridMarkup}</div>`;

        const dimensionsDisplay = document.getElementById('table-dimensions');
        const cells = document.querySelectorAll('.grid-cell');

        cells.forEach((cell) => {
            cell.addEventListener('mouseenter', () => {
                const row = parseInt(cell.dataset.row, 10);
                const col = parseInt(cell.dataset.col, 10);
                this.updateSelectedCells(row, col);
                dimensionsDisplay.textContent = `${row}x${col} Tabelle`;
            });
            cell.addEventListener('click', () => handleInsertTableMarkup(cell.dataset.row, cell.dataset.col));
        });
    }

    updateSelectedCells(rows, cols) {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach((cell) => {
            const cellRow = parseInt(cell.dataset.row, 10);
            const cellCol = parseInt(cell.dataset.col, 10);
            if (cellRow <= rows && cellCol <= cols) {
                cell.classList.add('table-highlight');
            } else {
                cell.classList.remove('table-highlight');
            }
        });
    }
}
