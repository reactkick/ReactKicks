// src/ai/flows/enhance-code-snippet.ts
'use server';

/**
 * @fileOverview An AI agent that suggests improvements to React code snippets.
 *
 * - enhanceCodeSnippet - A function that handles the code enhancement process.
 * - EnhanceCodeSnippetInput - The input type for the enhanceCodeSnippet function.
 * - EnhanceCodeSnippetOutput - The return type for the enhanceCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceCodeSnippetInputSchema = z.object({
  codeSnippet: z
    .string()
    .describe('The React code snippet to be enhanced.'),
});
export type EnhanceCodeSnippetInput = z.infer<typeof EnhanceCodeSnippetInputSchema>;

const EnhanceCodeSnippetOutputSchema = z.object({
  enhancedCodeSnippet: z.string().describe('The enhanced React code snippet with suggested improvements.'),
  explanation: z.string().describe('A brief explanation of the improvements made to the code snippet.'),
  isImproved: z.boolean().describe('Whether or not the code was improved.'),
});
export type EnhanceCodeSnippetOutput = z.infer<typeof EnhanceCodeSnippetOutputSchema>;

export async function enhanceCodeSnippet(input: EnhanceCodeSnippetInput): Promise<EnhanceCodeSnippetOutput> {
  return enhanceCodeSnippetFlow(input);
}

const needsImprovementTool = ai.defineTool({
  name: 'needsImprovement',
  description: 'Determine if the given code snippet needs improvement.',
  inputSchema: z.object({
    codeSnippet: z.string().describe('The code snippet to analyze.'),
  }),
  outputSchema: z.boolean().describe('Whether the code snippet needs improvement (true) or not (false).'),
},
async (input) => {
  const { codeSnippet } = input;

  // Use a smaller, cheaper model to determine if the code even needs improvement.
  const { text } = await ai.generate({
    prompt: `Does the following code snippet need improvements? Answer true or false.\n\n${codeSnippet}`,
    model: 'gemini-0.7b',
    config: {
      temperature: 0.2,
    },
  });
  return text?.toLowerCase().includes('true') ?? false;
});

const enhanceCodeSnippetPrompt = ai.definePrompt({
  name: 'enhanceCodeSnippetPrompt',
  input: {schema: EnhanceCodeSnippetInputSchema},
  output: {schema: EnhanceCodeSnippetOutputSchema},
  tools: [needsImprovementTool],
  prompt: `You are an AI expert in React code.  Your job is to improve the given React code snippet based on best practices.

  First, use the needsImprovement tool to determine if the code needs improvement.  If it does not, then return the original code snippet and set isImproved to false.

  If the code snippet needs improvement, then return an improved version of the code snippet and set isImproved to true.  Also, provide a brief explanation of the improvements made.

  Code Snippet: {{{codeSnippet}}}`,
});

const enhanceCodeSnippetFlow = ai.defineFlow(
  {
    name: 'enhanceCodeSnippetFlow',
    inputSchema: EnhanceCodeSnippetInputSchema,
    outputSchema: EnhanceCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await enhanceCodeSnippetPrompt(input);
    return output!;
  }
);

