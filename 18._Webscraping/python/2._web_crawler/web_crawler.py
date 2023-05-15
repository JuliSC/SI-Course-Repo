import requests
from bs4 import BeautifulSoup
import re

BASE_URL = "https://en.wikipedia.org"

visited_pages = set()
to_visit_queue = []

# Rules for internal Wikipedia links:
# They reside within the div with the id set to bodyContent
# The URLs do not contain colons
# The URLs begin with /wiki/
 

def get_parsed_wiki_page(endpoint):
  html_page = requests.get(BASE_URL + endpoint).text
  return BeautifulSoup(html_page, "lxml")

def get_internal_wiki_link_tags(parsed_page):
  return parsed_page.find('div', { "id": "bodyContent" }).find_all('a', href=re.compile("^(/wiki/)((?!:).)*$"))

def add_tags_in_visiting_queue(link_tags):
  if link_tags is None:
    return 

  new_queue = []
  for link_tag in link_tags:
    if link_tag["href"]:
      internal_link = link_tag["href"]
      if internal_link not in visited_pages and internal_link not in to_visit_queue:
        new_queue.append(internal_link)
  return new_queue

parsed_root_page = get_parsed_wiki_page("/wiki/Monty_Python")
root_internal_links = get_internal_wiki_link_tags(parsed_root_page)
to_visit_queue = add_tags_in_visiting_queue(root_internal_links)

for _ in range(5):
  new_temp_visit_queue = []
  for link_to_visit in to_visit_queue:
    print(link_to_visit)
    parsed_page = get_parsed_wiki_page(link_to_visit)
    internal_links = get_internal_wiki_link_tags(parsed_page)
    new_temp_visit_queue = add_tags_in_visiting_queue(internal_links)

    visited_pages.add(link_to_visit)
  to_visit_queue += new_temp_visit_queue
print(visited_pages)