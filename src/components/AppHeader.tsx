
"use client";

import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { CodeXmlIcon, SparklesIcon } from 'lucide-react';

interface AppHeaderProps {
  onGenerateNewClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onGenerateNewClick }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <CodeXmlIcon className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          React Kickstart
        </h1>
      </div>
      <div className="ml-auto">
        <Button onClick={onGenerateNewClick} variant="outline">
          <SparklesIcon className="mr-2 h-4 w-4" />
          Generate New Snippet
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
