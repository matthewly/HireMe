import requests
import json

with open('./client-side/public/data/fulltime.json', 'w') as outfile:
#with open('internships.json', 'w') as outfile:
	data = {}
	items = []

	for request in range(3):
		start = str((request*10)+1)
		r = requests.get('https://www.googleapis.com/customsearch/v1?q=software+OR+engineer+OR+developer&cx=007494023296931513621%3Awwnjyngqucm&start='+start+'&key=AIzaSyASVujTnW38PIlTZs9dbbEiGHiGs29Ixlo').json()
		for item in range(10):
			if ("jobs" in r['items'][item]['formattedUrl']) and ("..." not in r['items'][item]['title']):
				post = {}
				post['link'] = r['items'][item]['link']
				post['snippet'] = r['items'][item]['snippet']

				# boards.greenhouse.io
				if (r['items'][item]['displayLink'] == "boards.greenhouse.io"):
					post['job_title'] = r['items'][item]['title'][20:].split(" at ")[0]
					print post['job_title']
					post['company_name'] = r['items'][item]['title'][20:].split(" at ")[1]
	
				# jobs.lever.co
				elif (r['items'][item]['displayLink'] == "jobs.lever.co"):
					post['job_title'] = r['items'][item]['title'].split(" - ")[1]
					post['company_name'] = r['items'][item]['title'].split(" - ")[0]
	
				if 'cse_image' in r['items'][item]['pagemap']:
					post['image_link'] = r['items'][item]['pagemap']['cse_image'][0]['src']

				else:
					post['image_link'] = ""

				if "..." not in post['company_name']:
					items.append(post)


	
	data['items'] = items
	data['count'] = len(items)
	search_json = data
	json.dump(search_json, outfile, indent=4)