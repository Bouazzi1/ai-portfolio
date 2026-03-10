# 🤖 AI Chatbot Template — Delivery Kit

## ⏱️ Estimated Delivery Time: 10-15 Minutes

## How to Fulfill a Client Order

### Step 1: Gather Client Info (5 min)
Ask the client for:
- [ ] Business name & tagline
- [ ] Contact details (email, phone, address, hours)
- [ ] Brand colors (or use their website colors)
- [ ] List of services/products
- [ ] Pricing (if applicable)
- [ ] Top 10 FAQ questions & answers
- [ ] Any special features they want

### Step 2: Configure (5-8 min)
1. Copy this entire `chatbot-template/` folder
2. Open `config.js`
3. Fill in:
   - `business` object → Client's info
   - `appearance` object → Their brand colors
   - `suggestions` → Quick-action chips
   - `knowledgeBase` → Add entries for each FAQ topic
4. Test locally by opening any HTML page with the embed code

### Step 3: Deliver (2 min)
Send the client:
- `config.js` — Their customized config
- `chatbot-engine.js` — The engine (unchanged)
- `embed.html` — Instructions for embedding

### Embed Instructions for Client
Tell them to add before `</body>`:
```html
<script src="config.js"></script>
<script src="chatbot-engine.js"></script>
```

## File Structure
```
chatbot-template/
├── config.js          ← EDIT THIS (client data)
├── chatbot-engine.js  ← DO NOT EDIT (engine)
├── embed.html         ← Give to client
└── README.md          ← This file
```

## Tips for Fast Delivery
- Keep a copy of common industry configs (restaurant, ecommerce, etc.)
- Use the demo projects as reference for knowledge base structure
- Always test the chatbot before delivering
- Offer a revision round in your Fiverr gig
