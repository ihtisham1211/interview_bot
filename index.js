const axios = require("axios");
const cheerio = require("cheerio");
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6394316552:AAF9epm1nJxMwkrriJJQ-X30B7Ejs0pzV6o');

const interval = 1 * 60 * 1000;
const groupChatId = '-986446582'

async function sendPeriodicMessage() {
  try {
    const html = await axios.get(
      "https://service2.diplo.de/rktermin/extern/appointment_showForm.do?locationCode=isla&realmId=108&categoryId=1600",
    );
    bot.sendMessage(groupChatId, 'Bot scanning! Runs every minute')
    const $ = cheerio.load(html.data);
    $(`#appointment_newAppointmentForm_fields_3__content`)
      .children("option")
      .each((_, elem) => {
        if(elem.attribs['value'].toString().includes('2024')){
          const option = elem.attribs['value'].split('/')
          bot.sendMessage(groupChatId, `Appointment found Keyword:2024 ${option[1]}`)
        }
      });
  } catch (error) {
    console.log(error);
  }
  setTimeout(sendPeriodicMessage, interval);
}

sendPeriodicMessage();