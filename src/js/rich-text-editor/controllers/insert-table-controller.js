import {BaseController} from './index.js';
import {InsertTableView} from '../views/index.js';

export class InsertTableController extends BaseController {
    constructor(model) {
        super(model);
        this.row = 0;
        this.col = 0;
        this.insertTableView = new InsertTableView();
        this.insertTableView.initTableDialog(this.insertTableMarkup.bind(this));
    }

    insertTableMarkup(rows, cols) {
        if (rows.length === 0 && cols.length === 0) return;

        let tableMarkup = '';

        let headerRow = '';
        headerRow += `|= Header1`;
        for (let col = 2; col <= cols; col++) {
            headerRow += `| Header${col} `;
        }
        tableMarkup += headerRow + '\n';

        for (let i = 1; i <= rows; i++) {
            let row = '';
            for (let j = 1; j <= cols; j++) {
                row += `| Cell ${i}.${j} `;
            }
            tableMarkup += `${row}\n`;
        }

        this.insertTableView.insertText(tableMarkup);
        this.update();
    }
}
