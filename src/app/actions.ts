
'use server';

import { enhanceCodeSnippet, type EnhanceCodeSnippetInput, type EnhanceCodeSnippetOutput } from '@/ai/flows/enhance-code-snippet';
import { generateSnippetFromDescription, type GenerateSnippetFromDescriptionInput, type GenerateSnippetFromDescriptionOutput } from '@/ai/flows/generate-snippet-from-description';

export async function enhanceSnippetAction(input: EnhanceCodeSnippetInput): Promise<EnhanceCodeSnippetOutput | { error: string }> {
  try {
    const result = await enhanceCodeSnippet(input);
    return result;
  } catch (error) {
    console.error("Error enhancing snippet:", error);
    // Check if error is an instance of Error and has a message property
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: `Failed to enhance snippet: ${errorMessage}` };
  }
}

export async function generateSnippetAction(input: GenerateSnippetFromDescriptionInput): Promise<GenerateSnippetFromDescriptionOutput | { error: string }> {
  try {
    const result = await generateSnippetFromDescription(input);
    return result;
  } catch (error) {
    console.error("Error generating snippet:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: `Failed to generate snippet: ${errorMessage}` };
  }
}
