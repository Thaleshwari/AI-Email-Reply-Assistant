const express = require("express");
const router = express.Router();
const { generateEmailReply } = require("../services/emailService");

/**
 * Equivalent to Spring Boot's EmailGeneratorController.java
 *
 * @PostMapping("/generate")
 * Maps to: POST /api/email/generate
 */
router.post("/generate", async (req, res) => {
  try {
    // req.body maps to @RequestBody EmailRequest
    const { emailContent, tone } = req.body;

    if (!emailContent || emailContent.trim() === "") {
      return res.status(400).json({ error: "emailContent is required." });
    }

    const emailRequest = { emailContent, tone };
    const reply = await generateEmailReply(emailRequest);

    // Equivalent to ResponseEntity.ok(response)
    res.status(200).send(reply);
  } catch (error) {
    console.error("Error generating email reply:", error.message);
    res.status(500).json({ error: "Failed to generate email reply." });
  }
});

module.exports = router;
