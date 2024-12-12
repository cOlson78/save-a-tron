import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_csv('prices.csv')
data['Date'] = pd.to_datetime(data['Date'])
plt.plot(data['Date'], data['Price'])
plt.xlabel('Date')
plt.ylabel('Price')
plt.title('Price History')
plt.show()
