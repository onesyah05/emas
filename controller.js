const moment = require('moment'); 
const fs = require('fs');
const util = require("./util.js");
const scraperjs = require("scraperjs");

module.exports = {
	async getPrices(req, res, next) {
		let waktu = moment().format("DDMMYYYY");
		let current = [];

		try{
			let scrapped = await scraperjs.StaticScraper.create('https://www.logammulia.com/id')
			.scrape(function($) {
				return $(".current").map(function() {
					return $(this).text();
				}).get();
			})
			scrapped.forEach((v,i) => {

				let satu =v.replace(/\t/g,'')
				satu = satu.replace(/\n/g,'')
				satu = satu.replace("Harga Terakhir: ",'')

				if(i == 0){
					var type = "gold";
				}else{
					var type = "silver";
				}
				current.push({
					date:moment().format("DD-MM-YYYY hh:mm:ss"),
					type:type,
					current_price: util.reformatPrice(v),
					last_price: util.reformatPrice(satu),
				})

			});

			return current
		}catch(e){
			console.log(e);
			return current
		}
	}
}