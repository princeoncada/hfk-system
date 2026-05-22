import OpenAI from 'openai'

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
  baseURL: 'https://api.deepseek.com',
})

export interface GenerateOptions {
  systemPrompt: string
  userMessage: string
  temperature?: number
  maxTokens?: number
}

export async function generate(options: GenerateOptions): Promise<string> {
  if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is not set. Add it to your .env file.')
  }

  const response = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    response_format: { type: 'json_object' },
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1500,
    messages: [
      { role: 'system', content: options.systemPrompt },
      { role: 'user', content: options.userMessage },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('DeepSeek returned an empty response.')
  }

  return content
}
