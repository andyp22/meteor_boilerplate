import { Router } from 'meteor/iron:router';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/home.js';

/*
 * Router settings for the iron:router package.
 */
Router.configure({
	layoutTemplate: 'ApplicationLayout',
	data: {
		title: "HealthCheck"
	}
});

Router.route('home', {
	name: 'home',
	path: '/',
	yieldRegions: {
		'ApplicationHeader': {to: 'header'},
		'ApplicationFooter': {to: 'footer'}
	},
});