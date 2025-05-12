import {BaseView} from './index.js';

export class UtilsView extends BaseView {
    constructor() {
        super();
        this.fullscreenIcon = BaseView.toolbar.fullscreenBtn.querySelector('.bi-arrows-fullscreen');
        this.exitFullscreenIcon = BaseView.toolbar.fullscreenBtn.querySelector('.bi-fullscreen-exit');
    }

    bindFullScreen(utilsController) {
        BaseView.toolbar.fullscreenBtn.addEventListener('click', () => {
            utilsController.toggleFullscreen();
        });
    }

    showFullscreenIcon() {
        this.fullscreenIcon.classList.remove('d-none');
        this.exitFullscreenIcon.classList.add('d-none');
    }

    showExitFullscreenIcon() {
        this.fullscreenIcon.classList.add('d-none');
        this.exitFullscreenIcon.classList.remove('d-none');
    }
}
