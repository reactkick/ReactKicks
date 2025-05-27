
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Component, Anchor, DatabaseZap, Puzzle, Settings2, TestTube2, Palette } from 'lucide-react';

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  keywords: string[];
}

export interface CategoryInfo {
  name: string;
  icon: LucideIcon;
}

export const categories: CategoryInfo[] = [
  { name: 'Layout', icon: LayoutDashboard },
  { name: 'Components', icon: Component },
  { name: 'Hooks', icon: Anchor },
  { name: 'Data Fetching', icon: DatabaseZap },
  { name: 'Styling', icon: Palette },
  { name: 'State Management', icon: Settings2 },
  { name: 'Testing', icon: TestTube2 },
  { name: 'Utilities', icon: Puzzle },
];

export const snippets: Snippet[] = [
  {
    id: 'basic-functional-component',
    title: 'Basic Functional Component',
    description: 'A simple functional React component that displays a greeting message. This is the most fundamental building block in React.',
    code: `import React from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;`,
    category: 'Components',
    keywords: ['functional component', 'props', 'basic'],
  },
  {
    id: 'usestate-hook',
    title: 'useState Hook Example',
    description: 'Demonstrates the use of the useState hook for managing local component state. Ideal for simple state like counters or form inputs.',
    code: `import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default Counter;`,
    category: 'Hooks',
    keywords: ['useState', 'state', 'hook', 'counter'],
  },
  {
    id: 'useeffect-hook',
    title: 'useEffect Hook Example',
    description: 'Shows how to use the useEffect hook for side effects, such as data fetching or subscriptions. Runs after every render or when dependencies change.',
    code: `import React, { useState, useEffect } from 'react';

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData("Data fetched successfully!");
    }, 1000);
  }, []); // Empty dependency array means this effect runs once on mount

  return <p>{data ? data : "Loading..."}</p>;
};

export default DataFetcher;`,
    category: 'Hooks',
    keywords: ['useEffect', 'side effects', 'lifecycle', 'data fetching'],
  },
  {
    id: 'simple-layout',
    title: 'Simple Page Layout',
    description: 'A basic page layout component with a header, main content area, and footer. Useful as a starting point for structuring application pages.',
    code: `import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const SimpleLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ background: '#eee', padding: '1rem' }}>
        <h1>My App</h1>
      </header>
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        {children}
      </main>
      <footer style={{ background: '#eee', padding: '1rem', textAlign: 'center' }}>
        <p>© 2024 My App</p>
      </footer>
    </div>
  );
};

export default SimpleLayout;`,
    category: 'Layout',
    keywords: ['layout', 'structure', 'header', 'footer', 'main'],
  },
  {
    id: 'fetch-api',
    title: 'Fetch API Data',
    description: 'A component that fetches data from an API using the native Fetch API and displays it. Includes basic loading and error handling states.',
    code: `import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
}

const FetchDataComponent: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{post?.title}</h2>
    </div>
  );
};

export default FetchDataComponent;`,
    category: 'Data Fetching',
    keywords: ['fetch', 'api', 'http', 'request', 'promise'],
  }
];
