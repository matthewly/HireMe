import sys 
import json
import requests
import time
from datetime import date
from pprint import pprint

import urllib2
import urllib

location = sys.argv[1] #value1
job_type = sys.argv[2] #value2


#location = 'San Francisco, CA'

#with open('./client-side/public/data/fulltime.json', 'w') as outfile:
with open('../client/public/data/'+location+'fulltime.json', 'w') as outfile:
	data = {}
	items = []

	for request in range(1):
		page = str(request)
		start = str((request*10)+1)

		r = requests.get('https://www.googleapis.com/customsearch/v1?q=(developer+OR+software)+AND+%22'+location.replace(" ", "+")+'%22&cx=007494023296931513621%3Awwnjyngqucm&start='+start+'&key=AIzaSyASVujTnW38PIlTZs9dbbEiGHiGs29Ixlo').json()
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

	data['items'] = items
	data['count'] = len(items)
	data['date'] = str(date.today())

	search_json = data
	
	data = search_json

	for i in range(data['count']):

		headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/601.6.17 (KHTML, like Gecko) Version/9.1.1 Safari/601.6.17'}
		
		url = "http://api.glassdoor.com/api/api.htm?t.p=69178&t.k=k0TM4AtrHme&userip=8.28.178.133&useragent=Mozilla&format=json&v=1&action=employers&q="+urllib.quote(data['items'][i]['company_name'])
		hdr = {'User-Agent': 'Mozilla/5.0'}
		req = urllib2.Request(url,headers=hdr)
		response = urllib2.urlopen(req)
		gd = json.load(response)

		if len(gd['response']['employers']) > 0:
			industry = gd['response']['employers'][0]['industry']
			numberOfRatings = str(gd['response']['employers'][0]['numberOfRatings'])
			overallRating = str(gd['response']['employers'][0]['overallRating'])
			website = gd['response']['employers'][0]['website']
			image_link = gd['response']['employers'][0]['squareLogo']

		else:
			industry = "--"
			numberOfRatings = str(0)
			overallRating = str(0.0)
			website = "--"
			image_link = ""

		data['items'][i]['industry'] = industry
		data['items'][i]['numberOfRatings'] = str(numberOfRatings)
		data['items'][i]['overallRating'] = str(overallRating)
		data['items'][i]['website'] = website
		data['items'][i]['image_link'] = image_link

		print "Entry " + str(i) + " complete"

	outfile = open('../client/public/data/'+location+'fulltime.json', 'w+')
	json.dump(data, outfile, indent=4)
	outfile.close()

	print "JSON Created"