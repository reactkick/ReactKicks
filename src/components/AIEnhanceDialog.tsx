
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CodeBlock from './CodeBlock';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LightbulbIcon, ThumbsUpIcon, ThumbsDownIcon, TerminalIcon } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import type { EnhanceCodeSnippetOutput } from '@/ai/flows/enhance-code-snippet';

interface AIEnhanceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  originalCode: string;
  enhancementResult: (EnhanceCodeSnippetOutput & { error?: undefined }) | { error: string } | null;
  isLoading: boolean;
}

const AIEnhanceDialog: React.FC<AIEnhanceDialogProps> = ({
  isOpen,
  onOpenChange,
  originalCode,
  enhancementResult,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <LightbulbIcon className="mr-2 h-6 w-6 text-primary" />
            AI Code Enhancement
          </DialogTitle>
          <DialogDescription>
            Review the AI-powered suggestions to improve your code snippet.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow overflow-y-auto pr-2 -mr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Original Code</h3>
              <CodeBlock code={originalCode} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">AI Suggestion</h3>
              {isLoading && (
                <div className="flex items-center justify-center h-full border rounded-md p-4 bg-muted/30">
                  <TerminalIcon className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2 text-muted-foreground">Analyzing your code...</p>
                </div>
              )}
              {enhancementResult && !isLoading && (
                <>
                  {enhancementResult.error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{enhancementResult.error}</AlertDescription>
                    </Alert>
                  )}
                  {'enhancedCodeSnippet' in enhancementResult && enhancementResult.enhancedCodeSnippet && (
                    <>
                      {enhancementResult.isImproved ? (
                         <Alert className="mb-4 border-green-500 bg-green-500/10">
                           <ThumbsUpIcon className="h-5 w-5 text-green-600" />
                           <AlertTitle className="text-green-700">Code Improved!</AlertTitle>
                           <AlertDescription className="text-green-600">
                             {enhancementResult.explanation}
                           </AlertDescription>
                         </Alert>
                      ) : (
                        <Alert className="mb-4 border-blue-500 bg-blue-500/10">
                          <ThumbsDownIcon className="h-5 w-5 text-blue-600" />
                          <AlertTitle className="text-blue-700">No major improvements needed.</AlertTitle>
                          <AlertDescription className="text-blue-600">
                            {enhancementResult.explanation || "The AI found no significant improvements for this snippet."}
                          </AlertDescription>
                        </Alert>
                      )}
                      <CodeBlock code={enhancementResult.enhancedCodeSnippet} />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="pt-4 mt-auto border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIEnhanceDialog;
