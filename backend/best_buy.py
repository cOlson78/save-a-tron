from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from db import connect_to_db, insert_product, cache_search,cache_query
import re

def scraper_bestbuy(query, dept):

    connection = connect_to_db()
    if (cache_query(connection, query)):
        result = cache_search(connection, query)
    
        return result


    url = f"https://www.bestbuy.com/site/searchpage.jsp?st={query}&id=pcat17071"

    # Set up Chrome options with headless mode
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--headless")  # Run in headless mode
    
    # Add user-agent to mimic a regular browser
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    )

    # Initialize WebDriver using ChromeDriverManager
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    # Load the Best Buy search results page
    driver.get(url)

    result = []
    try:
        # Wait until products are loaded on the page
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'sku-item'))
        )
        
        # Retrieve all product elements
        products = driver.find_elements(By.CLASS_NAME, 'sku-item')

        for product in products:
            img = None
            title = None
            price = None
            product_url = None

            # Extract the image URL
            try:
                img_tag = product.find_element(By.CLASS_NAME, 'product-image')
                img = img_tag.get_attribute('src') or img_tag.get_attribute('data-src')
            except:
                pass

            # Extract the title and product URL
            try:
                title_tag = product.find_element(By.TAG_NAME, 'h4')
                title = title_tag.text.strip()
                
                # Get URL from nested <a> tag within <h4>
                product_url_tag = title_tag.find_element(By.TAG_NAME, 'a')
                product_url = product_url_tag.get_attribute('href')
            except:
                pass

            # Extract the primary price only (first dollar amount found)
            try:
                price_tag = product.find_element(By.CLASS_NAME, 'priceView-hero-price')
                price_text = price_tag.text.strip()
                
                # Use regex to find the first dollar amount in the price text
                price_match = re.search(r'\$\d+(\.\d{2})?', price_text)
                if price_match:
                    price = price_match.group(0)  # Capture the first dollar amount only
            except:
                pass

            # Append product data to the result if title is found
            if title:
                d = {
                    "img": img,
                    "title": title,
                    "price": price if price else None,
                    "url": product_url
                }
                
                result.append(d)

        # Optional: Extract brands (if relevant)
        brands = []
        try:
            brands_section = driver.find_element(By.CLASS_NAME, 'facet-option')
            brand_tags = brands_section.find_elements(By.CLASS_NAME, 'facet-option-label-text')
            for brand_tag in brand_tags:
                brands.append(brand_tag.text.strip())
        except:
            pass
        result.append(brands)

    except Exception as e:
        pass
    finally:
        driver.quit()

    connection.close()  # Close the database connection

    print(result)
    return result