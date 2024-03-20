const { app } = require("@azure/functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.http("chat", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const body = await request.json();
    context.log(body);
    if (!body || !body.message) {
      return {
        status: 400,
        body: {
          message:
            "No message provided. Body should be {message: String, history?:[]}",
        },
      };
    }
    const { message = "", history = [] } = body;

    const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log(JSON.stringify(history));
    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text || "" }],
      })),
    });

    // console.log(msg);
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    return { body: JSON.stringify({ message: text }) };
    
  },
});
