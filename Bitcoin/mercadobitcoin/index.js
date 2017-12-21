//index.js
require("dotenv-safe").load()
const MercadoBitcoin = require("./api").MercadoBitcoin
var infoApi = new MercadoBitcoin({ currency: 'BTC' })

setInterval(() => 
   infoApi.ticker((tick) => console.log(tick)),
   process.env.CRAWLER_INTERVAL
)
