function prettyDate(date) {
	return ("0" + (date.getDate())).slice(-2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' +date.getFullYear() + ' ' +("0" + date.getHours()).slice(-2) + ':' +("0" + date.getMinutes()).slice(-2) + ':' +("0" + date.getSeconds()).slice(-2);
}

AppInfo={
	"build":prettyDate(new Date()),
	"author":"You",
	"branch":"...",
	"date":prettyDate(new Date()),
	"short":"...",
	"long":"..",
	"tag":"..."
};

Meteor.startup(function() {
	if (Meteor.isClient) {
		Template.registerHelper('AppInfo',function(field) {
			return field?AppInfo[field]:AppInfo;
		});
	}
})