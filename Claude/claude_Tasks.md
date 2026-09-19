# Implement Context Passing with Structured Metadata (**subagents**)
## Metadata Format
```json
{
  "findings": [
    {
      "claim": "Solar panel efficiency has increased 25% in the last decade",
      "source_url": "https://example.com/solar-report",
      "document_name": "Annual Solar Industry Report 2024",
      "page_number": 14,
      "confidence": "high",
      "retrieved_by": "web_search_agent"
    }
  ]
}

```

**1. Create a coordinator agent with Task (or Agent) in its `allowedTools`**

*Why:* Task is the hard gate for subagent spawning.Without it in `allowedTools`, the coordinator cannot invoke any subagent. The exam tests this as a binary requirement — it is not optional or configurable at runtime.

*You should see:* A query() call whose options include `allowedTools` explicitly containing **Agent (or Task)** alongside any other tools the coordinator needs directly, plus the subagent definitions under **options.agents.**

### NUDGE
What happens if you omit Task (or Agent) from allowedTools? The coordinator simply cannot spawn subagents — there is no fallback.
```js
import { query } from "@anthropic-ai/claude-agent-sdk";

const result = query({
  prompt: "Research the topic and produce a fully cited report.",
  options: {
    systemPrompt: "You coordinate research by delegating to specialist subagents and synthesising their findings.",
    // "Task" in the exam guide; renamed "Agent" in Claude Code v2.1.63
    allowedTools: ["Task", "Read"],
    agents: {
      "web-search": webSearchAgent,
      "doc-analysis": docAnalysisAgent,
      "synthesis": synthesisAgent
    }
  }
});
```

**2. Define two subagents: a web search agent that returns results with source URLs and titles, and a document analysis agent that returns analysis with page references**

*Guidance*: 
Each AgentDefinition needs: description (used by the coordinator for selection), prompt (the subagent system prompt — the SDK field is prompt, not systemPrompt), and tools (scoped to the subagent role). The agent name is its key in options.agents, not a field.
```js
// Keyed into options.agents as "web-search" and "doc-analysis"
const webSearchAgent = {
  description: "Searches the web for current information and returns results with source URLs and titles",
  prompt: "Search for information on the given topic. Return each finding as JSON with fields: claim, source_url, source_title, retrieved_date.",
  tools: ["WebSearch"]
};
const docAnalysisAgent = {
  description: "Analyses documents and returns findings with page references",
  prompt: "Analyse the provided documents. Return each finding as JSON with fields: claim, document_name, page_number, section.",
  tools: ["Read", "Grep"]
};

const result = query({
    prompt: "Research the given topic using both web search and document analysis, then combine the findings.",
    options: {
        allowedTools: ["Task", "Read"],
        agents: {
            "web-search": webSearchAgent,
            "doc-analysis": docAnalysisAgent,
        }
    }
})
```