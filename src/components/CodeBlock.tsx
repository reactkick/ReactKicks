
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeBlockProps {
  code: string;
  language?: string; // For future syntax highlighting
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'jsx' }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "The code snippet has been copied.",
      });
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "Could not copy the code to clipboard.",
        variant: "destructive",
      });
      console.error('Failed to copy text: ', err);
    });
  };

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  // Basic syntax highlighting (can be improved with a library like Prism.js or Highlight.js)
  // For now, just wrap in pre and code tags with Geist Mono font
  return (
    <div className="relative rounded-md border bg-muted/30 group">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onCopy}
        aria-label="Copy code"
      >
        {hasCopied ? (
          <CheckIcon className="h-4 w-4 text-green-500" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </Button>
      <ScrollArea className="max-h-[400px] p-4">
        <pre className="text-sm font-mono whitespace-pre-wrap break-all">
          <code>{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
};

export default CodeBlock;
