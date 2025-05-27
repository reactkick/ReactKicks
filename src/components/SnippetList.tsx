
import React from 'react';
import SnippetCard from './SnippetCard';
import type { Snippet } from '@/lib/snippets';

interface SnippetListProps {
  snippets: Snippet[];
  onEnhanceClick: (snippet: Snippet) => void;
}

const SnippetList: React.FC<SnippetListProps> = ({ snippets, onEnhanceClick }) => {
  if (snippets.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No snippets found. Try adjusting your search or category.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} onEnhanceClick={onEnhanceClick} />
      ))}
    </div>
  );
};

export default SnippetList;
