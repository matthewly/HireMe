#r = requests.get('https://www.googleapis.com/customsearch/v1?q=software+OR+engineer+OR+developer&cx=007494023296931513621%3Awwnjyngqucm&exactTerms=intern+OR+internship&start='+start+'&key=AIzaSyASVujTnW38PIlTZs9dbbEiGHiGs29Ixlo').json()

import requests
import json

location = 'Los Angeles, CA'

#with open('./client-side/public/data/fulltime.json', 'w') as outfile:
with open('./client/public/data/'+location+'internship.json', 'w') as outfile:
	data = {}
	items = []

	for request in range(7):
		page = str(request)
		start = str((request*10)+1)
		r = requests.get('https://www.googleapis.com/customsearch/v1?q=software+OR+engineer+OR+developer+Los%20Angeles&cx=007494023296931513621%3Awwnjyngqucm&exactTerms=intern+OR+internship&start='+start+'&key=AIzaSyASVujTnW38PIlTZs9dbbEiGHiGs29Ixlo').json()
		for item in range(10):
			print "Starting page " + page + " Entry " + str(item+1)
			if ("jobs" in r['items'][item]['formattedUrl']) and ("..." not in r['items'][item]['formattedUrl']) and ("..." not in r['items'][item]['title']) and ('Jobs at' not in r['items'][item]['title']) and ("(" not in r['items'][item]['title']):
				post = {}
				post['link'] = r['items'][item]['link']
				post['snippet'] = r['items'][item]['snippet']

				# boards.greenhouse.io
				if ( r['items'][item]['displayLink'] == "boards.greenhouse.io") and ('|' not in r['items'][item]['title']): 
					if (" at " in r['items'][item]['title']):
						post['job_title'] = r['items'][item]['title'][20:].split(" at ")[0]
						post['company_name'] = r['items'][item]['title'][20:].split(" at ")[1]

					else:
						print "Page " + page + " Entry " + str(item+1) + " done"
						continue
	
				# jobs.lever.co
				elif (r['items'][item]['displayLink'] == "jobs.lever.co"):
					if " - " in r['items'][item]['title']:
						post['job_title'] = r['items'][item]['title'].split(" - ")[1]
						post['company_name'] = r['items'][item]['title'].split(" - ")[0]

					else:
						print "Page " + page + " Entry " + str(item+1) + " done"
						continue
	
				if 'cse_image' in r['items'][item]['pagemap']:
					post['image_link'] = r['items'][item]['pagemap']['cse_image'][0]['src']

				else:
					post['image_link'] = ""

				if "..." not in post['company_name']:
					items.append(post)

			print "Page " + page + " Entry " + str(item+1) + " done"

		print "Page " + str(request+1) + " done"

	print "JSON created"


	
	data['items'] = items
	data['count'] = len(items)
	search_json = data
	json.dump(search_json, outfile, indent=4)