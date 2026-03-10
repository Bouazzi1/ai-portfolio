/* =============================================
   🔧 CLIENT CONFIGURATION — EDIT THIS FILE ONLY
   =============================================
   
   HOW TO USE:
   1. Get the client's business info (name, colors, FAQ, etc.)
   2. Fill in this config file
   3. The chatbot auto-generates from this data
   4. Deliver to client!
   
   ⏱️ Estimated setup time: 10-15 minutes
   ============================================= */

const CLIENT_CONFIG = {

    // ===== BUSINESS INFO =====
    business: {
        name: "Your Client Business",          // Business name
        tagline: "Your trusted partner",        // Short tagline
        industry: "general",                     // restaurant | ecommerce | saas | realestate | healthcare | general
        website: "https://example.com",
        email: "hello@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street, City, Country",
        hours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM | Sun: Closed"
    },

    // ===== CHATBOT APPEARANCE =====
    appearance: {
        botName: "AI Assistant",                 // Name shown in chat header
        botEmoji: "🤖",                          // Avatar emoji
        welcomeMessage: "Hi! 👋 How can I help you today?",
        placeholder: "Type your message...",
        position: "bottom-right",                // bottom-right | bottom-left

        // Colors (use hex codes)
        primaryColor: "#6366F1",                 // Main accent color
        primaryLight: "#818CF8",                 // Lighter shade
        bgColor: "#0F172A",                      // Background
        bgCard: "#1E293B",                       // Card/message background
        textColor: "#F8FAFC",                    // Main text
        textMuted: "#94A3B8",                    // Secondary text

        // Toggle button
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

    // ===== KNOWLEDGE BASE =====
    // This is where you add ALL client-specific info
    // The bot matches user questions to these patterns
    knowledgeBase: [
        {
            // Greeting responses
            patterns: ["hello", "hi", "hey", "good morning", "good evening", "bonjour", "salut"],
            response: () => `Hi there! 👋 Welcome to **${CLIENT_CONFIG.business.name}**! I'm ${CLIENT_CONFIG.appearance.botName}, your AI assistant. How can I help you today?\n\nYou can ask me about:\n• Our services & what we do\n• Pricing & packages\n• Contact information\n• Or anything else!`
        },
        {
            // Services / What do you do
            patterns: ["service", "what do you", "offer", "do you do", "help with", "provide"],
            response: () => `🛠️ **Our Services:**\n\n• Service 1 — Description here\n• Service 2 — Description here\n• Service 3 — Description here\n\n_[CUSTOMIZE: Replace with client's actual services]_\n\nWould you like more details about any of these?`
        },
        {
            // Pricing
            patterns: ["price", "cost", "how much", "pricing", "quote", "budget", "rate", "fee"],
            response: () => `💰 **Pricing:**\n\n• **Basic Package** — $XX\n• **Standard Package** — $XX\n• **Premium Package** — $XX\n\n_[CUSTOMIZE: Replace with client's actual pricing]_\n\nWant a personalized quote? Contact us at ${CLIENT_CONFIG.business.email}!`
        },
        {
            // Contact info
            patterns: ["contact", "email", "phone", "call", "reach", "talk to", "address", "location", "where"],
            response: () => `📞 **Get in Touch:**\n\n📧 Email: ${CLIENT_CONFIG.business.email}\n📱 Phone: ${CLIENT_CONFIG.business.phone}\n📍 Address: ${CLIENT_CONFIG.business.address}\n🕐 Hours: ${CLIENT_CONFIG.business.hours}\n🌐 Website: ${CLIENT_CONFIG.business.website}\n\nFeel free to reach out anytime! We'd love to hear from you. 😊`
        },
        {
            // Hours / availability
            patterns: ["hour", "open", "close", "available", "schedule", "when"],
            response: () => `🕐 **Business Hours:**\n\n${CLIENT_CONFIG.business.hours}\n\nNeed to schedule a meeting? Email us at ${CLIENT_CONFIG.business.email}! 📅`
        },
        {
            // Thank you
            patterns: ["thank", "thanks", "thx", "appreciate", "great", "perfect", "awesome"],
            response: () => {
                const replies = [
                    `You're welcome! 😊 Is there anything else I can help with?\n\nVisit us at ${CLIENT_CONFIG.business.website} for more info!`,
                    `Happy to help! 💙 Don't hesitate to reach out if you need anything else.`,
                    `Glad I could assist! ✨ Have a wonderful day!`
                ];
                return replies[Math.floor(Math.random() * replies.length)];
            }
        },
        {
            // Human agent / escalation
            patterns: ["human", "agent", "real person", "speak to someone", "manager", "support"],
            response: () => `👤 **Connect with our team:**\n\n📧 Email: ${CLIENT_CONFIG.business.email}\n📱 Phone: ${CLIENT_CONFIG.business.phone}\n\nOur team typically responds within 24 hours. For urgent matters, please call directly! 📞`
        },

        // ===== ADD MORE CLIENT-SPECIFIC ENTRIES BELOW =====
        // Copy this template for each new topic:
        // {
        //     patterns: ["keyword1", "keyword2", "keyword3"],
        //     response: () => `Your response here with **bold** and _italic_ formatting`
        // },
    ],

    // ===== DEFAULT RESPONSE =====
    // Shown when no pattern matches
    defaultResponse: () => `Great question! I can help you with:\n\n• 🛠️ **Services** — What we offer\n• 💰 **Pricing** — Our packages\n• 📞 **Contact** — How to reach us\n• 🕐 **Hours** — When we're available\n\nOr email us directly at ${CLIENT_CONFIG.business.email} for a personalized answer! 😊`,

    // ===== LEAD CAPTURE (optional) =====
    leadCapture: {
        enabled: false,                          // Set to true to collect emails
        triggerAfterMessages: 3,                 // Ask after X messages
        message: "💡 Before we continue, would you like to leave your email so our team can follow up with personalized help?",
        placeholder: "your@email.com",
        successMessage: "Thanks! Our team will be in touch soon. 🎉"
    }
};
