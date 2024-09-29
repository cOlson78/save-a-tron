from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time

def scraper(query):
    url = "https://www.amazon.com/s?k=" + query

    # Initialize the WebDriver
    service = webdriver.ChromeService()
    driver = webdriver.Chrome(service=service)

    # Set the headers to avoid bot detection
    driver.get(url)
    time.sleep(3)  # Wait for page to load (increase if necessary)

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    result = []
    e = {
        "img": None,
        "title": "Showing Results from Amazon",
        "price": None
    }
    result.append(e)

    products = soup.findAll('div', attrs={'class': 's-result-item'})
    for product in products:
        img = None
        title = None
        price = None

        img_tag = product.find('img')
        if img_tag and 'src' in img_tag.attrs:
            img = img_tag.attrs['src']

        try:
            title = product.find('span', attrs={"class": "a-text-normal"}).text
        except Exception as e:
            print("This was an advertisement or title not found", e)

        try:
            # Extract both the whole and fractional parts of the price
            price_whole = product.find('span', attrs={"class": "a-price-whole"}).text
            price_fraction = product.find('span', attrs={"class": "a-price-fraction"}).text
            price = price_whole + "." + price_fraction  # Combine the whole and fractional part
        except Exception as e:
            print("This was an advertisement or price not found", e)

        if title:  # Only append if the title is found
            d = {
                "img": img,
                "title": title,
                "price": f"Rs. {"$"+price}" if price else None
            }
            result.append(d)

    driver.quit()
    return result
