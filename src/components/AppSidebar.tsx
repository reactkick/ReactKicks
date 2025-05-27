
"use client";

import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categories, type CategoryInfo } from '@/lib/snippets';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface AppSidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>
      </SidebarHeader>
      <SidebarContent asChild>
        <ScrollArea className="flex-1">
          <SidebarMenu className="p-4 pt-0">
            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onSelectCategory(null)}
                  isActive={selectedCategory === null}
                  className="w-full"
                  tooltip="All Snippets"
                >
                  All Snippets
                </SidebarMenuButton>
              </SidebarMenuItem>
              {categories.map((category: CategoryInfo) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton
                    onClick={() => onSelectCategory(category.name)}
                    isActive={selectedCategory === category.name}
                    className="w-full"
                    tooltip={category.name}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroup>
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
