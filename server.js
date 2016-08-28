var Botkit = require('botkit')
var accessToken = 'EAACeZAKVy1ooBAAkqCXIhZCQawl1IZA3nu8EmeExGhoCSKbbDok1dJ7nnZCdwENocelb0X5I9b79nZClPE4tDttZCLBqZAHmpiUqYaywAPyOGl68IZCzqW7cdSxJGl5QI2f6qjbsn4MZB8fwL1eomqO9PGqnIZBsEjUTFBysvBXGE5zKukZAKqdULac'
var verifyToken = 'thisisme'
var port = proecess.env.PORT

if(!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing')
if(!verifyToken) throw new Error('FACEBOOK_VERIFY_TOKEN is required but missing')
if(!port) throw new Error('PORT is required but missing')

var controller = Botkit.facebookbot({
    access_token: accessToken,
    verify_token: verifyToken
})

var bot = controller.spawn()

controller.setupWebserver(port, function(err, webserver){
    if(err) return console.log(err)
    controller.createWebhookEndpoints(webserver, bot, function(){
        console.log('Ready Player 1')
    })
})

controller.hears(['hello', 'hi'], 'message_received', function(bot, message){
    bot.reply(message, 'Hello!')
    bot.reply(message, 'I want to show you something')
    bot.reply(message,{
        attachment: {
            type: 'template',
            payload:{
                template_type: 'button',
                text: 'Which do you prefer',
                buttons: [
                    {
                        type: 'postback',
                        title: 'Cats',
                        payload: 'show_cat'
                    },
                    {
                        type: 'postback',
                        title: 'Dogs',
                        payload: 'show_dog'
                    }
                ]
            }
        }
    })
})
controller.on('facebook_postback', function(bot, message){
    switch(message.payload){
        case 'show_cat':
            bot.reply(message, {
            attachment:{
                type: 'image',
                payload: {
                    url: 'https://media.giphy.com/media/xzMCoYmILyv2E/giphy.gif'
                }
            }
        })
        break
        case 'show_dog':
            bot.reply(message, {
            attachment:{
                type: 'image',
                payload: {
                    url: 'https://i.imgur.com/AG9oDu5.gif'
                }
            }
        })
        break
    }
})