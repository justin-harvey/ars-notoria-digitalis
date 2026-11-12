const { onCall } = require("firebase-functions/v2/https");
const axios = require("axios");

exports.verifyGumroadKey = onCall({
  region: "us-central1",
  cors: true
}, async (request) => {
  const { productId, licenseKey, incrementUses = true } = request.data;

  if (!productId || !licenseKey) {
    return { valid: false, message: "Missing product ID or license key" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("product_id", productId);
    formData.append("license_key", licenseKey);
    formData.append("increment_uses_count", incrementUses ? "true" : "false");

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
      return {
        valid: true,
        uses: result.uses,
        email: result.purchase?.email || null
      };
    } else {
      return {
        valid: false,
        message: result.message || "Invalid license key"
      };
    }
  } catch (error) {
    console.error("Error verifying Gumroad license:", error);
    return {
      valid: false,
      message: "Error verifying license. Please try again."
    };
  }
});
