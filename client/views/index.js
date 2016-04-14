import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './index.html';

Router.route('home', {
	name: 'home',
	path: '/',
	yieldRegions: {
		'ApplicationHeader': {to: 'header'},
		'ApplicationFooter': {to: 'footer'}
	},
});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter: function() {
    return Template.instance().counter.get();
  }
});

Template.hello.events({
  'click button' : function(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});