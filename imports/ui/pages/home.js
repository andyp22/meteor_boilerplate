import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './home.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

function CounterHelper() {
  return Template.instance().counter.get();
}

function OnButtonClick(event, instance) {
  // increment the counter when button is clicked
  instance.counter.set(instance.counter.get() + 1);
}

Template.hello.helpers({
  counter: CounterHelper,
});

Template.hello.events({
  'click button': OnButtonClick,
});
