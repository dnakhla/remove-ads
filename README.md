remove-ads
==========

Remove HTML &lt;a> and &lt;img> tags identified with a catalog of advertising networks. Great for server side HTML parsing.

How to use:
```
$ npm install remove-ads
```

```javascript
var removeAds = require("remove-ads");

console.log(removeAds("<a href='http://buysellads.com/123'></a> <p>hello</p>")); // <p>hello</p> 
```

By default, the `./ad-networks.json` list is used. This is an array of domains grabbed manually from http://pgl.yoyo.org/as/serverlist.php?showintro=0;hostformat=hosts

Eventually you might want to use your own list of network servers.

You can also pass your own array of network servers like this.
```javascript
var removeAds = require("remove-ads");
var badAdNetworks = ["annoying.com", "ads.adsense.com"]; // etc. etc.

var cleanHTML = removeAds("<p>some HTML string</p> <img src='https://ads.annoying.com/828820", badAdNetworks);
```
