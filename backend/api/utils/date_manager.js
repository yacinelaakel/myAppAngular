module.exports = {
	timeStampToDate: function(timestamp) {
		const date    = new Date(timestamp * 1000);
		var day       = date.getDate();
		day   	      = '0' + day;
		var month     = date.getMonth() + 1;
		month   	  = '0' + month;
		const year    = date.getFullYear();
		const hours   = date.getHours();
		const minutes = '0' + date.getMinutes();

		return day.substr(-2) + '-' + month.substr(-2) + '-' + year + ' ' + hours + ':' + minutes.substr(-2);
	}
}