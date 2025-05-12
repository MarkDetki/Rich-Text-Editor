import {BaseView} from './index.js';
import groupedEmojis from '../../../assets/grouped-emojis.json';

export class EmojiView extends BaseView {
    constructor() {
        super();
        this.emojiDropdown = document.querySelector('.emoji-dropdown');
        this.initEmojiDropdown();
    }

    initEmojiDropdown() {
        const navTabs = document.createElement('ul');
        navTabs.classList.add('nav', 'nav-tabs', 'mb-3', 'scrollable-tabs', 'p-2', 'm-0');
        navTabs.setAttribute('role', 'tablist');

        const tabContent = document.createElement('div');
        tabContent.classList.add('tab-content');

        let isFirstTab = true;

        for (const categoryId in groupedEmojis) {
            const category = groupedEmojis[categoryId];

            const navItem = document.createElement('li');
            navItem.classList.add('nav-item');
            navItem.setAttribute('role', 'presentation');

            const navLink = document.createElement('a');
            navLink.classList.add('nav-link');
            if (isFirstTab) navLink.classList.add('active');
            navLink.setAttribute('data-bs-toggle', 'tab');
            navLink.setAttribute('href', `#tab-${categoryId}`);
            navLink.setAttribute('role', 'tab');
            navLink.setAttribute('aria-controls', `tab-${categoryId}`);
            navLink.setAttribute('aria-selected', String(isFirstTab));
            navLink.innerHTML = category['entity'];

            navLink.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            navItem.appendChild(navLink);
            navTabs.appendChild(navItem);

            const tabPane = document.createElement('div');
            tabPane.classList.add('tab-pane', 'fade');
            if (isFirstTab) tabPane.classList.add('show', 'active');
            tabPane.setAttribute('id', `tab-${categoryId}`);
            tabPane.setAttribute('role', 'tabpanel');
            tabPane.setAttribute('aria-labelledby', `tab-${categoryId}`);

            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'mb-3');

            category['emojis'].forEach((element) => {
                const emojiButton = document.createElement('button');
                emojiButton.classList.add('btn', 'btn-light', 'm-1');
                emojiButton.innerHTML = element['entity'];
                emojiButton.addEventListener('click', () => {
                    this.insertText(element['entity']);
                });
                categoryContainer.appendChild(emojiButton);
            });

            tabPane.appendChild(categoryContainer);
            tabContent.appendChild(tabPane);

            isFirstTab = false;
        }

        this.emojiDropdown.appendChild(navTabs);
        this.emojiDropdown.appendChild(tabContent);
    }
}
