import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const emailSchema = new SimpleSchema({
  name: {
    type: String,
    max: 50,
  },
  to: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  from: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  cc: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  bcc: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  replyTo: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  subject: {
    type: String,
    max: 100,
  },
  signature: {
    type: String,
    max: 100,
    optional: true,
  },
  text: {
    type: String,
    max: 1000,
    optional: true,
  },
  html: {
    type: String,
    optional: true,
  },
});
