const { app } = require("@azure/functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function chat(request, context) {
  context.log(`Http function processed request for url "${request.url}"`);
  // check if contain message
  if (!request.body || !request.body.message) {
    return {
      status: 400,
      body: "Message is required",
    };
  }
  /**
   * @type {{message: string, history: [{role: "user"|"bot", text: string}]}}
   */
  const body = request.body;

  // see https://ai.google.dev/tutorials/node_quickstart#multi-turn-conversations-chat

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: body.history.map((entry) => ({
      // remap client side history to server side
      role: entry.role === "user" ? "user" : "model",
      parts: entry.text,
    })),
  });

  const result = await chat.sendMessage(body.message);
  const response = await result.response;
  const text = response.text();
  return {
    status: 200,
    message: text,
  };
}

app.http("chat", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: chat,
});
