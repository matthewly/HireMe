import requests
from pprint import pprint
import json

import urllib2, sys
import urllib

location = "San Francisco, CA"
count = 33

with open('../client/public/data/'+location+'fulltime.json', 'r+') as outfile:
	data = json.load(outfile)
	
	for i in range(count):

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
			image_link = "https://image.freepik.com/free-icon/multiple-users-silhouette_318-49546.png"

		data['items'][i]['industry'] = industry
		data['items'][i]['numberOfRatings'] = str(numberOfRatings)
		data['items'][i]['overallRating'] = str(overallRating)
		data['items'][i]['website'] = website
		data['items'][i]['image_link'] = image_link

		print "Entry " + str(i) + " complete"

	outfile = open('../client/public/data/'+location+'fulltime.json', 'w+')
	json.dump(data, outfile, indent=4)
	outfile.close()

	print "done"



