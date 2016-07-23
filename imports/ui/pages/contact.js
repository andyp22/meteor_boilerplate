/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
/* eslint-env es6 */

import './contact.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { AutoForm } from 'meteor/aldeed:autoform';

import { 
  contactFormSchema,
  getPublicEmailSetting,
} from '/imports/startup/common/emails.js';

const contactFormTemplateName = new ReactiveVar('contactForm');

Template.contactPage.helpers({
  contactFormTemplate() {
    return contactFormTemplateName.get();
  },
});

Template.contactForm.helpers({
  contactFormSchema() {
    return contactFormSchema;
  },
});

Template.contactFormSent.onDestroyed(() => {
  contactFormTemplateName.set('contactForm');
});

AutoForm.hooks({
  contactForm: {
    onSubmit(insertDoc) {
      const contactEmail = Object.assign({}, insertDoc);
      contactEmail.to = getPublicEmailSetting('contact_form_from' , 'john.doe@email.com');
      Meteor.call('sendTemplateEmail', contactEmail, 'contactEmail', contactEmail);

      this.done();
      return false;
    },
    onSuccess() {
      contactFormTemplateName.set('contactFormSent');
    },
  },
});

