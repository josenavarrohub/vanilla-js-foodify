// Views
import View from './View.js';

// Images
import hatIcon from '../../img/hat.svg';

// Class RecipesView
class RecipesView extends View {

    // Container
    _parentElement = document.querySelector('.c-recipes');

    /**
     * It generates the HTML.
     * 
     * @returns {string} A string with the template.
     */
    _dataHTML() {
        return `
            <h3 class="c-recipes__title">Recipes for "${this._data.query}"</h3>
            <p>Choose one to see more...</p>
            <nav>
                <ul class="c-recipes__list list-unstyled">
                    ${this._data.recipes.map(recipe => `
                        <li class="c-recipes__item">
                            <a href="#${recipe.id}">🧑🏻‍🍳${recipe.title}</a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        `;
    }

    /**
     * Publisher: It subscribes a handler function (render) to
     * react to the events.
     */
    subscribeRender(handler) {
        document.addEventListener('DOMContentLoaded', handler);
    }

}
export default new RecipesView();
