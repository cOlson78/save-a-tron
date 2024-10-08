# This is a document for researching various APIs we can use for finding price trends

# CollectAPI follow price (doesnt work that well)
# import http.client

# conn = http.client.HTTPSConnection("api.collectapi.com")

# headers = {
#     'content-type': "application/json",
#     'authorization': "apikey 4bAlTXSkNsmfyqDtGA2HFs:0bg7067y0RgmxCLATGaJG5"
#     }

# conn.request("GET", "/shopPrice/followPrice?url=https://www.amazon.com&query=iphonex", headers=headers)

# res = conn.getresponse()
# data = res.read()

# print(data.decode("utf-8"))

# CollectAPI shopping API (also doesnt work that well)
# import http.client

# conn = http.client.HTTPSConnection("api.collectapi.com")

# payload = "{\"producturl\" : \"https://www.amazon.com/Apple-iPhone-64GB-Space-Gray/dp/B07SC58QBW/ref=sr_1_1?crid=2YAQKO15GMWPY&dib=eyJ2IjoiMSJ9.mVYFOyaxUjPX2jsjtPdMPw2adto1OSd_K42BbolcCTVcrmc4BvJV2zFpQgjgFVJMLuyyxcuZFojKufmKYQM2CD1H6f8lqamDTyFr5ufyvIkdGiPLrkM-aGqB6juTLwRjKj6VNlYrmViycJvlY72CLuGCWAaMYaMlQYt6moG15PuwMsdgC1BjfKmXKeW_AJ6DNSKar3S75JD0G0teMDObcxCbO-4LIUQ90XHy4MPu2lQ.eDRumfwTgmEuCuhiLCxaoseiEQaOyYLhlWsQlaYFJ34&dib_tag=se&keywords=iphone%2Bx&qid=1728176202&sprefix=iphonex%2Caps%2C159&sr=8-1&th=1\"}"

# headers = {
#     'content-type': "application/json",
#     'authorization': "apikey 4bAlTXSkNsmfyqDtGA2HFs:0bg7067y0RgmxCLATGaJG5"
# }

# conn.request("POST", "/shoppingai/suggestion", payload, headers)

# res = conn.getresponse()
# data = res.read()

# print(data.decode("utf-8"))


# Cheapshark API (Used for digital games, but is similar to what we want)
# import http.client

# conn = http.client.HTTPSConnection("www.cheapshark.com")
# payload = ''
# headers = {}
# conn.request("GET", "/api/1.0/games?id=612", payload, headers)
# res = conn.getresponse()
# data = res.read()
# print(data.decode("utf-8"))
# print(data.decode("utf-8").price)

import requests

# Define the API endpoint
url = "https://api.sandbox.ebay.com/buy/deal/v1/deal_item?category_ids=9355"

headers = {
    'authorization': "v^1.1#i^1#f^0#p^1#r^0#I^3#t^H4sIAAAAAAAAAOVYa2wURRzv9dpCRRCL0UZALlsUS9292b33yl28tkCLlLbcWaDh4T7m2uXudo+d2bZHVEpJTBA/FJUQEGMTAzExgSIJEo0mGkNAJBpFMJog6QcRMWrQopL6mN07yrUSKPQSm3gf9jIz/+dv/o+ZAd0lpfOfrXv2t6m2SYV93aC70GZjp4DSkuKqafbC+4sLQA6Bra97bndRj/27BUhIJlL8cohSmoqgoyuZUBFvTQYpQ1d5TUAK4lUhCRGPJT4SbljKcwzgU7qGNUlLUI762iAlugN+Nyt6ZY/gEgLQT2bVqzKjWpDy+n0uVoYy+XKyKHFkHSED1qsICyoOUhzg3DQLaOCPAg8POJ5jGQ/nb6UcLVBHiqYSEgZQIctc3uLVc2y9sakCQlDHRAgVqg8vijSG62sXLosucObICmVxiGABG2jkqEaToaNFSBjwxmqQRc1HDEmCCFHOUEbDSKF8+Koxt2G+BbXb5/MGZCnmBzEXlNy+vEC5SNOTAr6xHeaMItMxi5SHKlZw+maIEjTE9VDC2dEyIqK+1mH+NRtCQokpUA9SC6vDq8JNTVSoRkskFLUxQTfpigSjOqQj1StpyR2IxWTo42hvTHK7JEHKKspIy8I8SlONpsqKCRpyLNNwNSRWw5HYuHlPDjaEqFFt1MMxbFqUS+cbxpBrNTc1s4sGblfNfYVJAoTDGt58B4a5MdYV0cBwWMLoBQuiICWkUopMjV60YjEbPl0oSLVjnOKdzs7OTqbTxWh6m5MDgHWubFgakdphUqAIrZnrGXrl5gy0YrkiQcKJFB6nU8SWLhKrxAC1jQq5OX/A783iPtKs0OjZf03k+OwcmRH5yhCvDEg5IoXIBwJubyAvGRLKBqnTtAOKQppOCnoc4lRCkCAtkTgzklBXZN7liXEufwzSsjcQo83QpUWP7KXZGIQAQlGUAv7/U6KMNdQjUNIhzkus5y3OFaV1lZsLx+uWioanurnB5VuB423K420d8YZa1ufRlkSM8HLo0UE4ONZsuK7zNQmFIBMl+vMBgJnr+QOhTkMYyuNyLyJpKdikJRQpPbE22KXLTYKO09VGmowj0MyqtnG5Gk6l6vNTsfPm5C0Wi9vzO3+d6j/qUtf1CpmBO7G8MvkRESCkFIb0ITPX04ykJZ2aQA4h5vQ6y2rHKMLrEjlFI820GRBhYolMzoFjZlJIMWdIS5PHzpJpmMSJsbOQS4ZsSPi2FFmdmSFoKm3tGN2Szq7xgCIaifjYWWQoJMYVogq5akyoACWeZlxW5MwdgbH8ZlCHxOgQaYZOrkdMo3lkjmpxqJIDCNZJiYJ6Czvu0ptMGlgQE3Ci1eA81CKF5Lrt9wl2QmJ9nN/ldfnc49s6yTr/rJtoHSTfnfMWbkLOke8yoQLrx/bYPgI9tqOFNhuoBTRbBSpL7E8U2e+kEKk9DBJUWdS6GEWIMaTsqQI2dMjEYTolKHrhjIITGwoe6b6jztn/3Oqequj6dMHknOehvjWgfPiBqNTOTsl5LQKzrq0Us3fdN5VzswD4gQdwHNsKKq6tFrH3Ft3zo6di0he9cP77u+bsunSk7OKxXTNXg6nDRDZbcQGJ5YKtpwY//mrn09//0vt2sO/r3efefHDg9E53dcXG1i1OwX7+YdvWC39GF6r8W+kDfz06tCP02fHBSWVD8uxjC9TAt2vnlf4xpybZH7jo73fs+bT2pcn7tt3N7e11VZ7q7Pv7jL+phfp877RPip6cO6N3aM/myDzQvunc9IM77PtntPgG5Cu+hsMVLx46ULX83b7KiwPzmSPvDO1oeLXStb2D5w7ZTz91cN6WBwZPvFEFtj+krCnfuG9lS+zsa79yu9nm403i6yepLR+U7+ma9fwP209eGph5+b1Nz5Q81nx5CX80snnD/rIPp3cs7hl8+ZXJK7Z9ue3s+cMVp2c3/nRqbeqF/mNnKq58U1T2c/mFA4sze/oPBYCiC7gTAAA="
}
# Make the GET request
response = requests.get(url, headers=headers)


data = response.json()
print(data)

#Relevant articles (might go back to later)
#https://oxylabs.io/products/scraper-api/ecommerce/amazon - Amazon web scraper