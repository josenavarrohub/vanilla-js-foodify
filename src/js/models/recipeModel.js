// Configuration
import { API_URL, RECIPES_PER_PAGE } from '../config.js';

// Helpers
import { fetchJSON } from '../helpers.js';

// State for the application
export const state = {
    recipe: {},
    search: {
      query: '',
      recipes: [],
      currentPage: 1,
    },
};

/**
 * Fetch the recipe from the API.
 *
 * @param {string} recipeId - The recipe id.
 */
export const fetchRecipe = async (recipeId) => {
  try {
    // Fetch the recipe
    const data = await fetchJSON(`${API_URL}${recipeId}`);
    const { recipe } = data.data;

    // Update the state
    state.recipe = {
      id: recipe.id,
      img: recipe.image_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      publisher: recipe.publisher,
      url: recipe.source_url,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch the recipes from the API.
 *
 * @param {string} query - The term to search for.
 */
export const fetchRecipes = async (query) => {
  try {
    // Fetch the recipes
    const data = await fetchJSON(`${API_URL}?search=${query}`);
    let { recipes } = data.data;

    // Update the state
    state.search.query = query;
    state.search.recipes = recipes.map(recipe => ({
      id: recipe.id,
      img: recipe.image_url,
      title: recipe.title,
      publisher: recipe.publisher,
    }));
  } catch (error) {
    throw error;
  }
};

/**
 * It returns a number of recipes per page.
 *
 * @param {number} page - The page index.
 */
export const getRecipesPerPage = (currentPage = state.search.currentPage) => {
  // Update the state
  state.search.currentPage = currentPage;

  // Slice the array of recipes
  const start = (currentPage - 1) * RECIPES_PER_PAGE;
  const end = currentPage * RECIPES_PER_PAGE;
  return {
    query: state.search.query,
    recipes: state.search.recipes.slice(start, end)
  };
};

/**
 * Update servings.
 *
 * @param {number} servings - The number of servings.
 */
export const updateServings = (servings) => {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = servings * ingredient.quantity / state.recipe.servings;
  });
  state.recipe.servings = servings;
};
