# 🚀 Challenge Overview

In the age of AI, the quality of a model's response is only as good as the context it's given. The **Build-Your-Own-MCP Challenge** invites you to design and build your own **Model Context Protocol (MCP)** server — a specialized service that acts as a "smart context engine" for AI models.

Your mission is to create a server that intelligently fetches, filters, and formats data from real-world services (Google Calendar, Notion, AWS, GitHub, etc.) and injects it as context for an AI. The goal is to make the AI assistant vastly more personal, aware, and useful.

The best submissions will be judged not just on technical implementation but on creativity and real-world utility.

---

## 🛠 What You'll Be Building

A server that acts as a **context-aware middleware**. When a user query comes in, your server's job is to:

1. **Intercept / Receive** the query.
2. **Analyze** the query to understand what additional context is needed.
3. **Fetch** this data from any API or data source you choose (e.g., Google Calendar, a Notion database, your AWS account, a personal database).
4. **Assemble** this data into a "context package."
5. **Deliver** this package (along with the original prompt) to an AI model to generate a hyper-relevant response.

---

## 💡 Examples to Inspire You

### 🤖 The "Personal Assistant" Server
**Query:** "Am I free for a meeting tomorrow at 10 AM?"
**MCP Server:** Connects to the user's Google Calendar API, fetches their schedule, and injects:
> CONTEXT: User's calendar for tomorrow shows a 'Project Sync' from 10:00 to 11:00 AM.

**AI Response:** "No, it looks like you have a 'Project Sync' scheduled from 10:00 to 11:00 AM tomorrow."

---

### 🛠 The "DevOps" Server
**Query:** "What's the status of the production web fleet?"
**MCP Server:** Connects to the AWS API, gets the health of EC2 instances tagged "prod-web," and injects:
> CONTEXT: AWS production fleet status — 3 instances running. 'web-01' CPU at 85%. 'web-02' and 'web-03' are at 30%.

**AI Response:** "The production fleet is online. Be aware that 'web-01' is showing high CPU usage at 85%, while the other two instances are normal."

---

### 📚 The "Knowledge Manager" Server
**Query:** "What were the key decisions from the 'Project Phoenix' launch meeting?"
**MCP Server:** Connects to Notion, searches for the "Project Phoenix" meeting notes page, summarizes the "Decisions" block, and injects the summary.

**AI Response:** "The key decisions from that meeting were: 1) The launch is set for Q3, and 2) Marketing will focus on the 'Speed' feature."

---

## 🏅 Judging Criteria

Your submission will be evaluated on its innovative approach and practical value.

### 🎨 Creativity & Originality (50%)
- **Unique Data Source:** Did you connect to a novel or interesting data source (e.g., fitness tracker, CI/CD pipeline, personal finance tool)?
- **Clever Integration:** How creative is the way you use the data? Does it unlock new capabilities for the AI?
- **Contextual Intelligence:** How well does your server infer what context is needed? Does it combine multiple sources?

### ⚙️ Utility & Technical Merit (50%)
- **Practical Value:** How useful is this? Does it solve a real problem or make a common task easier?
- **Robustness:** Is the server well-built? Does it handle data fetching, API errors, and context formatting reliably?
- **Efficiency:** How well is the context summarized? Does it provide useful information without excessive noise?

---

## 🧑‍💻 Technical Requirements

- Your submission must be a **functional server** that can receive a query and demonstrate its ability to fetch external data.
- You must clearly identify the **external data source(s)** or **API(s)** being used.
- A clear **README** file (and your **Devpost** submission) is required, detailing:
  - The **purpose** of your MCP server.
  - The **data sources** it connects to.
  - **Instructions** on how to run it (including how to provide necessary API keys — use placeholders for sensitive info).
  - **Example prompts** that showcase its utility.

---

### 🚀 Ready to build the tools that make AI truly personal?
We can't wait to see what you create!
