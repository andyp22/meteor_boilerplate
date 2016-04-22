import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './home.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

function counterHelper() {
  return Template.instance().counter.get();
}

function onButtonClick(event, instance) {
  // increment the counter when button is clicked
  instance.counter.set(instance.counter.get() + 1);
}

Template.hello.helpers({
  counter: counterHelper,
});

Template.hello.events({
  'click button': onButtonClick,
});
