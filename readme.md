### Setup

```
npm i
npm start
```

### Usage

```
request /stock/:symbol
ex: /stock/gme
```

First time you request it, it waits for the price to come through, after that it will return immediately and update in the background.

You can optionally request the data on an interval (i have it commented out) in case you want to auto update in the background without making an api request
