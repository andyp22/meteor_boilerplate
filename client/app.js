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

Handlebars.registerHelper('formatFilename', function(context) {
	var filename = context.replace(/ /g, "_");
	return filename;
});

Handlebars.registerHelper('isSelected', function(context, selection) {
	return context === selection ? 'selected' : 'unselected';
});

Handlebars.registerHelper('useView', function(context, item) {
	return item === 'expense' ? context : 'grid'; // forward all other buttons to grid
});

Handlebars.registerHelper('formatUnits', function(context) {
	function nFormatter(num) {
		if (num >= 1000000) {
			return { num: (num / 1000000).toFixed(1).replace(/\.0$/, ''), unit: 'M' };
		}
		if (num >= 1000) {
			return { num: (num / 1000).toFixed(1).replace(/\.0$/, ''), unit: 'K' };
		}
		return { num: num, unit: '' };
	}
	
	var formattedUnit = nFormatter(context);
	return formattedUnit.num + '<span class="unit">' + formattedUnit.unit + '</span>';
});
