/**
 * Firebase Cloud Function for Gumroad License Verification
 *
 * SETUP INSTRUCTIONS:
 * 1. Navigate to your Firebase project folder in terminal
 * 2. Run: firebase init functions (if not already done)
 * 3. Run: cd functions && npm install axios
 * 4. Replace functions/index.js with this code
 * 5. Run: firebase deploy --only functions
 *
 * This will create the verifyGumroadKey callable function
 */

const { onCall } = require("firebase-functions/v2/https");
const axios = require("axios");

/**
 * Verify Gumroad License Key
 *
 * @param {Object} request.data
 * @param {string} request.data.productId - Gumroad product ID (long base64 string)
 * @param {string} request.data.licenseKey - License key provided by user
 * @param {boolean} request.data.incrementUses - Whether to count this as an activation (default: true)
 *
 * @returns {Object} { valid: boolean, uses?: number, email?: string, message?: string }
 */
exports.verifyGumroadKey = onCall({
  region: "us-central1",
  cors: true // Allow CORS for web access
}, async (request) => {
  const { productId, licenseKey, incrementUses = true } = request.data;

  // Validate input
  if (!productId || !licenseKey) {
    throw new Error("Missing productId or licenseKey");
  }

  try {
    // Prepare form data for Gumroad API
    const formData = new URLSearchParams();
    formData.append("product_id", productId);
    formData.append("license_key", licenseKey);
    formData.append("increment_uses_count", incrementUses ? "true" : "false");

    // Call Gumroad verification API
    const response = await axios.post(
      "https://api.gumroad.com/v2/licenses/verify",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const result = response.data;

    if (result.success) {
      // Valid license key
      return {
        valid: true,
        uses: result.uses || 0,
        // Optionally return purchase info (be careful with sensitive data)
        email: result.purchase?.email || null,
        purchaseDate: result.purchase?.created_at || null
      };
    } else {
      // Invalid license key
      return {
        valid: false,
        message: result.message || "Invalid license key"
      };
    }
  } catch (error) {
    // Log error for debugging
    console.error("Gumroad verification error:", error.message);

    // Return user-friendly error
    throw new Error("Verification failed. Please try again later.");
  }
});

/**
 * OPTIONAL: Function to check if key has been used too many times
 * Useful if you want to limit activations (e.g., max 3 devices)
 */
exports.checkKeyUsage = onCall({
  region: "us-central1",
  cors: true
}, async (request) => {
  const { productId, licenseKey } = request.data;

  if (!productId || !licenseKey) {
    throw new Error("Missing productId or licenseKey");
  }

  try {
    const formData = new URLSearchParams();
    formData.append("product_id", productId);
    formData.append("license_key", licenseKey);
    formData.append("increment_uses_count", "false"); // Don't increment, just check

    const response = await axios.post(
      "https://api.gumroad.com/v2/licenses/verify",
      formData.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const result = response.data;

    if (result.success) {
      return {
        valid: true,
        uses: result.uses || 0,
        maxUses: result.purchase?.max_uses || null
      };
    } else {
      return { valid: false };
    }
  } catch (error) {
    console.error("Usage check error:", error.message);
    throw new Error("Could not check usage");
  }
});
