
const express = require('express');
const app = express()
const scraperjs = require('scraperjs');
const port = 3000
var moment = require('moment'); 
const fs = require('fs');
let jsonData = require('./data.json');



const enableCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
let waktu = moment().format("DDMMYYYY");
var current = [];
var hasil =[];
    scraperjs.StaticScraper.create('https://www.logammulia.com/id')
	.scrape(function($) {
		return $(".current").map(function() {
			return $(this).text();
		}).get();
	})
	.then(function(news) {
        news.forEach((v,i) => {
            if(i == 0){
                var type = "emas";
            }else{
                var type = "perak";
            }
            current.push({date:moment().format("DD-MM-YYYY hh:mm:ss"),type:type,current_price:v.replace('Harga/gram ','')})
        });
        
        scraperjs.StaticScraper.create('https://www.logammulia.com/id')
	    .scrape(function($) {
		    return $(".last-price").map(function() {
		    	return $(this).text();
		    }).get();
	    })
	    .then(function(news) {
            news.forEach((v,i) => {
                let satu =v.replace(/\t/g,'')
                satu = satu.replace(/\n/g,'')
                satu = satu.replace("Harga Terakhir: ",'')
                if(i == 0){
                    var type = "emas";
                    current[0].last_price = satu
                }else{
                    var type = "perak";
                    current[1].last_price = satu
                }
                
            });
            app.get('/',(req,res)=>{
                res.send({
                    data: current
                })
            })
            // let data = JSON.stringify(current, null, 2);
            // fs.writeFileSync('data.json', data);

        
        })
})

app.use(enableCrossDomain);
console.log(current)


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})