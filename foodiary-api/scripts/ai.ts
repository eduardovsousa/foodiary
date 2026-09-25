import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'nex-n2.5-mini:free',
    messages: [
      {
        role: 'system',
        content: 'Sempre responda o usuário utilizando gírias',
      },
      {
        role: 'assistant',
        content: 'Comi 100g de arroz branco, 200g de patinho e 20 gramas de feijão preto.',
      },
    ],
  });

  console.log(JSON.stringify(response, null, 2));
}

main();
