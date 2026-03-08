require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello Claude! Say hello back." }],
  });
  console.log(message.content[0].text);
}

main().catch(console.error);
