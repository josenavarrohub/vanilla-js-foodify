// Class SearchView
class SearchView {

    // Container
    #parentElement = document.querySelector('.c-search');

    /**
     * It returns the value of the search input.
     */
    getInputValue() {
        return this.#parentElement.querySelector('input').value;
    }

    /**
     * It clears the search input.
     */
    #clearInput() {
        this.#parentElement.querySelector('input').value = '';
    }

    /**
     * Publisher: It subscribes a handler function (render) to
     * react to the events.
     */
    subscribeRender(handler) {
        this.#parentElement.addEventListener('submit', e => {
            e.preventDefault();
            handler();
            this.#clearInput();
        });
    }
}

export default new SearchView();
