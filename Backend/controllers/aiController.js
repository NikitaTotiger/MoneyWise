export const getAIInsights = async (req, res) => {
  try {
    const { expenses, budget } = req.body;

    // 🧾 Format expenses nicely
    const expenseSummary = expenses
      .map(
        (exp) =>
          `${exp.title} - ₹${exp.amount} (${exp.category}) on ${exp.date?.substring(0, 10)}`
      )
      .join("\n");

    // 🧠 Prompt
    const prompt = `You are a smart personal finance assistant. Analyze these expenses and give friendly, helpful insights in 4-5 lines. Be specific with numbers.

Monthly Budget: ₹${budget}

Expenses:
${expenseSummary}

Give insights on spending patterns, highest category, whether within budget, and one practical saving tip.`;

    // 🤖 Hugging Face API call

    console.log("Calling HF API...");
    
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // make sure matches .env
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
        }),
      }
    );

    // 📥 Read raw response
    const rawText = await response.text();
    console.log("Raw HF Response:", rawText.substring(0, 500));

    const data = JSON.parse(rawText);

    // ❌ Handle HF errors
    if (data.error) {
      console.log("HF Model Error:", data.error);
      return res.status(500).json({ message: data.error });
    }

    // ✅ Extract result
    const text = data[0]?.generated_text || "No insight generated";

    res.json({ insight: text });

  } catch (error) {
    console.log("HF Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};