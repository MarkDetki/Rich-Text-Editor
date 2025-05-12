import {BaseController} from './index.js';
import {EmojiView} from '../views/index.js';

export class EmojiController extends BaseController {
    constructor(model) {
        super(model);
        this.emojiView = new EmojiView();
    }
}
