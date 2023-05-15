import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule

class WikipagespiderSpider(scrapy.Spider):
    name = "WikiPageSpider"
    allowed_domains = ["en.wikipedia.org"]
    start_urls = ["https://en.wikipedia.org/wiki/List_of_common_misconceptions"]

    rules = (
        Rule(LinkExtractor(allow=r'/wiki/'), callback='parse', follow=True)
    )

    def parse(self, response):
        yield {
            'url': response.url,
            'title': response.css('h1::text').get(),
            'content': response.css('p::text').getall(),
        }
