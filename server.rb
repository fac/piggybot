require 'base64'
require 'json'
require 'pony'
require 'sinatra'

set :bind, '0.0.0.0'

Pony.options = {
  :via => :smtp,
  :via_options => {
    :address => ENV['PIGGYBOT_SMTP_HOST'],
    :port => ENV['PIGGYBOT_SMTP_PORT'],
    :user_name => ENV['PIGGYBOT_SMTP_USERNAME'],
    :password => ENV['PIGGYBOT_SMTP_PASSWORD'],
    :domain => ENV['PIGGBOT_SMTP_DOMAIN'],
    :enable_starttls_auto => true,
    :authentication => :plain
  }
}

get '/' do
  content_type 'text/html'
  File.read('./public/index.html')
end

post '/email/?' do
  all_params = params.merge({
    chart: Base64.encode64(params[:chart])
  })

  html_body = erb(:html_email, locals: {params: all_params})
  plain_text_body = erb(:plain_text_email, locals: {params: all_params})

  Pony.mail(to: all_params[:email],
            from: 'Piggtbot <hello@piggybot.com>',
            subject: 'Your Piggybot Savings Report',
            charset: 'UTF-8',
            html_body: html_body,
            body: plain_text_body)

  body "{}"
end

not_found do
  redirect to('/#not_found')
end
