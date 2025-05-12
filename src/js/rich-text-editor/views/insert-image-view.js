import {Modal} from 'bootstrap';
import {BaseView} from './index.js';

export class InsertImageView extends BaseView {
    constructor() {
        super();
        this.modal = document.querySelector('#embedImageModal');
        this.modalContent = this.modal.querySelector('.image-gallery');
        this.modalTextInput = this.modal.querySelector('#imageAltText');
    }

    bindInsertImage(handler) {
        BaseView.toolbar.insertImageBtn.addEventListener('click', async () => {
            handler();
        });
    }

    loadImages(images, imageClickHandler) {
        this.modalContent.innerHTML = '';

        images.forEach((element) => {
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('imgWrapper');
            imgWrapper.style.position = 'relative';
            imgWrapper.style.display = 'inline-block';

            this.showLoadingSpinner(imgWrapper);

            const imgElement = document.createElement('img');
            const imgId = element[0];
            const imgTitle = element[1];

            imgElement.setAttribute(
                'src',
                `${window.location.protocol}//${window.location.host}/api/z/${imgId}`,
            );
            imgElement.classList.add('imgElement-thumbnail', 'gallery-image');
            imgElement.setAttribute('alt', imgTitle);
            imgElement.setAttribute('data-zettel-id', imgId);
            imgElement.setAttribute('loading', 'lazy');
            imgElement.style.cursor = 'pointer';

            imgElement.style.opacity = '0';
            imgElement.style.transition = 'opacity 0.3s ease-in-out';

            imgElement.onload = () => {
                this.hideLoadingSpinner(imgWrapper);
                imgElement.style.opacity = '1';
            };

            imgWrapper.appendChild(imgElement);
            this.modalContent.appendChild(imgWrapper);

            this._bindClickEvent(imgElement, imgId, imageClickHandler);
        });
    }

    _bindClickEvent(img, id, handler) {
        img.addEventListener('click', () => {
            handler(id, this.modalTextInput.value);
            Modal.getInstance(this.modal).hide();
            this.modalTextInput.value = '';
        });
    }
}
