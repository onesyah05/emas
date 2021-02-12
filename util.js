module.exports = {
	reformatPrice: (price) => {
		return price.replace("Harga/gram ", "")
		.replace("Rp", "")
		.replace(",00", "")
		.replace(".", "");
	}
}