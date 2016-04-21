import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

/*
 * Handlebars Helpers
 */
function siteTitleHelper() {
  let title = 'Site Title';
  if (Meteor.settings) {
    if (Meteor.settings.public) {
      if (Meteor.settings.public.site_title) {
        title = Meteor.settings.public.site_title;
      }
    }
  }
  return title;
}

function JSONHelper(context) {
  return JSON.stringify(context);
}

Template.registerHelper('site_title', siteTitleHelper);
Template.registerHelper('json', JSONHelper);
