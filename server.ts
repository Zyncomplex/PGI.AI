import "dotenv/config";
import express from "express";

import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Initialize Gemini API
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/qa/analyze", async (req, res) => {
    try {
      const { transcript, agent_id, institution, country, call_date, zaderma_call_id } = req.body;

      if (!transcript || transcript.length < 200) {
        return res.status(400).json({ success: false, error: "TRANSCRIPT_TOO_SHORT", message: "Transcript must be at least 200 characters." });
      }

      const prompt = `
You are a call quality analyst for Paragon Global Internships (PGI), Malta. You evaluate calls by Erasmus+ appointment setters.

PGI is a Malta-based Erasmus+ partner. Agents cold-call Erasmus+ coordinators at European universities to book meetings with Dr. Nadia (Director). Calls follow a structured script.

You must evaluate the transcript against 10 QA criteria. Each criterion gets a score of 0 (not done), 0.5 (partially done), or 1 (fully done).
1. Proper Introduction: 0 (No intro), 0.5 (Name or company but not both + destination), 1 (Name, PGI, Malta, Erasmus+ 21yr partner)
2. Right Person Reached: 0 (Never verified), 0.5 (Asked if coordinator but didn't confirm), 1 (Confirmed Erasmus+ Coordinator or equivalent)
3. Legacy Numbers: 0 (No stats), 0.5 (1-2 stats), 1 (All 5: 21yr, 4500, 45000, 900, 95%)
4. Reason for Call: 0 (Unclear), 0.5 (Vague about internships), 1 (Clearly stated internship collaboration purpose)
5. Requirements Asked: 0 (Asked nothing), 0.5 (Asked 1-2 questions), 1 (Asked about student numbers, departments, duration, timing)
6. Brand Card (3+4): 0 (No value phrases), 0.5 (Some but missing key ones), 1 (Used 3+4 phrases: one-stop-shop, academic directors, Malta English EU)
7. Needs Discovery: 0 (Never asked about challenges), 0.5 (Asked vaguely), 1 (Asked specifically about current challenges)
8. USPs & Value: 0 (No PGI advantages), 0.5 (Mentioned one USP), 1 (Highlighted one-stop-shop + English EU country + PGI differentiators)
9. Tangible Outcome: 0 (No concrete benefit), 0.5 (Generic benefit), 1 (Specific outcome tied to their situation)
10. Clear Buy-In: 0 (No next step), 0.5 (Vague "we'll be in touch"), 1 (Meeting booked with specific date and time, or explicit agreed callback)

You must also evaluate 8 qualification fields (true if confirmed clearly, false if vague or missing):
1. Student Sending Timeline
2. Student Volume
3. Department / Faculty
4. Current Challenges
5. Decision Maker Confirmed
6. Interest Level
7. Program Relevance
8. Basic Alignment

Respond ONLY with valid JSON matching this exact schema:
{
  "scores": [number, number, number, number, number, number, number, number, number, number], // Exactly 10 values (0, 0.5, or 1)
  "feedback": [string, string, string, string, string, string, string, string, string, string], // Exactly 10 strings
  "qualification_fields": [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean], // Exactly 8 booleans
  "classification": "APPOINTMENT" | "ENGAGEMENT", // "APPOINTMENT" if all 8 qualification fields are true, else "ENGAGEMENT"
  "classification_reason": string,
  "summary": string, // 2-3 sentences overall assessment
  "semantic_note": string, // One sentence on conversation control
  "strengths": [string, string], // Exactly 2 specific strengths
  "improvements": [string, string] // Exactly 2 actionable improvements
}

TRANSCRIPT:
${transcript}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0,
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      const parsedResponse = JSON.parse(responseText);

      // Server-side calculations and overrides
      const total = parsedResponse.scores.reduce((a: number, b: number) => a + b, 0);
      const fields_confirmed = parsedResponse.qualification_fields.filter((f: boolean) => f).length;
      
      let classification = parsedResponse.classification;
      let override_applied = false;
      if (fields_confirmed < 8 && classification === "APPOINTMENT") {
        classification = "ENGAGEMENT";
        override_applied = true;
      }

      const finalData = {
        ...parsedResponse,
        total,
        fields_confirmed,
        classification,
        model_used: "gemini-2.5-flash",
        processing_ms: 1000, // Mocked for now
        validated: true,
        override_applied,
        created_at: new Date().toISOString()
      };

      res.json({ success: true, data: finalData });

    } catch (error) {
      console.error("QA Analysis Error:", error);
      res.status(500).json({ success: false, error: "AI_VALIDATION_FAILED", message: "Failed to analyze transcript" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
