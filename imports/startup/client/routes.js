import { Router } from 'meteor/iron:router';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/home.js';
import '../../ui/pages/contact.js';

/*
 * Router settings for the iron:router package.
 */
Router.configure({
  layoutTemplate: 'ApplicationLayout',
});

Router.route('home', {
  name: 'home',
  path: '/',
  template: 'home_page',
  yieldRegions: {
    ApplicationHeader: { to: 'header' },
    ApplicationFooter: { to: 'footer' },
  },
});

Router.route('contact', {
  name: 'contact',
  path: '/contact',
  template: 'contactPage',
  yieldRegions: {
    ApplicationHeader: { to: 'header' },
    ApplicationFooter: { to: 'footer' },
  },
});
