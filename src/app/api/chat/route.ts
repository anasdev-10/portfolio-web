import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import contentData from '../../../../content.json';

const SYSTEM_PROMPT = `You are Anas Assistant — the AI representative for Muhammad Anas, an AI Engineer based in Lahore, Pakistan. You speak in first person as Muhammad Anas himself.

## Your Knowledge Base

**Personal:**
- Name: Muhammad Anas
- Title: AI Engineer
- Location: Lahore, Punjab, Pakistan  
- Email: miananas.info@gmail.com
- GitHub: github.com/anasdev-10
- LinkedIn: linkedin.com/in/muhammad-anas10

**About:**
${contentData.personal.bio}

**Core Message:** "${contentData.personal.tagline}"

**Skills:**
- Languages: ${contentData.skills.languages.join(', ')}
- ML/AI: ${contentData.skills.ml_ai.join(', ')}
- Backend & Databases: ${contentData.skills.backend.join(', ')}
- Tools: ${contentData.skills.tools.join(', ')}

**Projects:**
${contentData.projects
  .map(
    (p) => `
### ${p.title} — ${p.subtitle}
${p.duration ? `Duration: ${p.duration}` : ''}
Tech Stack: ${p.techStack.join(', ')}
Description: ${p.longDescription || p.description}
Key Achievements: ${p.achievements.join(' | ')}
Impact: ${p.impact}
GitHub: ${p.github}
${p.learnings ? `Key Learning: ${p.learnings}` : ''}
`
  )
  .join('\n---\n')}

**Professional Experience:**
- Role: ${contentData.experience.title} at ${contentData.experience.company} (${contentData.experience.location})
- Duration: ${contentData.experience.duration}
- Description: ${contentData.experience.description}
- Key Responsibilities: ${contentData.experience.keyResponsibilities?.join(' | ')}

**Education:**
- Degree: ${contentData.education.degree}
- School: ${contentData.education.school}
- Duration: ${contentData.education.duration}
- Coursework: ${contentData.education.coursework}
- Notable: ${contentData.education.notable}

**Future Goals:**
- Focus: ${contentData.futureGoals?.focus}
- Interests: ${contentData.futureGoals?.interests?.join(', ')}

## Personality & Behavior Guidelines

- Speak naturally in first person as Muhammad Anas — confident, direct, technically grounded
- Never use apologetic or self-deprecating language ("I'm just a...", "I don't have much experience...")
- Lead with measurable impact: numbers, scale, real systems
- When discussing projects, emphasize the problem solved, not just what was built
- For collaboration/hiring inquiries: be warm, direct, and offer concrete next steps (email, LinkedIn)
- Keep responses concise but substantive — 3-5 sentences max unless a technical deep-dive is asked
- You can be enthusiastic about AI/ML problems and challenges
- Never make up information not in your knowledge base; redirect gracefully if asked something out of scope
- If asked about availability, salary, or specifics you don't know: suggest direct email contact`;

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

// Fallback responses when API key is not available
function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('findify')) {
    return "Findify is my final year project — a multimodal AI product discovery platform using CLIP embeddings and Weaviate for sub-100ms search across 7,000+ products. Built FastAPI + MongoDB backend, Playwright scraping pipeline (Amazon, eBay, Alibaba), and Upstash Redis caching that cut latency 85%. Resolved 4 production-blocking failures to ship it — that's where real engineering happens.";
  }
  if (lower.includes('shopscout') || lower.includes('shopping')) {
    return "ShopScout is a 4-node LangGraph multi-agent pipeline combining deterministic PostgreSQL filtering with LLM-based ranking — eliminates hallucinations by grounding every recommendation in verified database data. Used Ollama (Llama 3.2) as local fallback ensuring zero downtime. 95% intent extraction accuracy parsing complex user constraints.";
  }
  if (lower.includes('plantdoc') || lower.includes('kisanai') || lower.includes('crop')) {
    return "PlantDoc is a crop disease detection system fine-tuned on 54,000 images — 99% accuracy across 38 disease classes. Built with FastAPI + PyTorch (EfficientNet-B3) and a Streamlit frontend so farmers can diagnose diseases from a photo. Real-world AI impact beyond tech.";
  }
  if (lower.includes('mcp') || lower.includes('sql') || lower.includes('analyst')) {
    return "My MCP-Based SQL Analyst lets non-technical users query a 2.5M-row retail warehouse in plain English. Built an 11-capability MCP server as a read-only LLM gateway with 100% SQL injection and PII-extraction defense, plus a YAML semantic layer mapping business terms to safe SQL queries. Eliminated analyst dependency for routine reporting.";
  }
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('know')) {
    return "I work across the full AI/ML stack — PyTorch, TensorFlow, LangGraph, LangChain, Gemini API, Ollama on the AI side. FastAPI, PostgreSQL, MongoDB, Weaviate (vector DB) on the backend. I'm comfortable owning the full pipeline: data cleaning, model training, inference optimization, deployment. What specific area are you curious about?";
  }
  if (lower.includes('experience') || lower.includes('intern') || lower.includes('elevvo')) {
    return "I did an ML internship at Elevvo Pathways (Aug–Oct 2025) training classification and CNN models on datasets with 50K–200K records. But honestly, my projects — Findify, the MCP Analyst, ShopScout — are the real proof of what I can build. Production systems with measurable impact.";
  }
  if (lower.includes('hire') || lower.includes('collaborate') || lower.includes('work') || lower.includes('opportunity')) {
    return "I'm open to AI engineering roles, consulting, and building AI systems. My strength is taking problems from 0 to production: clear requirements → robust system → real results. Reach out at miananas.info@gmail.com or connect on LinkedIn for a conversation.";
  }
  if (lower.includes('education') || lower.includes('degree') || lower.includes('university')) {
    return "I'm completing a B.S. in Artificial Intelligence at University of Central Punjab, Lahore (Nov 2022 – Jul 2026). Final Year Project Lead on Findify — a production multimodal search system. Coursework spans ML, Deep Learning, Computer Vision, NLP, Generative AI, and more.";
  }

  return "Great question! I build production AI systems — from multimodal search (Findify) to multi-agent pipelines (ShopScout) to NLP-driven analytics (MCP SQL Analyst). What aspect of my work would you like to explore?";
}

export async function POST(req: NextRequest) {
  // Extract body BEFORE try/catch — can only read stream once
  let message = '';
  let history: { role: string; content: string }[] = [];

  try {
    const body = await req.json();
    message = body.message || '';
    history = body.history || [];
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API;

  // Use fallback if no API key
  if (!apiKey) {
    const response = getFallbackResponse(message);
    return NextResponse.json({ response });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history
    const chatHistory: ChatMessage[] = history.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })
    );

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Gemini API error:', error);
    // Graceful keyword fallback on Gemini error
    const fallback = getFallbackResponse(message);
    return NextResponse.json({ response: fallback });
  }
}
