// Polyfills
import '../polyfills.js';

// Models
import * as recipeModel from '../models/recipeModel.js';

// Views
import recipeView from '../views/recipeView.js';
import recipesView from '../views/recipesView.js';
import paginationView from '../views/paginationView.js';
import searchView from '../views/searchView.js';

/**
 * It controls the recipe.
 */
const controlRecipe = async () => {
  try {
    // Hash
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    // Render loading
    recipeView.renderLoading();

    // Fetch recipe
    await recipeModel.fetchRecipe(recipeId);

    // Render data
    recipeView.renderData(recipeModel.state.recipe);
  } catch (error) {
    recipeView.renderError(error.name, error.message);
  }
};

/**
 * It controls the recipes.
 */
const controlRecipes = async () => {
  try {
    // Get input value
    const search = searchView.getInputValue();
    if (!search) return;

    // Render loading
    recipesView.renderLoading();

    // Fetch recipes
    await recipeModel.fetchRecipes(search);

    // If the data is empty
    if (recipeModel.state.search.recipes.length === 0) throw new Error('There are no results for your search.');

    // Render recipes
    recipesView.renderData(recipeModel.getRecipesPerPage(1));

    // Render pagination
    paginationView.renderData(recipeModel.state.search);
  } catch (error) {
    recipesView.renderError(error.name, error.message);
  }
};

/**
 * It controls the pagination.
 */
const controlPagination = (page) => {
  // Render recipes
  recipesView.renderData(recipeModel.getRecipesPerPage(page));

  // Render pagination
  paginationView.renderData(recipeModel.state.search);
};

/**
 * It updates the servings.
 */
const controlUpdateServings = (servings) => {
  // Update the state
  recipeModel.updateServings(servings);

  // Render data
  recipeView.renderData(recipeModel.state.recipe);
};

/**
 * It initializes the app.
 */
const init = () => {
  // Recipe
  recipeView.subscribeRender(controlRecipe);
  recipeView.subscribeUpdateServings(controlUpdateServings);

  // Recipes
  recipesView.subscribeRender(controlRecipes);
  
  // Search
  searchView.subscribeRender(controlRecipes);
  
  // Pagination
  paginationView.subscribeRender(controlPagination);
};
init();
