/* =============================================
   LA MAISON DORÉE — AI Chatbot Engine
   Simulated AI responses with smart matching
   ============================================= */

// ===== RESTAURANT KNOWLEDGE BASE =====
const knowledgeBase = {
    restaurant: {
        name: "La Maison Dorée",
        address: "42 Avenue des Champs-Élysées, 75008 Paris, France",
        phone: "+33 1 42 68 53 00",
        email: "info@maisondoree.fr",
        rating: "4.9/5 on Google (1,200+ reviews)",
        michelin: "2 Michelin Stars",
        hours: {
            weekdays: "Monday–Saturday: 12:00 – 23:00",
            sunday: "Sunday: 12:00 – 22:00"
        },
        dress_code: "Smart casual. We recommend elegant attire for dinner service.",
        parking: "Complimentary valet parking available for dinner guests.",
        capacity: "85 seats in main dining, 20 in private dining room",
        chef: "Chef Antoine Dubois — formerly of Le Jules Verne & Le Cinq"
    },

    menu: {
        starters: [
            { name: "Truffle Burrata", price: 24, desc: "Creamy burrata with black truffle shavings, arugula & aged balsamic", dietary: ["vegetarian", "gluten-free"] },
            { name: "Lobster Bisque", price: 28, desc: "Rich lobster bisque with cognac cream & brioche croutons", dietary: [] },
            { name: "Foie Gras Terrine", price: 32, desc: "House-made foie gras with fig compote & toasted brioche", dietary: [] },
            { name: "Tuna Tartare", price: 26, desc: "Fresh yellowfin tuna with avocado, sesame & yuzu dressing", dietary: ["gluten-free"] }
        ],
        mains: [
            { name: "Wagyu Ribeye A5", price: 95, desc: "Japanese A5 Wagyu, grilled over binchotan, seasonal vegetables", dietary: ["gluten-free"] },
            { name: "Dover Sole Meunière", price: 68, desc: "Whole Dover sole pan-fried in brown butter with capers & lemon", dietary: ["gluten-free"] },
            { name: "Rack of Lamb", price: 58, desc: "Herb-crusted rack of lamb with ratatouille & jus", dietary: ["gluten-free"] },
            { name: "Risotto al Tartufo", price: 45, desc: "Arborio rice with white truffle, parmesan & forest mushrooms", dietary: ["vegetarian", "gluten-free"] }
        ],
        desserts: [
            { name: "Soufflé au Chocolat", price: 18, desc: "Dark chocolate soufflé with vanilla crème anglaise", dietary: ["vegetarian"] },
            { name: "Crème Brûlée", price: 16, desc: "Classic Tahitian vanilla crème brûlée", dietary: ["vegetarian", "gluten-free"] },
            { name: "Tarte Tatin", price: 20, desc: "Caramelized apple tart with Calvados ice cream", dietary: ["vegetarian"] },
            { name: "Cheese Selection", price: 22, desc: "5 artisanal French cheeses with honeycomb & walnuts", dietary: ["vegetarian", "gluten-free"] }
        ],
        wines: [
            { name: "Château Margaux 2018", price: 350, type: "Red Bordeaux" },
            { name: "Puligny-Montrachet 2020", price: 180, type: "White Burgundy" },
            { name: "Dom Pérignon 2012", price: 280, type: "Champagne" },
            { name: "Sancerre 2022", price: 65, type: "White Loire" }
        ]
    }
};

// ===== RESPONSE PATTERNS =====
const responses = [
    {
        patterns: ["menu", "food", "eat", "dish", "what do you serve", "what's available", "today", "offer"],
        reply: () => {
            let msg = `Here's our current menu at **La Maison Dorée** 🍽️\n\n`;
            msg += `**🥗 Starters:**\n`;
            knowledgeBase.menu.starters.forEach(item => {
                msg += `• ${item.name} — €${item.price}\n  _${item.desc}_\n`;
            });
            msg += `\n**🥩 Main Courses:**\n`;
            knowledgeBase.menu.mains.forEach(item => {
                msg += `• ${item.name} — €${item.price}\n  _${item.desc}_\n`;
            });
            msg += `\n**🍰 Desserts:**\n`;
            knowledgeBase.menu.desserts.forEach(item => {
                msg += `• ${item.name} — €${item.price}\n  _${item.desc}_\n`;
            });
            msg += `\nWould you like to make a reservation? 😊`;
            return msg;
        }
    },
    {
        patterns: ["reservation", "reserve", "book", "table", "booking", "availability"],
        reply: () => {
            return `I'd love to help you book a table! 📅\n\nPlease share the following details:\n\n1. **Date:** When would you like to dine?\n2. **Time:** Preferred time? (Lunch: 12:00–14:30 | Dinner: 19:00–22:30)\n3. **Guests:** How many people?\n4. **Special requests:** Any dietary requirements or special occasion?\n\nAlternatively, you can call us at **+33 1 42 68 53 00** for immediate booking.\n\n_Note: For parties of 8+, we recommend our beautiful private dining room!_ ✨`;
        }
    },
    {
        patterns: ["vegetarian", "vegan", "gluten", "allergy", "allergies", "dietary", "intolerance", "halal", "kosher", "celiac"],
        reply: () => {
            const gfItems = [...knowledgeBase.menu.starters, ...knowledgeBase.menu.mains, ...knowledgeBase.menu.desserts]
                .filter(item => item.dietary && item.dietary.includes("gluten-free"));
            const vegItems = [...knowledgeBase.menu.starters, ...knowledgeBase.menu.mains, ...knowledgeBase.menu.desserts]
                .filter(item => item.dietary && item.dietary.includes("vegetarian"));

            let msg = `We take dietary requirements very seriously! 🥗\n\n`;
            msg += `**Gluten-Free Options (${gfItems.length} dishes):**\n`;
            gfItems.forEach(item => {
                msg += `• ${item.name} — €${item.price}\n`;
            });
            msg += `\n**Vegetarian Options (${vegItems.length} dishes):**\n`;
            vegItems.forEach(item => {
                msg += `• ${item.name} — €${item.price}\n`;
            });
            msg += `\nOur chef can also modify most dishes for **vegan**, **halal**, or other dietary needs. Just let us know when booking! 💛`;
            return msg;
        }
    },
    {
        patterns: ["wine", "drink", "cocktail", "beverage", "pair", "sommelier", "steak", "red wine", "white wine", "champagne"],
        reply: () => {
            let msg = `Excellent choice asking about wines! 🍷 Our sommelier recommends:\n\n`;
            msg += `**With Red Meat (Wagyu, Lamb):**\n`;
            msg += `• Château Margaux 2018 — €350 _(Rich, velvety Bordeaux)_\n\n`;
            msg += `**With Seafood (Dover Sole, Tuna):**\n`;
            msg += `• Puligny-Montrachet 2020 — €180 _(Elegant white Burgundy)_\n`;
            msg += `• Sancerre 2022 — €65 _(Crisp, mineral Loire white)_\n\n`;
            msg += `**For Celebrations:**\n`;
            msg += `• Dom Pérignon 2012 — €280 _(The ultimate Champagne)_\n\n`;
            msg += `We have a cellar of 400+ wines. Our sommelier is happy to provide a personalized recommendation for your meal! 🥂`;
            return msg;
        }
    },
    {
        patterns: ["hour", "open", "close", "time", "when", "schedule"],
        reply: () => {
            return `⏰ **Our Hours:**\n\n• **Monday–Saturday:** 12:00 – 23:00\n  ↳ Lunch service: 12:00 – 14:30\n  ↳ Dinner service: 19:00 – 22:30\n\n• **Sunday:** 12:00 – 22:00\n  ↳ Brunch: 12:00 – 15:00\n  ↳ Dinner: 19:00 – 21:30\n\n_We recommend arriving 10 minutes before your reservation._ 🕐`;
        }
    },
    {
        patterns: ["where", "address", "location", "direction", "find", "map", "parking"],
        reply: () => {
            return `📍 **Location:**\n42 Avenue des Champs-Élysées\n75008 Paris, France\n\n🚗 **Parking:** Complimentary valet parking for dinner guests\n\n🚇 **Metro:** George V (Line 1) — 2 min walk\n\n📞 **Phone:** +33 1 42 68 53 00\n📧 **Email:** info@maisondoree.fr\n\nWe're located between Louis Vuitton and Ladurée — you can't miss us! ✨`;
        }
    },
    {
        patterns: ["price", "cost", "expensive", "cheap", "budget", "how much", "afford"],
        reply: () => {
            return `💰 **Pricing Overview:**\n\n• **Starters:** €24 – €32\n• **Main Courses:** €45 – €95\n• **Desserts:** €16 – €22\n• **Wines:** from €65/bottle\n\n**Set Menus Available:**\n• Lunch Menu — €55 (3 courses)\n• Tasting Menu — €125 (7 courses)\n• Grand Tasting Menu — €195 (10 courses with wine pairing)\n\nThe tasting menu is exceptional value for a 2-Michelin-star experience! ⭐⭐`;
        }
    },
    {
        patterns: ["chef", "cook", "kitchen", "who"],
        reply: () => {
            return `👨‍🍳 **Chef Antoine Dubois**\n\nOur executive chef brings 25 years of Michelin-starred experience:\n\n• Formerly of **Le Jules Verne** (Eiffel Tower) & **Le Cinq** (Four Seasons)\n• Awarded **2 Michelin Stars** at La Maison Dorée\n• Named **Best Chef of the Year 2024** by Gault & Millau\n• Known for modern French cuisine with Japanese influences\n\nChef Dubois personally designs every tasting menu and sources ingredients from the finest French producers. 🌟`;
        }
    },
    {
        patterns: ["private", "event", "birthday", "anniversary", "celebration", "party", "group"],
        reply: () => {
            return `🎉 **Private Events & Celebrations:**\n\nWe'd love to make your special occasion unforgettable!\n\n• **Private Dining Room:** Up to 20 guests\n• **Full Restaurant Buyout:** Up to 85 guests\n• **Custom Tasting Menus:** Designed by Chef Dubois\n• **Complimentary:** Birthday cake, champagne toast, personalized menu cards\n\nFor events, please contact our events manager:\n📧 events@maisondoree.fr\n📞 +33 1 42 68 53 01\n\nWe recommend booking at least 2 weeks in advance for private dining! 💛`;
        }
    },
    {
        patterns: ["thank", "thanks", "merci", "appreciated", "great", "awesome", "perfect"],
        reply: () => {
            const thankReplies = [
                "You're very welcome! 😊 Don't hesitate to reach out if you need anything else. We look forward to welcoming you at La Maison Dorée! ✨",
                "My pleasure! 💛 Is there anything else I can help you with? We can't wait to serve you!",
                "Thank you! It's been a delight chatting with you 🌟 See you soon at La Maison Dorée!"
            ];
            return thankReplies[Math.floor(Math.random() * thankReplies.length)];
        }
    },
    {
        patterns: ["hello", "hi", "hey", "bonjour", "good morning", "good evening", "good afternoon"],
        reply: () => {
            const greetings = [
                "Bonjour! Welcome to La Maison Dorée 🌟 How may I assist you today? I can help with menu information, reservations, dietary requirements, and more!",
                "Hello! 😊 It's wonderful to have you here. Would you like to explore our menu, make a reservation, or ask about our dining experience?",
                "Welcome! ✨ I'm your AI concierge at La Maison Dorée. How can I make your dining experience exceptional today?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
    }
];

// Default response for unmatched queries
const defaultResponse = () => {
    const defaults = [
        "That's a great question! While I may not have the specific answer, I'd be happy to help with:\n\n• 📋 Menu & dietary information\n• 📅 Table reservations\n• 🍷 Wine recommendations\n• 📍 Location & hours\n• 🎉 Private events\n\nOr you can reach our team at **+33 1 42 68 53 00** for any specific inquiries! 😊",
        "I appreciate your question! Let me suggest some things I can help with:\n\n• Browse our **menu** and dietary options\n• **Book a table** for your visit\n• Get **wine pairing** recommendations\n• Learn about our **chef** and restaurant\n\nHow can I assist you? 💛"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
};

// ===== CHATBOT ENGINE =====
class ChatBot {
    constructor() {
        this.chatWindow = document.getElementById('chatbotWindow');
        this.chatMessages = document.getElementById('chatbotMessages');
        this.chatInput = document.getElementById('chatbotInput');
        this.chatToggle = document.getElementById('chatbotToggle');
        this.chatClose = document.getElementById('chatbotClose');
        this.chatSend = document.getElementById('chatbotSend');
        this.suggestions = document.getElementById('chatbotSuggestions');

        this.isOpen = false;
        this.init();
    }

    init() {
        // Toggle chatbot
        this.chatToggle.addEventListener('click', () => this.toggle());
        this.chatClose.addEventListener('click', () => this.close());

        // Send message
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick suggestion chips
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const msg = chip.getAttribute('data-msg');
                this.chatInput.value = msg;
                this.sendMessage();
            });
        });

        // Hero buttons
        document.getElementById('heroChatBtn')?.addEventListener('click', () => this.open());
        document.getElementById('heroReserveBtn')?.addEventListener('click', () => {
            this.open();
            setTimeout(() => {
                this.chatInput.value = "I'd like to make a reservation";
                this.sendMessage();
            }, 500);
        });
        document.getElementById('navReserveBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
            setTimeout(() => {
                this.chatInput.value = "I'd like to make a reservation";
                this.sendMessage();
            }, 500);
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.chatWindow.classList.add('open');
        this.chatToggle.style.display = 'none';
        this.chatInput.focus();
    }

    close() {
        this.isOpen = false;
        this.chatWindow.classList.remove('open');
        this.chatToggle.style.display = 'flex';
    }

    sendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        // Add user message
        this.addMessage(text, 'user');
        this.chatInput.value = '';

        // Hide suggestions after first message
        if (this.suggestions) {
            this.suggestions.style.display = 'none';
        }

        // Show typing indicator
        this.showTyping();

        // Simulate AI thinking time (600-1500ms)
        const thinkTime = 600 + Math.random() * 900;
        setTimeout(() => {
            this.removeTyping();
            const response = this.getResponse(text);
            this.addMessage(response, 'bot');
        }, thinkTime);
    }

    getResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();

        for (const entry of responses) {
            for (const pattern of entry.patterns) {
                if (lowerMsg.includes(pattern)) {
                    return entry.reply();
                }
            }
        }

        return defaultResponse();
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = this.formatMessage(text);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        this.chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    formatMessage(text) {
        // Convert markdown-like formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n• /g, '<br>• ')
            .replace(/\n↳ /g, '<br>&nbsp;&nbsp;↳ ')
            .replace(/\n(\d+)\. /g, '<br>$1. ')
            .replace(/\n/g, '<br>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
