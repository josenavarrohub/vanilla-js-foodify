// Configuration
import { RECIPES_PER_PAGE } from '../config.js';

// Views
import View from './View.js';

// Class PaginationView
class PaginationView extends View {

    // Container
    _parentElement = document.querySelector('.c-pagination__list');

    /**
     * I generates the previous button.
     * @param {number} page
     * @returns {string} A string with the template.
     */
    _renderPrevious(page) {
        return `
            <li class="page-item">
                <a class="page-link border-primary" href="#" data-page=${page}>
                    &laquo; Page ${page}
                </a>
            </li>
        `
    };

    /**
     * I generates the next button.
     * @param {number} page
     * @returns {string} A string with the template.
     */
    _renderNext(page) {
        return `
            <li class="page-item">
                <a class="page-link border-primary" href="#" data-page=${page}>
                    Page ${page} &raquo;
                </a>
            </li>
        `
    };

    /**
     * It generates the HTML.
     * 
     * @returns {string} A string with the template.
     */
    _dataHTML() {
        const pages = Math.ceil(this._data.recipes.length / RECIPES_PER_PAGE);
        const { currentPage } = this._data;

        if (pages === 1) return '';
        if (currentPage === 1) return this._renderNext(currentPage + 1);
        if (currentPage < pages) {
            return `
                ${this._renderPrevious(currentPage - 1)}
                ${this._renderNext(currentPage + 1)}
            `;
        }
        return this._renderPrevious(currentPage - 1);
    }

    /**
     * Publisher: It subscribes a handler function (render) to
     * react to the events.
     */
    subscribeRender(handler) {
        this._parentElement.addEventListener('click', e => {
            const link = e.target.closest('.page-link');
            if (!link) return;
            const page = +link.dataset.page;
            handler(page);
        });
    }

}
export default new PaginationView();
