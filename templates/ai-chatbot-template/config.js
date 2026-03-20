/* =============================================
   🔧 AI-POWERED CLIENT CONFIGURATION — EDIT THIS FILE ONLY
   =============================================

   HOW TO USE:
   1. Get the client's business info (name, colors, FAQ, etc.)
   2. Fill in this config file
   3. The AI chatbot auto-generates from this data
   4. Client provides their own OpenAI API key
   5. Deliver to client!

   ⏱️ Estimated setup time: 15-30 minutes
   ============================================= */

const CLIENT_CONFIG = {

    // ===== BUSINESS INFO =====
    business: {
        name: "Your Client Business",
        tagline: "Your trusted partner",
        industry: "general",
        website: "https://example.com",
        email: "hello@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street, City, Country",
        hours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM | Sun: Closed"
    },

    // ===== AI CONFIGURATION =====
    ai: {
        // ===== PROVIDER SELECTION =====
        // Options: "gemini" (free, Google) | "openai" (paid) | "groq" (cheap) | "local" (Ollama)
        provider: "gemini",

        // ===== API KEYS (provide only for your chosen provider) =====
        geminiApiKey: "",                             // Get free at: https://ai.google.dev
        openaiApiKey: "",                             // Get from: https://platform.openai.com/api-keys
        groqApiKey: "",                               // Get free at: https://console.groq.com
        localOllamaUrl: "http://localhost:11434",   // Local Ollama server URL

        // ===== MODEL SELECTION (per provider) =====
        models: {
            gemini: "gemini-2.5-flash",               // fast & free
            openai: "gpt-4o-mini",                    // cheap but effective
            groq: "mixtral-8x7b-32768",               // fast & affordable
            local: "mistral"                          // download: ollama pull mistral
        },

        maxTokens: 300,                               // Max response length
        temperature: 0.7,                             // 0 = precise, 1 = creative

        // System prompt — this is the bot's "brain"
        // Customize this thoroughly for each client
        systemPrompt: `You are a friendly, professional AI assistant for {BUSINESS_NAME}.

ABOUT THE BUSINESS:
- Name: {BUSINESS_NAME}
- Industry: {INDUSTRY}
- Tagline: {TAGLINE}

CONTACT INFORMATION:
- Email: {EMAIL}
- Phone: {PHONE}
- Address: {ADDRESS}
- Business Hours: {HOURS}
- Website: {WEBSITE}

YOUR ROLE:
- Answer customer questions about the business accurately
- Be helpful, friendly, and professional
- Use short, clear responses (2-4 sentences when possible)
- If you don't know something specific, direct them to contact the business
- Never make up information about products, prices, or policies
- You can use **bold** for emphasis and bullet points for lists

SERVICES & PRICING:
[CUSTOMIZE: Add the client's services and pricing here]
- Service 1: Description — $XX
- Service 2: Description — $XX
- Service 3: Description — $XX

FREQUENTLY ASKED QUESTIONS:
[CUSTOMIZE: Add the client's top FAQ answers here]
Q: Example question?
A: Example answer.

IMPORTANT RULES:
- Never discuss competitors
- Never share internal business information
- Always suggest contacting the team for complex or custom requests
- Be concise — this is a chat widget, not an essay`,

        // Fallback responses when API fails
        fallbackResponse: "I'm having trouble connecting right now. Please contact us directly at {EMAIL} or call {PHONE} — we'd love to help! 😊",
        rateLimitResponse: "I'm getting a lot of questions right now! Please try again in a moment, or contact us at {EMAIL}."
    },

    // ===== CHATBOT APPEARANCE =====
    appearance: {
        botName: "AI Assistant",
        botEmoji: "🤖",
        welcomeMessage: "Hi! 👋 I'm the AI assistant for {BUSINESS_NAME}. Ask me anything about our services, pricing, or how we can help!",
        placeholder: "Type your message...",
        position: "bottom-right",

        primaryColor: "#6366F1",
        primaryLight: "#818CF8",
        bgColor: "#0F172A",
        bgCard: "#1E293B",
        textColor: "#F8FAFC",
        textMuted: "#94A3B8",

        toggleSize: "60px",
        toggleIcon: "💬"
    },

    // ===== QUICK SUGGESTION CHIPS =====
    suggestions: [
        { label: "📋 Our Services", message: "What services do you offer?" },
        { label: "💰 Pricing", message: "What are your prices?" },
        { label: "📞 Contact", message: "How can I contact you?" },
        { label: "❓ FAQ", message: "I have a question" }
    ],

    // ===== KNOWLEDGE BASE (for offline/fallback mode) =====
    // Used when API is unavailable or for instant answers
    knowledgeBase: [
        {
            patterns: ["hello", "hi", "hey", "good morning", "good evening"],
            response: "Hi there! 👋 I'm the AI assistant for {BUSINESS_NAME}. How can I help you today?"
        },
        {
            patterns: ["contact", "email", "phone", "call", "reach"],
            response: "📞 **Get in Touch:**\n\n📧 Email: {EMAIL}\n📱 Phone: {PHONE}\n📍 Address: {ADDRESS}\n🕐 Hours: {HOURS}"
        }
    ],

    // ===== LEAD CAPTURE (optional) =====
    leadCapture: {
        enabled: false,
        triggerAfterMessages: 3,
        message: "💡 Would you like to leave your email so our team can follow up with personalized help?",
        placeholder: "your@email.com",
        successMessage: "Thanks! Our team will be in touch soon. 🎉",
        webhookUrl: ""                               // Optional: send lead to webhook/CRM
    },

    // ===== CONVERSATION LIMITS =====
    limits: {
        maxMessagesPerSession: 50,                    // Prevent abuse
        maxMessageLength: 500,                        // Max user message length
        rateLimitMs: 2000,                            // Min time between messages
        sessionTimeoutMs: 30 * 60 * 1000              // 30 minute session timeout
    }
};
