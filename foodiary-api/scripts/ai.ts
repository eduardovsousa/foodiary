import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI();

async function main() {
  const response = await client.chat.completions.create({
    model: 'gpt-6-luna',
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
