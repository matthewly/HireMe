import requests
import json

with open('internships.json', 'w') as outfile:
	data = {}
	items = []

	for request in range(2):
		start = str((request*10)+1)
		r = requests.get('https://www.googleapis.com/customsearch/v1?q=software+OR+engineer+OR+developer&cx=007494023296931513621%3Awwnjyngqucm&exactTerms=intern+OR+internship&start='+start+'&key=AIzaSyASVujTnW38PIlTZs9dbbEiGHiGs29Ixlo').json()
		for item in range(10):
			post = {}
			post['title'] = r['items'][item]['title']
			post['displayLink'] = r['items'][item]['displayLink']
			post['formattedUrl'] = r['items'][item]['formattedUrl']
			items.append(post)
	
	data['items'] = items
	data['count'] = len(items)
	search_json = data
	json.dump(search_json, outfile, indent=4)