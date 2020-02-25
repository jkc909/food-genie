if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_food-genie', domain: 'https://murmuring-sierra-33532.herokuapp.com/'
  else
    Rails.application.config.session_store :cookie_store, key: '_food-genie' 
  end