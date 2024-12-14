const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Create WhatsApp client instance
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

// Generate QR code for connection
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with WhatsApp to connect');
});

// When client is ready
client.on('ready', () => {
    console.log('Bot is connected and ready!');
});

// Handle received messages
client.on('message', async (message) => {
    // Ignore group messages
    if (message.isGroupMsg) return;

    // Get message content
    const messageContent = message.body.toLowerCase();

    // Automatic responses
    if (messageContent.includes('bonjour') || messageContent.includes('salut')) {
        await message.reply('Bonjour ! Comment puis-je vous aider ?');
    }
    else if (messageContent.includes('merci')) {
        await message.reply('Je vous en prie !');
    }
    else if (messageContent.includes('au revoir')) {
        await message.reply('Au revoir ! Passez une bonne journée !');
    }
    // You can add more conditions and responses here
});

// Start the client
client.initialize();