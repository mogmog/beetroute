import urllib.request, json
with urllib.request.urlopen("https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/2018-05-28_factbook.json") as url:
    data = json.loads(url.read().decode())

    for country in data['countries']:
        print (data['countries'][country]['data']['name'])
