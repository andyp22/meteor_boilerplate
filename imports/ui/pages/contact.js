import './contact.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.contactPage.events({
  'click #sendEmailBtn': function()  {
    const email = {
      name: 'John Doe',
      to: 'john.doe@email.com',
      from: 'jane.deer@email.com',
      subject: 'Test Template'
    };
    const templateName = 'htmlEmail';
    const templateData = {
      name: "Two Penny",
      favoriteRestaurant: "My Two Cents",
      bestFriend: "Penny Foryour Thoughts"
    };
    Meteor.call('sendTemplateEmail', email, templateName, templateData);
  },
});
