# PiggyBot

```
           ___
         ',_`""\        .---,
            \   :-""``/`    |
             `;'     //`\   /
             /   __     |   ('.
            |_ ./O)\     \  `) \
           _/-.    `      `"`  |`-.
       .-=; `                  /   `-.
      /o o \   ,_,           .        '.
      L._._;_.-'           .            `'-.
        `'-.`             '                 `'-.
            `.         '                        `-._
              '-._. -'                              '.
                 \                                    `\
                  |                                     \
                  |    |                                 ;   _.
                  \    |           |                     |-.((
                   ;.  \           /    /                |-.`\)
                   | '. ;         /    |                 |(_) )
                   |   \ \       /`    |                 ;'--'
                    \   '.\    /`      |                /
                     |   /`|  ;        \               /
                     |  |  |  |-._      '.           .'
                     /  |  |  |__.`'---"_;'-.     .-'
                    //__/  /  |    .-'``     _.-'`
                          //__/   //___.--''`
```

PiggyBot was originally created during a FreeAgent Hack Days project in 2014. In February 2015, another Hack Days team decided to polish it off and put it live.

We've only spent around 4 days on this so it's pretty rough and ready. There's a noticeable lack of tests for a start. Feel free to send us a pull request with improvements.

## Technology

* Sinatra back end
* React.js and Backbone.js front end

## Requirements

* Ruby 2.0 or later
* SMTP server details (if you want email to work)

## To run

First install the Bundler gem:

```
gem install bundler
```

Then pull in all the dependencies:

```
bundle install
```

To run the Sinatra app:

```
ruby server.rb
```

You can then view PiggyBot in your browser at http://localhost:4567.

## Email

To configure the email set the following environment variables:

```
PIGGYBOT_SMTP_HOST=''
PIGGYBOT_SMTP_PORT=''
PIGGYBOT_SMTP_USERNAME=''
PIGGYBOT_SMTP_PASSWORD=''
PIGGBOT_SMTP_DOMAIN=''
```
