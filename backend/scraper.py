from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from db import connect_to_db, insert_product, cache_search, cache_query
import time
import csv
from datetime import datetime

def scraper(query,dept):

    connection = connect_to_db()
    if (cache_query(connection, query)):
        result = cache_search(connection, query)
    
        return result


    url = "https://www.amazon.com/s?k=" + query + "&i=" + dept

    # Set up Chrome options to include headers
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")  # disable Selenium detection
    chrome_options.add_argument("--headless")  # run in headless mode

    # Add user-agent to mimic a regular browser
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    )

    # Initialize WebDriver using ChromeDriverManager
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    # Load the Amazon search results page
    driver.get(url)
    
    time.sleep(3)  # Wait for the page to load (increase if necessary)

    # Parse the page content with BeautifulSoup
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    result = []
    e = {
        "img": None,
        "title": "Showing Results from Amazon",
        "price": None,
        "url": None
    }
    result.append(e)

    products = soup.findAll('div', attrs={'class': 's-result-item'})
    for product in products:
        img = None
        title = None
        price = None
        product_url = None

        # Extract the image URL
        img_tag = product.find('img')
        if img_tag and 'src' in img_tag.attrs:
            img = img_tag.attrs['src']

        try:
            # Extract the title
            title_tag = product.find('span', attrs={"class": "a-text-normal"})
            if title_tag:
                title = title_tag.text
                
                # Get only the first 15 words
                title_words = title.split()[:15]  # Split by spaces
                title = ' '.join(title_words)  # Join them
                
                # Extract the product URL from the parent <a> tag
                product_url_tag = title_tag.find_parent('a')
                if product_url_tag and 'href' in product_url_tag.attrs:
                    product_url = "https://www.amazon.com" + product_url_tag.attrs['href']
        except Exception as e:
            print("This was an advertisement or title not found", e)

        try:
            # Extract both the whole and fractional parts of the price
            price_whole = product.find('span', attrs={"class": "a-price-whole"}).text
            price_fraction = product.find('span', attrs={"class": "a-price-fraction"}).text
            price = price_whole + price_fraction  # Combine the whole and fractional part
        except Exception as e:
            print("This was an advertisement or price not found", e)

        if title:  # Only append if the title is found
            d = {
                "img": img,
                "title": title,
                "price": f"${price}" if price else None,
                "url": product_url
            }
            connection = connect_to_db()
            insert_product(connection, d)
            
            # Save price to CSV for price tracking
            if price and product_url:
                save_price_to_csv(datetime.now(), product_url, price)
            
            result.append(d)
    
    # Extract brand names
    brands_section = soup.find('div', {'id': 'brandsRefinements'})
    brands = []
    if brands_section:
        brand_tags = brands_section.find_all('span', class_='a-size-base a-color-base')
        for brand_tag in brand_tags:
            brands.append(brand_tag.text.strip())
    result.append(brands)
    
    connection.close() 

    driver.quit()
  
    return result

def save_price_to_csv(date, url, price):
    with open('prices.csv', mode='a') as file:
        writer = csv.writer(file)
        writer.writerow([date, url, price])
