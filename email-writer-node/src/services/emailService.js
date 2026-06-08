const axios = require("axios");

/**
 * Equivalent to Spring Boot's EmailGeneratorService.java
 * Handles Gemini API communication and prompt construction.
 */

/**
 * Builds the prompt string from the email request.
 * Mirrors: buildPrompt(EmailRequest emailRequest)
 */
function buildPrompt(emailRequest) {
  let prompt =
    "Generate a professional email reply for the following email content. Please don't generate subject line.";

  if (emailRequest.tone && emailRequest.tone.trim() !== "") {
    prompt += ` Use a ${emailRequest.tone} tone.`;
  }

  prompt += `\n\nOriginal Email:\n${emailRequest.emailContent}`;
  return prompt;
}

/**
 * Extracts the generated text from the Gemini API response.
 * Mirrors: extractResponseContent(String response)
 */
function extractResponseContent(responseData) {
  try {
    return responseData.candidates[0].content.parts[0].text;
  } catch (error) {
    return "Error Processing request: " + error.message;
  }
}

/**
 * Calls Gemini API and returns the generated email reply.
 * Mirrors: generateEmailReply(EmailRequest emailRequest)
 */
async function generateEmailReply(emailRequest) {
  const prompt = buildPrompt(emailRequest);

  // Craft the request body (same structure as the Java Map.of(...))
  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const geminiApiUrl = process.env.GEMINI_API_URL;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  // POST to Gemini API — equivalent to webClient.post()...
  const response = await axios.post(
    `${geminiApiUrl}?key=${geminiApiKey}`,
    requestBody,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return extractResponseContent(response.data);
}

module.exports = { generateEmailReply };
