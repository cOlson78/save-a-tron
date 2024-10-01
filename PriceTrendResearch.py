# This is a document for researching various APIs we can use for finding price trends

# CollectAPI follow price (doesnt work that well)
# import http.client

# conn = http.client.HTTPSConnection("api.collectapi.com")

# headers = {
#     'content-type': "application/json",
#     'authorization': "apikey 4bAlTXSkNsmfyqDtGA2HFs:0bg7067y0RgmxCLATGaJG5"
#     }

# conn.request("GET", "/shopPrice/followPrice?url=https://www.amazon.com/s?k=iphone+x&query=iphonex", headers=headers)

# res = conn.getresponse()
# data = res.read()

# print(data.decode("utf-8"))

# CollectAPI shopping API (also doesnt work that well)
# import http.client

# conn = http.client.HTTPSConnection("api.collectapi.com")

# payload = "{\"producturl\" : \"../iphonex\"}"

# headers = {
#     'content-type': "application/json",
#     'authorization': "apikey 4bAlTXSkNsmfyqDtGA2HFs:0bg7067y0RgmxCLATGaJG5"
#     }

# conn.request("POST", "/shoppingai/suggestion", payload, headers)

# res = conn.getresponse()
# data = res.read()

# print(data.decode("utf-8"))


# Cheapshark API (Used for digital games, but is similar to what we want)
import http.client

conn = http.client.HTTPSConnection("www.cheapshark.com")
payload = ''
headers = {}
conn.request("GET", "/api/1.0/games?id=612", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
print(data.decode("utf-8").price)
