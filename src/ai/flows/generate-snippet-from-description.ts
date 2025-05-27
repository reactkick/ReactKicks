// src/ai/flows/generate-snippet-from-description.ts
'use server';

/**
 * @fileOverview Generates a React code snippet from a user-provided description.
 *
 * - generateSnippetFromDescription - A function that generates a React code snippet from a description.
 * - GenerateSnippetFromDescriptionInput - The input type for the generateSnippetFromDescription function.
 * - GenerateSnippetFromDescriptionOutput - The return type for the generateSnippetFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSnippetFromDescriptionInputSchema = z.object({
  description: z
    .string()
    .describe('A description of the React component to generate.'),
});

export type GenerateSnippetFromDescriptionInput = z.infer<
  typeof GenerateSnippetFromDescriptionInputSchema
>;

const GenerateSnippetFromDescriptionOutputSchema = z.object({
  codeSnippet: z
    .string()
    .describe('The generated React code snippet based on the description.'),
});

export type GenerateSnippetFromDescriptionOutput = z.infer<
  typeof GenerateSnippetFromDescriptionOutputSchema
>;

export async function generateSnippetFromDescription(
  input: GenerateSnippetFromDescriptionInput
): Promise<GenerateSnippetFromDescriptionOutput> {
  return generateSnippetFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSnippetFromDescriptionPrompt',
  input: {schema: GenerateSnippetFromDescriptionInputSchema},
  output: {schema: GenerateSnippetFromDescriptionOutputSchema},
  prompt: `You are a React code generation expert.

  Based on the provided description, generate a React code snippet.

  Description: {{{description}}}

  Make sure the code snippet is properly formatted and syntactically correct.
  The code should include necessary imports, component definition, and a basic return statement.
`,
});

const generateSnippetFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateSnippetFromDescriptionFlow',
    inputSchema: GenerateSnippetFromDescriptionInputSchema,
    outputSchema: GenerateSnippetFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
