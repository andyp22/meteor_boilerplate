/* global Assets:true */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env es6 */

import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { SSR } from 'meteor/meteorhacks:ssr';

import {
  emailSchema,
  getPrivateEmailSetting,
} from '/imports/startup/common/emails.js';


Meteor.startup(() => {
  const smtpUser = encodeURIComponent(getPrivateEmailSetting('smtp_user'));
  const smtpPassword = encodeURIComponent(getPrivateEmailSetting('smtp_password'));
  const smtpHost = getPrivateEmailSetting('smtp_host');
  const smtpPort = getPrivateEmailSetting('smtp_port');

  if (smtpUser !== '' && smtpPassword !== '' && smtpHost !== '' && smtpPort !== '') {
    process.env.MAIL_URL = `smtp://${smtpUser}:${smtpPassword}@${smtpHost}:${smtpPort}`;
  }

  // Email Templates
  const emailDirectory = getPrivateEmailSetting('email_directory', 'email');
  SSR.compileTemplate('contactEmail', Assets.getText(`${emailDirectory}/contact-email.html`));
});

function sendEmailMethod(email) {
  check(email, emailSchema);
  if (email.text && email.html) {
    console.log({ message: 'An email cannot have both text and html.' });
    return false;
  }
  console.log({ message: `Email sent: ${JSON.stringify(email)}` });
  Email.send(email);
  return 'Email sent';
}

Meteor.methods({
  sendEmail: sendEmailMethod,
  sendTemplateEmail: (email, templateName) => {
    check(email, emailSchema);
    check(templateName, String);
    email.html = SSR.render(templateName, email);
    delete email.text;
    return sendEmailMethod(email);
  },
});
