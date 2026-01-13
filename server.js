import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/save-appendix", async (req, res) => {
  const { appendix, doc_link } = req.body;

  const GAS_URL = "PASTE_GAS_URL_HERE";

  await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      appendix,
      status: "COMPLETE",
      doc_link
    })
  });

  res.json({ success: true });
});

app.get("/api/appendix", async (req, res) => {
  const GAS_URL = "PASTE_GAS_URL_HERE";
  const r = await fetch(GAS_URL);
  res.json(await r.json());
});

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
