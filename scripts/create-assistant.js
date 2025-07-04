import OpenAI from 'openai';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf8');
const apiKey = envContent.match(/VITE_OPENAI_API_KEY=(.+)/)?.[1];

if (!apiKey) {
  console.error('❌ VITE_OPENAI_API_KEY not found in .env file');
  process.exit(1);
}

const openai = new OpenAI({ apiKey });

async function createAssistant() {
  try {
    console.log('🔄 Creating OpenAI Assistant...');

    const assistant = await openai.beta.assistants.create({
      name: "City Explorer Assistant",
      instructions: `You are a helpful assistant for the City Explorer app. You help users explore cities, understand locations, and provide information about places they mention.

When users mention addresses or locations, you should:
1. Acknowledge the location they mentioned
2. Provide interesting information about that area
3. Ask follow-up questions to help them explore more

Be friendly, informative, and conversational. Help users discover interesting things about the places they're discussing.`,
      model: "gpt-4o",
      tools: [
        { type: "code_interpreter" }
      ]
    });

    console.log('✅ Assistant created successfully!');
    console.log(`Assistant ID: ${assistant.id}`);
    console.log(`Assistant Name: ${assistant.name}`);

    // Update .env file
    const newEnvContent = envContent.replace(
      /VITE_ASSISTANT_ID=.*/,
      `VITE_ASSISTANT_ID=${assistant.id}`
    );

    writeFileSync(envPath, newEnvContent);
    console.log('✅ .env file updated with new Assistant ID');

    return assistant;
  } catch (error) {
    console.error('❌ Error creating assistant:', error);
    process.exit(1);
  }
}

createAssistant();
