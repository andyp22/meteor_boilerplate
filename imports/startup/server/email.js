import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { SSR } from 'meteor/meteorhacks:ssr';

import { emailSchema } from '/imports/startup/common/emails.js';

function getEmailSetting(privateSettingKey, defaultValue)  {
  let returnVal = defaultValue || '';
  if (Meteor.settings) {
    if (Meteor.settings.private) {
      if (Meteor.settings.private.email) {
        if (Meteor.settings.private.email[privateSettingKey]) {
          returnVal = Meteor.settings.private.email[privateSettingKey];
        }
      }
    }
  }
  return returnVal;
}

Meteor.startup( function() {
  const smtp_user = encodeURIComponent(getEmailSetting('smtp_user')),
      smtp_password = encodeURIComponent(getEmailSetting('smtp_password')),
      smtp_host = getEmailSetting('smtp_host'),
      smtp_port = getEmailSetting('smtp_port');
  
  if (smtp_user !== '' && smtp_password !== '' && smtp_host !== '' && smtp_port !== '') {
    process.env.MAIL_URL = 'smtp://' + smtp_user + ':' + smtp_password + '@' + smtp_host + ':' + smtp_port;
  }
  
  // Email Templates
  const emailDirectory = getEmailSetting('email_directory', 'email/');
  SSR.compileTemplate( 'htmlEmail', Assets.getText(emailDirectory + 'html-email.html'));
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

