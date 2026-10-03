import re

with open('src/data/mockData.js', 'r') as f:
    content = f.read()

# I will just change the UI to use $ instead of Q, and adjust prices roughly to USD MSRP.
# Ryzen 5 5500: ~99
# Core i5 12400F: ~140
# RTX 4060: ~299
# RX 7600: ~269
# ... dividing all current Quetzal prices by roughly 8 or 9 gives a very accurate US MSRP!
# Let's just divide every price by 8 and round it to nearest 9 (e.g. 299).

lines = content.split('\n')
for i, line in enumerate(lines):
    m = re.search(r'price:\s*(\d+)', line)
    if m:
        q_price = int(m.group(1))
        # Special logic to get a nice USD price
        usd = int(q_price / 8.5)
        # round to nearest 9 (e.g. 299, 149)
        if usd > 10:
            usd = (usd // 10) * 10 + 9
        lines[i] = re.sub(r'price:\s*\d+', f'price: {usd}', line)

with open('src/data/mockData.js', 'w') as f:
    f.write('\n'.join(lines))
print("Prices updated to USD MSRP!")
