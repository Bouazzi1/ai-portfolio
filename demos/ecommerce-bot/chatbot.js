/* =============================================
   NOVATECH — E-commerce AI Chatbot Engine
   Product catalog, order tracking, returns, recs
   ============================================= */

// ===== PRODUCT KNOWLEDGE BASE =====
const catalog = {
    products: [
        {
            id: "NP-001",
            name: "Nova Pro Headphones",
            price: 299,
            category: "Audio",
            rating: 4.8,
            reviews: 2100,
            desc: "Premium wireless noise-cancelling headphones with 40-hour battery life, spatial audio, and adaptive EQ.",
            specs: "Driver: 40mm | ANC: Adaptive | Battery: 40h | Bluetooth: 5.3 | Weight: 250g | Charging: USB-C (fast charge 10min = 3h)",
            colors: ["Midnight Black", "Arctic White", "Navy Blue"],
            warranty: "2-year manufacturer warranty",
            inStock: true
        },
        {
            id: "NW-002",
            name: "Nova Watch Ultra",
            price: 449,
            category: "Wearables",
            rating: 4.9,
            reviews: 890,
            desc: "Advanced smartwatch with GPS, heart rate, blood oxygen, and 7-day battery life.",
            specs: "Display: 1.9\" AMOLED | GPS: Dual-band | Battery: 7 days | Water: 100m | Sensors: HR, SpO2, ECG, Temp",
            colors: ["Titanium", "Carbon Black", "Ocean Blue"],
            warranty: "2-year manufacturer warranty",
            inStock: true
        },
        {
            id: "NF-003",
            name: "Nova Phone 15",
            price: 899,
            category: "Phones",
            rating: 4.7,
            reviews: 3400,
            desc: "Flagship smartphone with 6.7\" OLED display, 200MP camera, and 5G connectivity.",
            specs: "Display: 6.7\" LTPO OLED 120Hz | Camera: 200MP + 50MP + 12MP | Battery: 5000mAh | RAM: 12GB | Storage: 256GB",
            colors: ["Graphite", "Gold", "Lavender", "Green"],
            warranty: "1-year manufacturer warranty + 1 year extended with registration",
            inStock: true
        },
        {
            id: "NL-004",
            name: "Nova Laptop Air",
            price: 1299,
            category: "Computers",
            rating: 4.9,
            reviews: 1800,
            desc: "Ultra-thin laptop with 15\" Retina display, M4 chip, and 24-hour battery life.",
            specs: "Display: 15\" Retina 3K | Chip: M4 (10-core CPU, 10-core GPU) | RAM: 16GB | Storage: 512GB SSD | Battery: 24h | Weight: 1.2kg",
            colors: ["Space Gray", "Silver", "Starlight"],
            warranty: "2-year manufacturer warranty",
            inStock: true
        }
    ],

    policies: {
        shipping: {
            standard: "Free shipping on orders over $50 (5-7 business days)",
            express: "Express shipping: $12.99 (2-3 business days)",
            sameDay: "Same-day delivery available in select cities ($24.99)",
            international: "International shipping: $19.99 (7-14 business days)"
        },
        returns: {
            window: "30-day return policy",
            process: "Free returns — we provide a prepaid shipping label",
            conditions: "Items must be in original packaging, unused or lightly used",
            refund: "Refunds processed within 3-5 business days after receipt"
        },
        warranty: {
            standard: "All products include manufacturer warranty",
            extended: "Extended warranty available for $49/year (covers accidental damage)",
            claim: "File warranty claims through chat or email — we handle everything"
        }
    }
};

// ===== ORDER SIMULATOR =====
function generateOrder() {
    const statuses = [
        { status: "Processing", detail: "Your order is being prepared", eta: "Ships in 1-2 days" },
        { status: "Shipped", detail: "Package picked up by carrier", eta: "Arriving in 3-4 days", tracking: "NVT" + Math.random().toString(36).substring(2, 10).toUpperCase() },
        { status: "Out for Delivery", detail: "Your package is on the truck!", eta: "Arriving today by 6 PM" },
        { status: "Delivered", detail: "Package delivered to front door", eta: "Delivered March 6, 2026" }
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// ===== RESPONSE PATTERNS =====
const responses = [
    {
        patterns: ["track", "order", "where is my", "shipping", "delivery", "package", "arrive", "ship"],
        reply: () => {
            const order = generateOrder();
            let msg = `📦 **Order Status Update**\n\n`;
            msg += `**Status:** ${order.status}\n`;
            msg += `**Details:** ${order.detail}\n`;
            msg += `**ETA:** ${order.eta}\n`;
            if (order.tracking) msg += `**Tracking #:** ${order.tracking}\n`;
            msg += `\nNeed to modify your order or have questions? Just ask! 😊`;
            return msg;
        }
    },
    {
        patterns: ["return", "refund", "money back", "exchange", "send back", "broken", "damaged", "defective", "wrong item"],
        reply: () => {
            return `↩️ **Returns & Refunds — We've Got You Covered!**\n\n**Our Policy:**\n• **30-day** hassle-free returns\n• **Free returns** — we email you a prepaid shipping label\n• Refund processed in **3-5 business days** after we receive the item\n\n**How to Start a Return:**\n1. Tell me the item you'd like to return\n2. I'll generate a return shipping label for you\n3. Drop it off at any UPS/FedEx location\n4. Refund hits your account in 3-5 days! ✅\n\nWould you like me to start a return? Just let me know which product! 📝`;
        }
    },
    {
        patterns: ["headphone", "audio", "NP-001", "nova pro", "anc", "noise cancel"],
        reply: () => {
            const p = catalog.products[0];
            return `🎧 **${p.name}** — $${p.price}\n\n_${p.desc}_\n\n**Specs:**\n${p.specs}\n\n**Colors:** ${p.colors.join(", ")}\n**Rating:** ★ ${p.rating} (${p.reviews.toLocaleString()} reviews)\n**Warranty:** ${p.warranty}\n**Stock:** ${p.inStock ? "✅ In Stock — ships today!" : "⏳ Pre-order available"}\n\nWould you like to know about accessories, or compare with another product? 🎶`;
        }
    },
    {
        patterns: ["watch", "NW-002", "nova watch", "fitness", "smartwatch", "wearable"],
        reply: () => {
            const p = catalog.products[1];
            return `⌚ **${p.name}** — $${p.price}\n\n_${p.desc}_\n\n**Specs:**\n${p.specs}\n\n**Colors:** ${p.colors.join(", ")}\n**Rating:** ★ ${p.rating} (${p.reviews.toLocaleString()} reviews)\n**Warranty:** ${p.warranty}\n**Stock:** ${p.inStock ? "✅ In Stock" : "⏳ Coming Soon"}\n\nThis is our #1 rated product! Perfect for fitness enthusiasts and professionals alike. 💪`;
        }
    },
    {
        patterns: ["phone", "NF-003", "nova phone", "smartphone", "camera", "5g", "cell"],
        reply: () => {
            const p = catalog.products[2];
            return `📱 **${p.name}** — $${p.price}\n\n_${p.desc}_\n\n**Specs:**\n${p.specs}\n\n**Colors:** ${p.colors.join(", ")}\n**Rating:** ★ ${p.rating} (${p.reviews.toLocaleString()} reviews)\n**Warranty:** ${p.warranty}\n**Stock:** ${p.inStock ? "✅ In Stock" : "⏳ Pre-order"}\n\nThe 200MP camera is a game-changer for photography! 📸`;
        }
    },
    {
        patterns: ["laptop", "NL-004", "nova laptop", "computer", "macbook", "notebook", "air"],
        reply: () => {
            const p = catalog.products[3];
            return `💻 **${p.name}** — $${p.price}\n\n_${p.desc}_\n\n**Specs:**\n${p.specs}\n\n**Colors:** ${p.colors.join(", ")}\n**Rating:** ★ ${p.rating} (${p.reviews.toLocaleString()} reviews)\n**Warranty:** ${p.warranty}\n**Stock:** ${p.inStock ? "✅ In Stock — free next-day delivery!" : "⏳ Restocking"}\n\n24-hour battery means you can work all day without a charger! ⚡`;
        }
    },
    {
        patterns: ["recommend", "suggest", "gift", "best", "which", "comparison", "compare", "what should", "help me choose"],
        reply: () => {
            return `💡 **I'd love to help you find the perfect product!**\n\nLet me make some recommendations:\n\n**🎁 Under $300:** Nova Pro Headphones ($299)\n→ Perfect for music lovers, commuters, WFH professionals\n\n**⌚ Under $500:** Nova Watch Ultra ($449)\n→ Best for fitness enthusiasts, health tracking, outdoor activities\n\n**📱 Under $1,000:** Nova Phone 15 ($899)\n→ Ideal for photographers, power users, 5G early adopters\n\n**💻 Premium:** Nova Laptop Air ($1,299)\n→ Ultimate for professionals, students, content creators\n\n**🎯 Need a more specific recommendation?** Tell me:\n• What's it for? (work, fitness, entertainment, gift)\n• Budget range?\n• Any must-have features?\n\nI'll find the perfect match! 🎯`;
        }
    },
    {
        patterns: ["warranty", "guarantee", "protection", "insurance", "cover"],
        reply: () => {
            return `🛡️ **Warranty & Protection Plans:**\n\n**Standard Warranty (Included Free):**\n• 1-2 years depending on product\n• Covers manufacturing defects\n• Free repair or replacement\n\n**Extended Protection ($49/year):**\n• Covers accidental damage (drops, spills)\n• Screen replacement included\n• Priority support queue\n• Free loaner device during repair\n\n**How to File a Claim:**\n1. Chat with me or email support@novatech.com\n2. We arrange pickup or send a shipping label\n3. Repair/replacement in 5-7 business days\n\nWant me to add protection to a recent purchase? 🔒`;
        }
    },
    {
        patterns: ["price", "cost", "discount", "sale", "coupon", "promo", "deal", "offer", "cheap"],
        reply: () => {
            return `💰 **Pricing & Current Deals:**\n\n• Nova Pro Headphones — **$299** ~~$349~~ (Save $50!)\n• Nova Watch Ultra — **$449**\n• Nova Phone 15 — **$899** with free case\n• Nova Laptop Air — **$1,299** + free AirPods\n\n🎟️ **Active Promo Codes:**\n• **WELCOME10** — 10% off your first order\n• **BUNDLE20** — 20% off when you buy 2+ items\n\n💳 **Payment Options:**\n• Pay in 4 with Klarna/Afterpay (0% interest)\n• Student discount: Extra 10% with .edu email\n\nWant me to apply a promo code to your cart? 🛒`;
        }
    },
    {
        patterns: ["hello", "hi", "hey", "good morning", "good evening", "sup", "yo"],
        reply: () => {
            const greetings = [
                "Hey! 👋 Welcome to NovaTech Support! I'm your AI assistant and I'm here to help with orders, products, returns, or anything else. What can I do for you?",
                "Hi there! 😊 Great to see you at NovaTech! I can help with product info, order tracking, returns, and recommendations. How can I help?",
                "Hello! 🚀 Welcome to NovaTech. Whether you're shopping, tracking an order, or need support — I'm here 24/7. What do you need?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
    },
    {
        patterns: ["thank", "thanks", "thx", "appreciated", "awesome", "great", "perfect", "cool"],
        reply: () => {
            const thanks = [
                "You're welcome! 😊 Is there anything else I can help with? Enjoy your NovaTech experience! 🚀",
                "Happy to help! 💙 If you need anything else, I'm just a message away. Have a great day!",
                "Glad I could help! ✨ Don't hesitate to reach out anytime. We love our customers! 🎉"
            ];
            return thanks[Math.floor(Math.random() * thanks.length)];
        }
    },
    {
        patterns: ["human", "agent", "real person", "speak to someone", "manager", "support team", "escalate"],
        reply: () => {
            return `👤 **Connect with a Human Agent:**\n\nI understand! While I can handle most questions, here's how to reach our team:\n\n📧 **Email:** support@novatech.com (24h response)\n📞 **Phone:** 1-800-NOVA-TECH (Mon-Fri, 9 AM - 9 PM)\n💬 **Live Chat:** I can transfer you to a human agent right now\n\nBefore I transfer you, is there anything I can quickly help with? I might be able to solve it faster! ⚡`;
        }
    },
    {
        patterns: ["product", "catalog", "sell", "what do you", "browse", "shop", "buy", "all"],
        reply: () => {
            let msg = "🛍️ **Our Product Lineup:**\n\n";
            catalog.products.forEach(p => {
                msg += `**${p.name}** — $${p.price}\n_${p.desc}_\n★ ${p.rating} (${p.reviews.toLocaleString()} reviews)\n\n`;
            });
            msg += "Ask me about any product for full specs, availability, and recommendations! 🎯";
            return msg;
        }
    }
];

const defaultResponse = () => {
    const defaults = [
        "Good question! I can help with:\n\n• 📦 **Order tracking** — Where's my package?\n• ↩️ **Returns & refunds** — Easy and free\n• 🔍 **Product info** — Specs, prices, availability\n• 💡 **Recommendations** — Find the perfect product\n• 🛡️ **Warranty** — Coverage and claims\n\nJust ask! 😊",
        "I'd love to help! Try asking me about:\n\n• Our **products** and their features\n• **Tracking** your recent order\n• Starting a **return** or exchange\n• Getting a **personalized recommendation**\n\nWhat sounds helpful? 🚀"
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
        this.chatToggle.addEventListener('click', () => this.toggle());
        this.chatClose.addEventListener('click', () => this.close());
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.chatInput.value = chip.getAttribute('data-msg');
                this.sendMessage();
            });
        });

        document.getElementById('heroChatBtn')?.addEventListener('click', () => this.open());
        document.getElementById('navSupportBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });
    }

    toggle() { this.isOpen ? this.close() : this.open(); }

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

        this.addMessage(text, 'user');
        this.chatInput.value = '';

        if (this.suggestions) this.suggestions.style.display = 'none';

        this.showTyping();
        const thinkTime = 500 + Math.random() * 800;
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
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n• /g, '<br>• ')
            .replace(/\n→ /g, '<br>&nbsp;&nbsp;→ ')
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

document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
