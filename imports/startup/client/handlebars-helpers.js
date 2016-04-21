/*
 * Handlebars Helpers
 */
Handlebars.registerHelper('site_title', function(context) {
	var title = "Site Title";
	if(Meteor.settings)  {
		if(Meteor.settings.public)  {
			if(Meteor.settings.public.site_title)  {
				title = Meteor.settings.public.site_title;
			}
		}
	}
	return title;
});

Handlebars.registerHelper('json', function(context) {
	return JSON.stringify(context);
});
