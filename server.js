import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/* ================= CONFIG ================= */
const APPENDIX_API =
  "https://script.google.com/macros/s/AKfycbzg6BOlxx_WPGIINcn5GvcBFqGZBFoS8pg8lPG8RGrsBQyhjMiXmgnf6PcBYIO2FDifew/exec";

/* ================= SAVE ENDPOINT ================= */
app.post("/api/save-appendix", async (req, res) => {
  try {
    const { appendix, doc_link } = req.body;

    if (!appendix || !doc_link) {
      return res.status(400).json({ error: "Missing data" });
    }

    const url =
      APPENDIX_API +
      "?action=save" +
      "&appendix=" + encodeURIComponent(appendix) +
      "&doc_link=" + encodeURIComponent(doc_link);

    const response = await fetch(url);
    const text = await response.text();

    res.json({ success: true, gas: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

/* ================= STATIC FRONTEND ================= */
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
