import {BaseController} from './index.js';
import {UtilsView} from '../views/index.js';

export class UtilsController extends BaseController {
    constructor(model) {
        super(model);
        this.utilsView = new UtilsView();
        this.utilsView.bindFullScreen(this);
    }

    async toggleFullscreen() {
        const elem = document.documentElement;

        try {
            if (!document.fullscreenElement) {
                if (elem.requestFullscreen) {
                    await elem.requestFullscreen();
                } else if (elem['webkitRequestFullscreen']) {
                    await elem['webkitRequestFullscreen'](); // Safari
                }
                this.utilsView.showExitFullscreenIcon();
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document['webkitExitFullscreen']) {
                    await document['webkitExitFullscreen'](); // Safari
                }
                this.utilsView.showFullscreenIcon();
            }
        } catch (error) {
            console.error('Failed to toggle fullscreen:', error);
        }
    }
}
