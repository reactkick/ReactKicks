
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from 'lucide-react';
import CodeBlock from './CodeBlock';
import type { Snippet } from '@/lib/snippets';

interface SnippetCardProps {
  snippet: Snippet;
  onEnhanceClick: (snippet: Snippet) => void;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, onEnhanceClick }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">{snippet.title}</CardTitle>
        <CardDescription className="text-sm pt-1">{snippet.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock code={snippet.code} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onEnhanceClick(snippet)} variant="outline" size="sm">
          <SparklesIcon className="mr-2 h-4 w-4 text-primary" />
          Enhance with AI
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SnippetCard;
