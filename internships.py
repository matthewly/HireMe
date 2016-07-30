
import requests
import json

location = 'San Francisco, CA'

#with open('./client-side/public/data/fulltime.json', 'w') as outfile:
with open('./client/public/data/'+location+'internship.json', 'w') as outfile:
	data = {}
	items = []

	for request in range(10):
		page = str(request)
		start = str((request*10)+1)

		r = requests.get('https://www.googleapis.com/customsearch/v1?q=software+OR+engineer+OR+developer&cx=007494023296931513621%3Awwnjyngqucm&exactTerms=intern+OR+internship&start='+start+'&key=AIzaSyASVujTnW38PIlTZs9dbbEiGHiGs29Ixlo').json()
		for item in range(10):
			print "Starting page " + page + " Entry " + str(item+1)
			post = {}
			post['company_name'] = ""
			post['link'] = r['items'][item]['link']
			post['snippet'] = r['items'][item]['snippet']

			# boards.greenhouse.io
			if ( r['items'][item]['displayLink'] == "boards.greenhouse.io") and ('|' not in r['items'][item]['title']) and ("jobs" in r['items'][item]['formattedUrl']) and ("..." not in r['items'][item]['formattedUrl']) and ("..." not in r['items'][item]['title']) and ('Jobs at' not in r['items'][item]['title']) and ("(" not in r['items'][item]['title']): 
				if (" at " in r['items'][item]['title']):
					post['job_title'] = r['items'][item]['pagemap']['metatags'][0]['og:title']
					post['company_name'] = r['items'][item]['title'][20:].split(" at ")[1]

				else:
					print "Page " + page + " Entry " + str(item+1) + " done"
					continue

			# jobs.lever.co
			elif (r['items'][item]['displayLink'] == "jobs.lever.co") and ("jobs" in r['items'][item]['formattedUrl']) and ("..." not in r['items'][item]['formattedUrl']) and ("..." not in r['items'][item]['title']) and ('Jobs at' not in r['items'][item]['title']) and ("(" not in r['items'][item]['title']):
				if " - " in r['items'][item]['title']:
					post['job_title'] = r['items'][item]['title'].split(" - ")[1]
					post['company_name'] = r['items'][item]['title'].split(" - ")[0]

				else:
					print "Page " + page + " Entry " + str(item+1) + " done"
					continue

			# www.glassdoor.com
			elif (r['items'][item]['displayLink'] == "www.glassdoor.com"):
				if "og:title" in r['items'][item]['pagemap']['metatags'][0]:
					post['job_title'] = r['items'][item]['pagemap']['metatags'][0]['og:title'].split(" Job")[0]
					post['company_name'] = r['items'][item]['pagemap']['metatags'][0]['og:description'].split("s job")[0][5:]
					
				else:
					print "Page " + page + " Entry " + str(item+1) + " done"
					continue

			# stackoverflow.com
			elif (r['items'][item]['displayLink'] == "stackoverflow.com") and ("..." not in r['items'][item]['title']):
				post['job_title'] = r['items'][item]['title'].split(" at ")[0]
				post['company_name'] = r['items'][item]['title'].split(" at ")[1].split(" - ")[0]

			if 'cse_image' in r['items'][item]['pagemap']:
				post['image_link'] = r['items'][item]['pagemap']['cse_image'][0]['src']

			else:
				post['image_link'] = ""

			if ("..." not in post['company_name']) and (post['company_name'] != ""):
				items.append(post)

			print "Page " + page + " Entry " + str(item+1) + " done"

		print "Page " + str(request+1) + " done"

	print "JSON created"


	
	data['items'] = items
	data['count'] = len(items)
	search_json = data
	json.dump(search_json, outfile, indent=4)