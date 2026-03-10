# ⚙️ AI Automation Templates — Delivery Kit

## ⏱️ Estimated Delivery Time: 15-30 Minutes

## Available Templates

### 1. Email Auto-Responder (`email-auto-responder.json`)
**What it does:** Classifies incoming emails (pricing, support, orders, refunds) and sends tailored auto-replies.

**How to deliver:**
1. Import JSON in client's n8n instance
2. Edit the `Generate AI Response` node → Update templates with client info
3. Connect SMTP credentials (Gmail, Outlook, SendGrid)
4. Optionally connect Google Sheets for logging
5. Activate the workflow

### 2. Lead Capture + CRM (`lead-capture-crm.json`)
**What it does:** Captures leads from forms/chatbot, scores them, logs to Google Sheets CRM, sends welcome email, and notifies team via Telegram.

**How to deliver:**
1. Import JSON in client's n8n instance
2. Edit `Generate Welcome Email` node → Client branding
3. Connect Google Sheets (create a sheet with columns: Name, Email, Phone, Company, Budget, Message, Source, Score, Priority, Status, Date)
4. Connect email SMTP
5. Optional: Connect Telegram bot for notifications
6. Activate the workflow

## Quick Customization Checklist
- [ ] Replace `Your Client Business` with actual name
- [ ] Update contact details (email, phone, URLs)
- [ ] Customize response templates
- [ ] Connect SMTP credentials
- [ ] Connect Google Sheets
- [ ] Test with sample data
- [ ] Activate & deliver
