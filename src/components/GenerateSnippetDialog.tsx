
"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CodeBlock from './CodeBlock';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SparklesIcon, TerminalIcon } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { generateSnippetAction } from '@/app/actions';
import type { GenerateSnippetFromDescriptionOutput } from '@/ai/flows/generate-snippet-from-description';
import { useToast } from '@/hooks/use-toast';

interface GenerateSnippetDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const GenerateSnippetDialog: React.FC<GenerateSnippetDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [description, setDescription] = useState('');
  const [generatedSnippet, setGeneratedSnippet] = useState<GenerateSnippetFromDescriptionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({ title: "Description needed", description: "Please enter a description for the snippet.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedSnippet(null);

    const result = await generateSnippetAction({ description });
    setIsLoading(false);

    if ('error' in result) {
      setError(result.error);
      toast({ title: "Generation Failed", description: result.error, variant: "destructive" });
    } else {
      setGeneratedSnippet(result);
      toast({ title: "Snippet Generated!", description: "AI has generated a new code snippet for you." });
    }
  };
  
  const handleClose = () => {
    setDescription('');
    setGeneratedSnippet(null);
    setError(null);
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-full h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <SparklesIcon className="mr-2 h-6 w-6 text-primary" />
            Generate New Snippet with AI
          </DialogTitle>
          <DialogDescription>
            Describe the React component or hook you want to generate.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow overflow-y-auto pr-2 -mr-2 py-4">
          <div className="space-y-4">
            <Textarea
              placeholder="e.g., A React component that displays a user profile card with an avatar, name, and email."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="text-sm"
            />
            
            {isLoading && (
              <div className="flex items-center justify-center border rounded-md p-4 bg-muted/30 min-h-[100px]">
                <TerminalIcon className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Generating snippet...</p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error Generating Snippet</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {generatedSnippet && generatedSnippet.codeSnippet && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Generated Snippet</h3>
                <CodeBlock code={generatedSnippet.codeSnippet} />
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="pt-4 mt-auto border-t">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleGenerate} disabled={isLoading || !description.trim()}>
            {isLoading ? 'Generating...' : 'Generate Snippet'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateSnippetDialog;
