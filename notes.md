https://api.edamam.com/search?q=chicken&app_id=${95a81719}&app_key=${e70d6d42019bc25878c26db82ac42248}

curl "https://api.edamam.com/search?q=chicken&app_id=${58675491}&app_key=${9990db552214a0bca846002505909f4d}&from=0&to=3&calories=591-722&health=alcohol-free"



https://api.edamam.com/search?q=chicken&app_id=${95a81719}&app_key=${e70d6d42019bc25878c26db82ac42248}


https://www.food2fork.com/api/search?key=d9c7bcab0e61e00398fd0ab0a218b8cf&q=chicken%20breast

Net::Http.get('https://www.food2fork.com/api/search?key=d9c7bcab0e61e00398fd0ab0a218b8cf&q=chicken%20breast')




url = URI.parse("https://www.food2fork.com/api/search?key=d9c7bcab0e61e00398fd0ab0a218b8cf&q=chicken%20breast")
response = Net::HTTP.get(url)
hash = JSON.parse response

url = URI.parse("https://api.edamam.com/search?q=chicken&app_id=95a81719&app_key=e70d6d42019bc25878c26db82ac42248")
response = Net::HTTP.get(url)
hash = JSON.parse response




http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

req = Net::HTTP::Get.new(url.to_s)
req.add_field 'x-api-key', ENV["SYGIC_API_KEY"]

res = Net::HTTP.start(url.host, url.port) {
   |http|
   http.request(req)
}
