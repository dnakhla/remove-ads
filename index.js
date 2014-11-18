"use strict";

var check = require("check-types"),
    cheerio = require("cheerio");

// func: newHTML(unemptyString HTML) => object cheerio
var HTML = function HTML(HTML) {
  check.verify.unemptyString(HTML, "'HTML' param must be unemptyString");

  return cheerio.load(HTML);
};

// func: indexOfAny(defined value, array list) => boolean result
var indexOfAny = function indexOfAny(value, list) {
  check.verify.defined(value, "'value' param must be defined");
  check.verify.array(list, "'list' param must be array");

  return list.some(function(item) {
    return (value.indexOf(item) !== -1);
  });
};

// func: removeElementsWith(object $, unemptyString selector, unemptyString attr, object matchList) => undefined nothing
var removeElementsWith = function removeElementsWith($, selector, attr, matchList) {
  check.verify.fn($, "'$' param must be fn");
  check.verify.unemptyString(selector, "'selector' param must be unemptyString");
  check.verify.unemptyString(attr, "'attr' param must be unemptyString");
  check.verify.array(matchList, "'matchList' param must be array");

  $(selector).each(function removeMatchingElement() {
    var attrVal = $(this).attr(attr);

    if(attrVal) {
      if(indexOfAny(attrVal, matchList)) {
        $(this).remove();
      }
    }
  });
};

// func: removeAds(unemptyString content, array adNetworkList) => unemptyString content
var removeAds = function removeAds(content, adNetworkList) {
  check.verify.unemptyString(content, "'content' param must be unemptyString");

  if(check.defined(adNetworkList)) {
    check.verify.array(adNetworkList, "'adNetworkList' param must be array");
  } else {
    // Default ad-networks list
    var adNetworkList = require("./ad-networks.json");
  }

  var $ = HTML(content);

  // Remove all <a href=""></a> linking to any networks in adNetworkList
  removeElementsWith($, "a", "href", adNetworkList);

  // Same for <img> tags
  removeElementsWith($, "img", "src", adNetworkList);

  // Return trimmed HTML string
  return $.html().trim();
};

module.exports = removeAds;