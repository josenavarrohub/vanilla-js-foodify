// Fractions
import { Fraction } from 'fractional';

// Images
import advertisement from '../../img/advertisement.jpg';

// Views
import View from './View.js';

// Class RecipeView
class RecipeView extends View {

    // Container
    _parentElement = document.querySelector('.c-recipe');

    /**
     * It generates the HTML.
     * 
     * @returns {string} A string with the template.
     */
    _dataHTML() {
        return `
            <h1 class="c-recipe__title">${this._data.title}</h1>
            <p class="c-recipe__details bg-light">
                <strong><i class="bi bi-clock"></i> Cooking time:</strong> ${this._data.cookingTime} minutes
                <strong><i class="bi bi-people"></i> Servings:</strong> ${this._data.servings}
            </p>
            <div class="row">
                <div class="col-sm-8">
                    <div class="c-recipe__img-container">
                        <img src="${this._data.img}" alt="${this._data.title}">
                    </div>
                    <h2 class="c-recipe__ingredients-title">${this._data.title} Ingredients</h2>
                    <ul class="c-recipe__ingredients list-unstyled bg-light">
                    ${this._data.ingredients.map(({quantity, unit, description}) => `
                        <li>
                            <i class="bi bi-check2"></i>
                            <span class="c-recipe__quantity">${quantity ? new Fraction(quantity).toString() : ''}</span>
                            <span class="c-recipe__unit">${unit}</span>
                            <span class="c-recipe__description">${description}</span>
                        </li>
                    `).join('')}
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div class="c-recipe__guests">
                        <h2>Dinner guests</h2>
                        <p class="lead">How many people are going to eat?</p>
                        <p class="c-recipe__guests-people"><i class="bi bi-people"></i> <strong>${this._data.servings} people</strong></p>
                        <div class="btn-group">
                            <button type="button" class="c-recipe__btn-servings c-recipe__decrease btn btn-lg btn-outline-secondary">
                                <i class="bi bi-dash"></i>              
                            </button>
                            <button type="button" class="c-recipe__btn-servings c-recipe__increase btn btn-lg btn-outline-secondary">
                                <i class="bi bi-plus"></i>              
                            </button>
                        </div>
                    </div>
                    <div class="c-recipe__advertisement">
                        <p class="c-recipe__advertisement-text text-muted">Advertisement</p>
                        <div class="c-recipe__advertisement-img">
                            <img src="${advertisement}" alt="Advertisement" />
                        </div>
                    </div>
                </div>
            </div>
            <p class="c-recipe__author">
                Recipe by <a href="${this._data.url}" target="_blank">${this._data.publisher}</a>
            </p>
        `;
    }

    /**
     * Publisher: It subscribes a handler function (render) to
     * react to the events.
     */
    subscribeRender(handler) {
        window.addEventListener('hashchange', handler);
        document.addEventListener('DOMContentLoaded', handler);
    }

    /**
     * Publisher: It subscribes a handler function (update servings) to
     * react to the events.
     */
    subscribeUpdateServings(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.c-recipe__btn-servings');
            if (!btn) return;
            let servings;
            if (btn.classList.contains('c-recipe__decrease')) servings = this._data.servings - 1;
            if (btn.classList.contains('c-recipe__increase')) servings = this._data.servings + 1;
            if (servings > 0) handler(servings);
        });
    }
}

export default new RecipeView();
