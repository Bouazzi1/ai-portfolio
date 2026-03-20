# 🤖 AI-Powered Chatbot Template — Premium Delivery Kit

## ⏱️ Estimated Delivery Time: 15-30 Minutes

## What Makes This Different From Standard Chatbot

| Feature | Standard Chatbot | AI-Powered Chatbot |
|---------|------------------|--------------------|
| Response type | Pattern matching (keywords) | Real AI conversations (Google Gemini/GPT-4) |
| Handles custom questions | No — only pre-programmed answers | Yes — understands any question |
| Conversation memory | None | Remembers full conversation |
| Language support | Only what you program | Any language automatically |
| Setup complexity | Edit knowledge base entries | Write system prompt + FAQ |
| Client cost | One-time | One-time + **FREE to $5-15/month** |
| **Your price** | **$75-$150** | **$300-$500+** |

---

## 🆓 AI Provider Options

This template now supports **4 AI providers** with different cost structures:

| Provider | Cost | Setup | Best For |
|----------|------|-------|----------|
| **Google Gemini** (FREE) | Free tier | No credit card | Startups, MVP clients |
| **Groq** (CHEAP) | $0.05 per 1M tokens (~$1-5/month) | Free account | Production use |
| **OpenAI** (PAID) | $0.15-3 per 1M tokens | Paid account | Premium clients |
| **Ollama** (LOCAL) | $0 (on your computer) | Download app | Development/testing |

---

## How to Fulfill a Client Order

### Step 1: Gather Client Info (5 min)
Ask the client for:
- [ ] Business name & tagline
- [ ] Contact details (email, phone, address, hours)
- [ ] Brand colors (or use their website colors)
- [ ] List of services/products with pricing
- [ ] Top 10-20 FAQ questions & answers
- [ ] Any special instructions (tone, language, topics to avoid)

### Step 2: Choose AI Provider & Get API Key (5 min)

**Easiest (Recommended for First Clients): Google Gemini API — FREE**

1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Click "Create API Key in new project"
4. Accept the terms
5. Copy the API key (no credit card required!)
6. In `config.js`, set `ai.provider = "gemini"` and paste the key into `ai.geminiApiKey`

**Why Gemini is best for starting:**
- Completely free — no credit card needed
- High quality responses (Google's model)
- Generous free tier for low-traffic sites
- Can scale to Groq later if needed

---

**Alternative: Groq API — Cheap & Fast ($0.05 per 1M tokens)**

1. Go to https://console.groq.com/
2. Sign up with GitHub or email
3. Click "Create API Key"
4. Copy the key
5. In `config.js`, set `ai.provider = "groq"` and paste the key into `ai.groqApiKey`

**Why Groq:**
- Extremely affordable ($0.05 per 1M tokens = ~$1-5/month for most businesses)
- Very fast responses
- OpenAI-compatible (easier migration later)

---

**For Experienced Clients: OpenAI or Ollama**

See Step 3b below for details.

### Step 3: Configure (10-20 min)
1. Copy this entire `ai-chatbot-template/` folder
2. Open `config.js`
3. Fill in:
   - `business` object — Client's business info
   - `ai.provider` — Choose: "gemini" | "groq" | "openai" | "local"
   - `ai.geminiApiKey` (if using Gemini)
   - `ai.groqApiKey` (if using Groq)
   - `ai.openaiApiKey` (if using OpenAI)
   - `ai.systemPrompt` — **This is the most important part!**
     - Add all services, pricing, policies
     - Add all FAQ answers
     - Define the tone and personality
     - Specify any topics to avoid
   - `appearance` object — Brand colors
   - `suggestions` — Quick-action chips
   - `knowledgeBase` — Add fallback responses (used when API is down)
4. Test thoroughly with 20+ different questions

### Step 4: Deliver (2 min)
Send the client:
- `config.js` — Their customized config
- `chatbot-engine.js` — The AI engine (unchanged)
- `embed.html` — Instructions for embedding

### Step 5: Upsell (1 min)
After delivery, offer:
- Monthly maintenance & prompt tuning — $50-100/month
- Additional chatbot for another page/product — $200+
- Workflow automation integration — $100-300

## File Structure
```
ai-chatbot-template/
├── config.js          ← EDIT THIS (client data + AI config)
├── chatbot-engine.js  ← DO NOT EDIT (AI engine)
├── embed.html         ← Give to client
└── README.md          ← This file
```

## System Prompt Tips

The system prompt is what makes your AI chatbot actually good. Here's how to write one that impresses clients:

### DO:
- Include ALL services with descriptions and prices
- Add specific FAQ answers with accurate details
- Define the bot's personality ("friendly and professional", "casual and fun")
- Specify what the bot should NOT discuss (competitors, internal info)
- Include the client's actual business policies (returns, shipping, etc.)

### DON'T:
- Leave placeholder text in the prompt
- Make the prompt too short (500+ words is ideal)
- Forget to include contact info
- Skip testing edge cases (rude users, off-topic questions)

## Estimated API Costs for Client

### Using Google Gemini (FREE)
| Traffic Level | Monthly Messages | Monthly Cost |
|---------------|------------------|--------------|
| Low (small business) | 500 | **FREE** ✓ |
| Medium (active site) | 2,000 | **FREE** ✓ |
| High (busy store) | 10,000 | **FREE (probably)** ⚠️ |

Google's free tier is generous — perfect for startups and small businesses. No credit card required. If a client's traffic exceeds free limits, move them to Groq.

### Using Groq API (CHEAP)
| Traffic Level | Monthly Messages | Monthly Cost |
|---------------|------------------|--------------|
| Low (small business) | 500 | ~$0.50 |
| Medium (active site) | 2,000 | ~$2-3 |
| High (busy store) | 10,000 | ~$10-15 |

Groq is $0.05 per 1M input tokens. Extremely affordable for production use.

### Using OpenAI (PAID)
| Traffic Level | Monthly Messages | Monthly Cost |
|---------------|------------------|--------------|
| Low (small business) | 500 | ~$10-15 |
| Medium (active site) | 2,000 | ~$30-50 |
| High (busy store) | 10,000 | ~$80-120 |

Using `gpt-4o-mini` keeps costs reasonable. Only recommend OpenAI if client specifically requests or needs maximum quality.

---

## Security Note: API Keys

**IMPORTANT:** Never commit `config.js` with API keys to public GitHub.

**For clients:**
- Keep `config.js` private (don't share the file)
- Don't put it in version control
- For production sites, move API key to backend server

**For development:**
- Test locally with Ollama first
- Use Gemini's free tier for client demos
- Only add real API keys close to deployment


