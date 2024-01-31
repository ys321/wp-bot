const express = require("express");
const { Client, LocalAuth, MessageMedia  } = require('whatsapp-web.js');
// const { Client, LocalAuth } = require("whatsapp-web.js");
const app = express(); 
const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

const allSessionObject = {};
const client = new Client({
    puppeteer: {
        headless: false,
    },
    authStrategy: new LocalAuth({
        clientId: "YOUR_CLIENT_ID",
    }),
});

client.on("qr", (qr) => {
    // Generate and scan this code with your phone 
    console.log("OR RECEIVED", qr);
});

client.on("ready", () => {
    console.log("Client is ready!");
});


client.on('message', async (message) => {
    if (message.body === 'meme') {
      //get media from url
      const media = await MessageMedia.fromUrl(
        'https://user-images.githubusercontent.com/41937681/162612030-11575069-33c2-4df2-ab1b-3fb3cb06f4cf.png'
      );
  
      //replying with media
      client.sendMessage(message.from, media, {
        caption: 'meme',
      });
    }
    else if(message.type === 'image' && message.body.startsWith('.sticker')){
      const media = await message.downloadMedia();
  
      client.sendMessage(message.from , media,{ sendMediaAsSticker : true })
    }
    else if (message.body === 'hello') {
      message.reply('Hiiiii');
    }
});

client.initialize();

// const qrcode = require('qrcode-terminal');
// const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// client.initialize();

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.on('authenticated', () => {
//   console.log('AUTHENTICATED');
// });

// client.on('ready', () => {
//   console.log('Client is ready!');
// });
// client.on('message', (message) => {
//   if (message.body === 'hello') {
//     message.reply('Hiiiii');
//   }
// });


// const qrcode = require('qrcode-terminal');
// const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// client.initialize();

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.on('authenticated', () => {
//   console.log('AUTHENTICATED');
// });

// client.on('ready', () => {
//   console.log('Client is ready!');
// });

// client.on('message', async (message) => {
//   if (message.body === 'meme') {
//     //get media from url
//     const media = await MessageMedia.fromUrl(
//       'https://user-images.githubusercontent.com/41937681/162612030-11575069-33c2-4df2-ab1b-3fb3cb06f4cf.png'
//     );

//     //replying with media
//     client.sendMessage(message.from, media, {
//       caption: 'meme',
//     });
//   }
//   else if (message.body === 'hello') {
//     message.reply('Hiiiii');
//   }
// });


