// Boostrap
import * as bootstrap from 'bootstrap';

// Class View
export default class View {

    // Data
    _data;

    /**
     * It renders a loading (spinner).
     */
    renderLoading() {
        const html = `
            <div class="c-loading">
                <div class="c-loading__spinner"></div>
                <div class="c-loading__text">Loading data...</div>
            </div>
        `;
        this._clearParentElement()
        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    /**
     * It renders a modal to show a title and a body.
     * @param {string} title - Title of the modal.
     * @param {string} body - Body of the modal.
     */
    renderError(title, body) {
        const html = `
            <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${body}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this._clearParentElement()
        this._parentElement.insertAdjacentHTML('afterbegin', html);
        new bootstrap.Modal(document.getElementById('modal')).show();
    }

    /**
     * It clears the parent element (the container).
     */
    _clearParentElement() {
        this._parentElement.innerHTML = '';
    }

    /**
     * It renders the data.
     */
    renderData(data) {
        // Save the data in the property.
        this._data = data;

        // Insert the HTML.
        this._clearParentElement();
        this._parentElement.insertAdjacentHTML('afterbegin', this._dataHTML());
    }
}
