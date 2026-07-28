import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Anas — AI Engineer',
  description:
    'AI Engineer specializing in LLM-powered applications, multimodal search systems, and production ML pipelines. Builder of Findify, ShopScout, PlantDoc, and MCP SQL Analyst.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'LLM',
    'LangGraph',
    'FastAPI',
    'CLIP',
    'Weaviate',
    'Muhammad Anas',
    'Portfolio',
  ],
  authors: [{ name: 'Muhammad Anas' }],
  openGraph: {
    title: 'Muhammad Anas — AI Engineer',
    description: 'Building production-grade AI systems that solve real-world problems.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
