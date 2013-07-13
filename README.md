Pound
=====

Pound is a simple service to retrieve a cell phone number from someones email
address.

You send a text with their email and receive their phone number back.

> Its webfinger for phones.

Give someone your easy to remember email instead of a number.

## Why? ##

Pretty much everyone has an email address already. They are unique, can
be easy to remember, and dont usally change often.

Other options exist; like vanity numbers, short codes, StarStarMe
numbers. These all give you an identifier to your phone number, however they
all require investments in creating, configuring and managing which can add up
to significant costs.

## Setup ##

If you have already setup your email address with webfinger or have an email
host that has done this for you then your all set, there is nothing you need to

*pound* uses webfinger to retrieve the phone number associated with a given
email address. So make sure you have your phone number defined in your webfinger
profile.

If you don't have webfinger setup, then you can go to the *pound* website and
register your email address and associate a phone number with it.

## Using ##

You send a text to the *pound* phone number with an email in the body of the
text. You will get a text back with the phone number that was found for that
email. If no number is found, you can opt to send the person an email.
