import createApiClient from "./apiClient";

/**
 * Service for user-related operations.
 */
export const userService = {
  /**
   * Logs in a user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} The response data containing the access token.
   */
  async login(email, password) {
    const apiClient = createApiClient();
    const response = await apiClient.post("/api/v1/auth/authenticate", {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Registers a new user.
   * @param {Object} userData - The user registration data.
   * @param {string} userData.firstName - The user's first name.
   * @param {string} userData.lastName - The user's last name.
   * @param {string} userData.mail - The user's email.
   * @param {string} userData.passkey - The user's password.
   * @returns {Promise<Object>} The response data.
   */
  async register({ firstName, lastName, mail, passkey }) {
    const apiClient = createApiClient();
    const response = await apiClient.post("/api/v1/auth/register", {
      firstName,
      lastName,
      mail,
      passkey,
    });
    return response.data;
  },

  /**
   * Gets the current user's profile.
   * @param {string} token - The authentication token.
   * @returns {Promise<Object>} The user profile data.
   */
  async getCurrentUser(token) {
    const apiClient = createApiClient(token);
    const response = await apiClient.get("/api/v1/auth/me");
    return response.data;
  },

  /**
   * Changes the user's password.
   * @param {string} token - The authentication token.
   * @param {Object} passwords - The password change data.
   * @param {string} passwords.oldPassword - The old password.
   * @param {string} passwords.newPassword - The new password.
   * @returns {Promise<Object>} The response data.
   */
  async changePassword(token, passwords) {
    const apiClient = createApiClient(token);
    const response = await apiClient.post(
      "/api/v1/auth/change-password",
      passwords,
    );
    return response.data;
  },
};
