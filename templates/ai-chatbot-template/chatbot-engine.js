/* =============================================
   ⚡ AI-POWERED CHATBOT ENGINE — DO NOT EDIT
   =============================================
   This engine connects to OpenAI's API for real
   AI-powered conversations. It falls back to
   pattern matching when the API is unavailable.

   Requires: config.js loaded before this file
   ============================================= */

class AIChatBot {
    constructor() {
        this.messageCount = 0;
        this.leadCaptured = false;
        this.isOpen = false;
        this.conversationHistory = [];
        this.lastMessageTime = 0;
        this.sessionStart = Date.now();
        this.init();
    }

    init() {
        this.buildSystemPrompt();
        this.injectStyles();
        this.injectHTML();
        this.bindEvents();
    }

    // ===== BUILD SYSTEM PROMPT =====
    buildSystemPrompt() {
        const b = CLIENT_CONFIG.business;
        let prompt = CLIENT_CONFIG.ai.systemPrompt
            .replace(/\{BUSINESS_NAME\}/g, b.name)
            .replace(/\{INDUSTRY\}/g, b.industry)
            .replace(/\{TAGLINE\}/g, b.tagline)
            .replace(/\{EMAIL\}/g, b.email)
            .replace(/\{PHONE\}/g, b.phone)
            .replace(/\{ADDRESS\}/g, b.address)
            .replace(/\{HOURS\}/g, b.hours)
            .replace(/\{WEBSITE\}/g, b.website);

        this.systemPrompt = prompt;
        this.conversationHistory = [
            { role: "system", content: this.systemPrompt }
        ];
    }

    // ===== REPLACE PLACEHOLDERS =====
    replacePlaceholders(text) {
        const b = CLIENT_CONFIG.business;
        return text
            .replace(/\{BUSINESS_NAME\}/g, b.name)
            .replace(/\{EMAIL\}/g, b.email)
            .replace(/\{PHONE\}/g, b.phone)
            .replace(/\{ADDRESS\}/g, b.address)
            .replace(/\{HOURS\}/g, b.hours)
            .replace(/\{WEBSITE\}/g, b.website);
    }

    // ===== MAIN AI API CALL (DISPATCHER) =====
    async getAIResponse(userMessage) {
        const ai = CLIENT_CONFIG.ai;
        const provider = ai.provider || "gemini";

        // Add user message to history
        this.conversationHistory.push({
            role: "user",
            content: userMessage
        });

        // Keep conversation history manageable (last 20 messages + system)
        if (this.conversationHistory.length > 21) {
            this.conversationHistory = [
                this.conversationHistory[0],
                ...this.conversationHistory.slice(-20)
            ];
        }

        try {
            let response;
            switch (provider) {
                case "gemini":
                    response = await this.getGeminiResponse(userMessage);
                    break;
                case "groq":
                    response = await this.getGroqResponse(userMessage);
                    break;
                case "openai":
                    response = await this.getOpenAIResponse(userMessage);
                    break;
                case "local":
                    response = await this.getLocalResponse(userMessage);
                    break;
                default:
                    response = await this.getGeminiResponse(userMessage);
            }

            // Add assistant response to history
            this.conversationHistory.push({
                role: "assistant",
                content: response
            });

            return response;
        } catch (error) {
            console.warn(`[${provider}] API error, falling back to pattern matching:`, error.message);
            return this.getPatternResponse(userMessage);
        }
    }

    // ===== GOOGLE GEMINI API =====
    async getGeminiResponse(userMessage) {
        const ai = CLIENT_CONFIG.ai;
        const apiKey = ai.geminiApiKey;

        if (!apiKey) {
            throw new Error("Gemini API key not configured");
        }

        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2-5-flash:generateContent?key=" + apiKey, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: this.systemPrompt + "\n\nUser: " + userMessage
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: ai.maxTokens,
                    temperature: ai.temperature
                }
            })
        });

        if (response.status === 429) {
            return this.replacePlaceholders(ai.rateLimitResponse);
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Gemini API error: ${response.status} - ${error.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // ===== GROQ API (Cheap & Fast) =====
    async getGroqResponse(userMessage) {
        const ai = CLIENT_CONFIG.ai;
        const apiKey = ai.groqApiKey;

        if (!apiKey) {
            throw new Error("Groq API key not configured");
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: ai.models.groq,
                messages: this.conversationHistory,
                max_tokens: ai.maxTokens,
                temperature: ai.temperature
            })
        });

        if (response.status === 429) {
            return this.replacePlaceholders(ai.rateLimitResponse);
        }

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // ===== OPENAI API =====
    async getOpenAIResponse(userMessage) {
        const ai = CLIENT_CONFIG.ai;
        const apiKey = ai.openaiApiKey;

        if (!apiKey) {
            throw new Error("OpenAI API key not configured");
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: ai.models.openai,
                messages: this.conversationHistory,
                max_tokens: ai.maxTokens,
                temperature: ai.temperature
            })
        });

        if (response.status === 429) {
            return this.replacePlaceholders(ai.rateLimitResponse);
        }

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // ===== LOCAL OLLAMA API =====
    async getLocalResponse(userMessage) {
        const ai = CLIENT_CONFIG.ai;
        const ollamaUrl = ai.localOllamaUrl || "http://localhost:11434";
        const model = ai.models.local || "mistral";

        const response = await fetch(`${ollamaUrl}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: this.conversationHistory,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status} - Make sure Ollama is running at ${ollamaUrl}`);
        }

        const data = await response.json();
        return data.message.content;
    }

    // ===== PATTERN MATCHING FALLBACK =====
    getPatternResponse(userMsg) {
        const lower = userMsg.toLowerCase();
        for (const entry of CLIENT_CONFIG.knowledgeBase) {
            for (const pattern of entry.patterns) {
                if (lower.includes(pattern)) {
                    const resp = typeof entry.response === 'function' ? entry.response() : entry.response;
                    return this.replacePlaceholders(resp);
                }
            }
        }
        return this.replacePlaceholders(
            CLIENT_CONFIG.ai.fallbackResponse ||
            CLIENT_CONFIG.defaultResponse ||
            "I'm not sure about that. Please contact us directly!"
        );
    }

    // ===== RATE LIMITING =====
    isRateLimited() {
        const now = Date.now();
        const limit = CLIENT_CONFIG.limits?.rateLimitMs || 2000;
        if (now - this.lastMessageTime < limit) return true;
        this.lastMessageTime = now;
        return false;
    }

    isSessionExpired() {
        const timeout = CLIENT_CONFIG.limits?.sessionTimeoutMs || 30 * 60 * 1000;
        return Date.now() - this.sessionStart > timeout;
    }

    isOverMessageLimit() {
        const max = CLIENT_CONFIG.limits?.maxMessagesPerSession || 50;
        return this.messageCount >= max;
    }

    // ===== LEAD CAPTURE WEBHOOK =====
    async sendLeadToWebhook(email) {
        const lc = CLIENT_CONFIG.leadCapture;
        if (!lc.webhookUrl) return;

        try {
            await fetch(lc.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    business: CLIENT_CONFIG.business.name,
                    timestamp: new Date().toISOString(),
                    source: "ai-chatbot"
                })
            });
        } catch (e) {
            console.warn("Webhook failed:", e.message);
        }
    }

    // ===== INJECT CSS =====
    injectStyles() {
        const c = CLIENT_CONFIG.appearance;
        const style = document.createElement('style');
        style.textContent = `
            #cb-toggle {
                position: fixed; bottom: 24px; ${c.position === 'bottom-left' ? 'left' : 'right'}: 24px;
                width: ${c.toggleSize}; height: ${c.toggleSize};
                background: ${c.primaryColor}; color: white;
                border: none; border-radius: 50%; cursor: pointer;
                font-size: 1.6rem; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 8px 32px ${c.primaryColor}44;
                transition: all 0.3s ease; z-index: 9999;
                animation: cb-bounce 2s ease infinite;
            }
            #cb-toggle:hover { transform: scale(1.1); }
            @keyframes cb-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
            }

            #cb-window {
                position: fixed; bottom: 96px; ${c.position === 'bottom-left' ? 'left' : 'right'}: 24px;
                width: 380px; height: 520px;
                background: ${c.bgColor}; border-radius: 20px;
                box-shadow: 0 20px 80px rgba(0,0,0,0.5);
                display: none; flex-direction: column;
                overflow: hidden; z-index: 9999;
                border: 1px solid ${c.primaryColor}22;
                animation: cb-slideUp 0.3s ease;
                font-family: 'Inter', -apple-system, sans-serif;
            }
            #cb-window.open { display: flex; }
            @keyframes cb-slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .cb-header {
                background: linear-gradient(135deg, ${c.primaryColor}, ${c.primaryLight});
                padding: 18px 20px; display: flex; align-items: center; gap: 12px;
                position: relative;
            }
            .cb-header-avatar {
                width: 40px; height: 40px; background: rgba(255,255,255,0.2);
                border-radius: 50%; display: flex; align-items: center; justify-content: center;
                font-size: 1.2rem;
            }
            .cb-header-info h4 { color: white; font-size: 0.95rem; font-weight: 700; margin: 0; }
            .cb-header-info span { color: rgba(255,255,255,0.8); font-size: 0.75rem; }
            .cb-ai-badge {
                position: absolute; top: 14px; right: 48px;
                font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
                letter-spacing: 1px; padding: 3px 8px; border-radius: 100px;
                background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9);
            }
            .cb-close {
                position: absolute; top: 14px; right: 16px;
                background: none; border: none; color: rgba(255,255,255,0.7);
                font-size: 1.5rem; cursor: pointer; line-height: 1;
            }
            .cb-close:hover { color: white; }

            .cb-messages {
                flex: 1; overflow-y: auto; padding: 16px;
                display: flex; flex-direction: column; gap: 12px;
                scrollbar-width: thin;
                scrollbar-color: ${c.primaryColor}33 transparent;
            }

            .cb-msg { display: flex; gap: 8px; max-width: 88%; animation: cb-fadeIn 0.3s ease; }
            .cb-msg.bot { align-self: flex-start; }
            .cb-msg.user { align-self: flex-end; flex-direction: row-reverse; }
            @keyframes cb-fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

            .cb-avatar {
                width: 30px; height: 30px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 0.85rem; flex-shrink: 0;
            }
            .cb-msg.bot .cb-avatar { background: ${c.primaryColor}22; }
            .cb-msg.user .cb-avatar { background: ${c.primaryLight}22; }

            .cb-bubble {
                padding: 10px 14px; border-radius: 16px;
                font-size: 0.85rem; line-height: 1.6; color: ${c.textColor};
            }
            .cb-msg.bot .cb-bubble {
                background: ${c.bgCard};
                border-bottom-left-radius: 4px;
            }
            .cb-msg.user .cb-bubble {
                background: ${c.primaryColor};
                border-bottom-right-radius: 4px;
            }
            .cb-bubble strong { font-weight: 700; }
            .cb-bubble em { font-style: italic; color: ${c.textMuted}; }

            .cb-suggestions {
                padding: 8px 16px 12px; display: flex; gap: 6px; flex-wrap: wrap;
            }
            .cb-chip {
                padding: 6px 14px; border-radius: 100px; border: 1px solid ${c.primaryColor}33;
                background: ${c.primaryColor}0D; color: ${c.primaryLight};
                font-size: 0.75rem; font-weight: 600; cursor: pointer;
                transition: all 0.2s ease; font-family: inherit;
            }
            .cb-chip:hover { background: ${c.primaryColor}22; transform: translateY(-1px); }

            .cb-input-area {
                padding: 12px 16px; border-top: 1px solid ${c.primaryColor}15;
                display: flex; gap: 8px; align-items: center;
            }
            .cb-input {
                flex: 1; padding: 10px 16px; border-radius: 100px;
                border: 1px solid ${c.primaryColor}22; background: ${c.bgCard};
                color: ${c.textColor}; font-size: 0.85rem; font-family: inherit;
                outline: none; transition: border 0.2s;
            }
            .cb-input:focus { border-color: ${c.primaryColor}; }
            .cb-input::placeholder { color: ${c.textMuted}; }
            .cb-send {
                width: 38px; height: 38px; border-radius: 50%;
                background: ${c.primaryColor}; border: none; color: white;
                cursor: pointer; display: flex; align-items: center; justify-content: center;
                font-size: 1rem; transition: all 0.2s;
            }
            .cb-send:hover { background: ${c.primaryLight}; transform: scale(1.05); }

            .cb-typing { display: flex; gap: 4px; padding: 4px 0; }
            .cb-typing span {
                width: 6px; height: 6px; background: ${c.textMuted};
                border-radius: 50%; animation: cb-dot 1.4s ease infinite;
            }
            .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
            .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes cb-dot {
                0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                40% { transform: scale(1); opacity: 1; }
            }

            @media (max-width: 480px) {
                #cb-window { width: calc(100vw - 16px); right: 8px; left: 8px; bottom: 80px; height: 70vh; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== INJECT HTML =====
    injectHTML() {
        const c = CLIENT_CONFIG.appearance;
        const s = CLIENT_CONFIG.suggestions;
        const welcomeMsg = this.replacePlaceholders(c.welcomeMessage);

        // Toggle button
        const toggle = document.createElement('button');
        toggle.id = 'cb-toggle';
        toggle.innerHTML = c.toggleIcon;
        toggle.setAttribute('aria-label', 'Open chat');
        document.body.appendChild(toggle);

        // Chat window
        const win = document.createElement('div');
        win.id = 'cb-window';
        win.innerHTML = `
            <div class="cb-header">
                <div class="cb-header-avatar">${c.botEmoji}</div>
                <div class="cb-header-info">
                    <h4>${c.botName}</h4>
                    <span>● Online — AI-Powered</span>
                </div>
                <span class="cb-ai-badge">AI</span>
                <button class="cb-close" aria-label="Close chat">×</button>
            </div>
            <div class="cb-messages" id="cb-messages"></div>
            <div class="cb-suggestions" id="cb-suggestions">
                ${s.map(sg => `<button class="cb-chip" data-msg="${sg.message}">${sg.label}</button>`).join('')}
            </div>
            <div class="cb-input-area">
                <input type="text" class="cb-input" id="cb-input" placeholder="${c.placeholder}" maxlength="${CLIENT_CONFIG.limits?.maxMessageLength || 500}">
                <button class="cb-send" id="cb-send" aria-label="Send">➤</button>
            </div>
        `;
        document.body.appendChild(win);

        // Welcome message
        this.addMessage(welcomeMsg, 'bot');
    }

    // ===== BIND EVENTS =====
    bindEvents() {
        document.getElementById('cb-toggle').addEventListener('click', () => this.toggle());
        document.querySelector('.cb-close').addEventListener('click', () => this.close());
        document.getElementById('cb-send').addEventListener('click', () => this.send());
        document.getElementById('cb-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.send();
        });
        document.querySelectorAll('.cb-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.getElementById('cb-input').value = chip.dataset.msg;
                this.send();
            });
        });
    }

    toggle() { this.isOpen ? this.close() : this.open(); }

    open() {
        this.isOpen = true;
        document.getElementById('cb-window').classList.add('open');
        document.getElementById('cb-toggle').style.display = 'none';
        document.getElementById('cb-input').focus();
    }

    close() {
        this.isOpen = false;
        document.getElementById('cb-window').classList.remove('open');
        document.getElementById('cb-toggle').style.display = 'flex';
    }

    async send() {
        const input = document.getElementById('cb-input');
        const text = input.value.trim();
        if (!text) return;

        // Rate limiting
        if (this.isRateLimited()) return;

        // Session checks
        if (this.isSessionExpired()) {
            this.addMessage("Your session has expired. Please refresh the page to continue chatting!", 'bot');
            return;
        }

        if (this.isOverMessageLimit()) {
            this.addMessage(this.replacePlaceholders(
                "You've reached the message limit for this session. For more help, contact us at {EMAIL}!"
            ), 'bot');
            return;
        }

        this.addMessage(text, 'user');
        input.value = '';
        this.messageCount++;

        // Hide suggestions after first message
        const sug = document.getElementById('cb-suggestions');
        if (sug) sug.style.display = 'none';

        // Show typing indicator
        this.showTyping();

        // Check lead capture trigger
        const lc = CLIENT_CONFIG.leadCapture;
        if (lc.enabled && !this.leadCaptured && this.messageCount >= lc.triggerAfterMessages) {
            // Check if user provided an email
            const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
            if (emailMatch) {
                this.leadCaptured = true;
                this.sendLeadToWebhook(emailMatch[0]);
                this.hideTyping();
                this.addMessage(this.replacePlaceholders(lc.successMessage), 'bot');
                return;
            } else if (this.messageCount === lc.triggerAfterMessages) {
                this.hideTyping();
                this.addMessage(this.replacePlaceholders(lc.message), 'bot');
                return;
            }
        }

        // Get AI response
        let response;
        if (CLIENT_CONFIG.ai.apiKey) {
            response = await this.getAIResponse(text);
        } else {
            // No API key — use pattern matching fallback
            await new Promise(r => setTimeout(r, 400 + Math.random() * 600));
            response = this.getPatternResponse(text);
        }

        this.hideTyping();
        this.addMessage(response, 'bot');
    }

    addMessage(text, sender) {
        const messages = document.getElementById('cb-messages');
        const div = document.createElement('div');
        div.className = `cb-msg ${sender}`;
        div.innerHTML = `
            <div class="cb-avatar">${sender === 'bot' ? CLIENT_CONFIG.appearance.botEmoji : '👤'}</div>
            <div class="cb-bubble">${this.format(text)}</div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    format(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n- /g, '<br>• ')
            .replace(/\n• /g, '<br>• ')
            .replace(/\n/g, '<br>')
            .replace(/^/, '<p>').replace(/$/, '</p>');
    }

    showTyping() {
        const messages = document.getElementById('cb-messages');
        const div = document.createElement('div');
        div.className = 'cb-msg bot';
        div.id = 'cb-typing';
        div.innerHTML = `
            <div class="cb-avatar">${CLIENT_CONFIG.appearance.botEmoji}</div>
            <div class="cb-bubble"><div class="cb-typing"><span></span><span></span><span></span></div></div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    hideTyping() {
        const t = document.getElementById('cb-typing');
        if (t) t.remove();
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => new AIChatBot());
