const express = require('express');
const app = express()
const controller = require("./controller.js")
const port = 3000

const enableCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
}

app.use(enableCrossDomain);
app.use("/", async function(req, res, next) {
	let data = await controller.getPrices();

	res.send(data);
})
app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`)
})