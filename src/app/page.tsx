
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import SnippetList from '@/components/SnippetList';
import AIEnhanceDialog from '@/components/AIEnhanceDialog';
import GenerateSnippetDialog from '@/components/GenerateSnippetDialog';
import { snippets as allSnippets, type Snippet } from '@/lib/snippets';
import { enhanceSnippetAction } from '@/app/actions';
import type { EnhanceCodeSnippetOutput } from '@/ai/flows/enhance-code-snippet';
import { useToast } from '@/hooks/use-toast';
import { SidebarInset } from '@/components/ui/sidebar'; // For the main content area layout with sidebar

export default function ReactKickstartPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEnhanceDialogOpen, setIsEnhanceDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [currentSnippetForEnhancement, setCurrentSnippetForEnhancement] = useState<Snippet | null>(null);
  const [enhancementResult, setEnhancementResult] = useState<(EnhanceCodeSnippetOutput & { error?: undefined }) | { error: string } | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();

  // Client-side hydration check
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);


  const filteredSnippets = useMemo(() => {
    return allSnippets.filter(snippet => {
      const categoryMatch = selectedCategory ? snippet.category === selectedCategory : true;
      const searchTermMatch = searchTerm 
        ? snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      return categoryMatch && searchTermMatch;
    });
  }, [selectedCategory, searchTerm]);

  const handleEnhanceClick = async (snippet: Snippet) => {
    setCurrentSnippetForEnhancement(snippet);
    setIsEnhanceDialogOpen(true);
    setIsEnhancing(true);
    setEnhancementResult(null); // Clear previous results
    
    const result = await enhanceSnippetAction({ codeSnippet: snippet.code });
    setEnhancementResult(result);
    setIsEnhancing(false);

    if (result && 'error' in result && result.error) {
      toast({
        title: "AI Enhancement Failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
       toast({
        title: "AI Analysis Complete",
        description: "Review the suggestions for your code.",
      });
    }
  };
  
  const handleOpenGenerateDialog = () => {
    setIsGenerateDialogOpen(true);
  };

  if (!hasMounted) {
    // Render a loading state or null to avoid hydration mismatch
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <AppHeader onGenerateNewClick={handleOpenGenerateDialog} />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <SidebarInset className="flex-1 overflow-y-auto">
          <SnippetList snippets={filteredSnippets} onEnhanceClick={handleEnhanceClick} />
        </SidebarInset>
      </div>
      {currentSnippetForEnhancement && (
        <AIEnhanceDialog
          isOpen={isEnhanceDialogOpen}
          onOpenChange={setIsEnhanceDialogOpen}
          originalCode={currentSnippetForEnhancement.code}
          enhancementResult={enhancementResult}
          isLoading={isEnhancing}
        />
      )}
      <GenerateSnippetDialog
        isOpen={isGenerateDialogOpen}
        onOpenChange={setIsGenerateDialogOpen}
      />
    </div>
  );
}
