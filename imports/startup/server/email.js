import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { SSR } from 'meteor/meteorhacks:ssr';

import {
  emailSchema,
  getPrivateEmailSetting,
} from '/imports/startup/common/emails.js';


Meteor.startup( function() {
  const smtp_user = encodeURIComponent(getPrivateEmailSetting('smtp_user')),
      smtp_password = encodeURIComponent(getPrivateEmailSetting('smtp_password')),
      smtp_host = getPrivateEmailSetting('smtp_host'),
      smtp_port = getPrivateEmailSetting('smtp_port');
  
  if (smtp_user !== '' && smtp_password !== '' && smtp_host !== '' && smtp_port !== '') {
    process.env.MAIL_URL = 'smtp://' + smtp_user + ':' + smtp_password + '@' + smtp_host + ':' + smtp_port;
  }
  
  // Email Templates
  const emailDirectory = getPrivateEmailSetting('email_directory', 'email/');
  SSR.compileTemplate( 'contactEmail', Assets.getText(emailDirectory + 'contact-email.html'));
});

function sendEmailMethod(email) {
  check(email, emailSchema);
  if (email.text && email.html) {
    console.log({ message: 'An email cannot have both text and html.' });
  } else {
    console.log({ message: 'Email sent: ' + JSON.stringify(email) });
    Email.send(email);
    return 'Email sent';
  }
}

Meteor.methods({
  sendEmail: sendEmailMethod,
  sendTemplateEmail: function(email, templateName, templateData) {
    check(email, emailSchema);
    check(templateName, String);
    email.html = SSR.render(templateName, templateData);
    delete email.text;
    return sendEmailMethod(email);
  }
});

