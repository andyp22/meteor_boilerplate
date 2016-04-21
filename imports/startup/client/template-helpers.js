import { Template } from 'meteor/templating';
/*
 * Handlebars Helpers
 */
Template.registerHelper('site_title', function(context) {
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

Template.registerHelper('json', function(context) {
	return JSON.stringify(context);
});
