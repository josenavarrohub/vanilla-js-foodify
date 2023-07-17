// Configuration
import { API_TIMEOUT } from "./config";

/**
 * It makes an HTTP request using fetch and adds a timeout.
 * @param {string} url - The URL to make the HTTP request to.
 * @returns {Promise} A Promise that resolves to the response data or rejects with an error.
 */
export const fetchJSON = async (url) => {
    // Fetch Promise
    const fetchPromise = fetch(url);
    
    // Timeout Promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timed out (${API_TIMEOUT} seconds).`));
      }, API_TIMEOUT * 1000);
    });
  
    try {
        // Race of promises
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        if (!response.ok) throw new Error(`${response.status} (${response.statusText})`);

        // Data
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
