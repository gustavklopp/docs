!function(){if("ontouchstart"in window){var t,e,n,i,o,s,r={};t=function(t,e){return Math.abs(t[0]-e[0])>5||Math.abs(t[1]-e[1])>5},e=function(t){this.startXY=[t.touches[0].clientX,t.touches[0].clientY],this.threshold=!1},n=function(e){return this.threshold?!1:void(this.threshold=t(this.startXY,[e.touches[0].clientX,e.touches[0].clientY]))},i=function(e){if(!this.threshold&&!t(this.startXY,[e.changedTouches[0].clientX,e.changedTouches[0].clientY])){var n=e.changedTouches[0],i=document.createEvent("MouseEvents");i.initMouseEvent("click",!0,!0,window,0,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.simulated=!0,e.target.dispatchEvent(i)}},o=function(t){var e=Date.now(),n=e-r.time,i=t.clientX,o=t.clientY,a=[Math.abs(r.x-i),Math.abs(r.y-o)],l=s(t.target,"A")||t.target,c=l.nodeName,h="A"===c,u=window.navigator.standalone&&h&&t.target.getAttribute("href");return r.time=e,r.x=i,r.y=o,(!t.simulated&&(500>n||1500>n&&a[0]<50&&a[1]<50)||u)&&(t.preventDefault(),t.stopPropagation(),!u)?!1:(u&&(window.location=l.getAttribute("href")),void(l&&l.classList&&(l.classList.add("energize-focus"),window.setTimeout(function(){l.classList.remove("energize-focus")},150))))},s=function(t,e){for(var n=t;n!==document.body;){if(!n||n.nodeName===e)return n;n=n.parentNode}return null},document.addEventListener("touchstart",e,!1),document.addEventListener("touchmove",n,!1),document.addEventListener("touchend",i,!1),document.addEventListener("click",o,!0)}}(),/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
function(t){"use strict";function e(e){if(e&&""!==e){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+e+"']").addClass("active");for(var n=0;n<l.length;n++)$(".highlight."+l[n]).hide();$(".highlight."+e).show(),t.toc.calculateHeights(),$(window.location.hash).get(0)&&$(window.location.hash).get(0).scrollIntoView(!0)}}function n(t){return"string"!=typeof t?{}:(t=t.trim().replace(/^(\?|#|&)/,""),t?t.split("&").reduce(function(t,e){var n=e.replace(/\+/g," ").split("="),i=n[0],o=n[1];return i=decodeURIComponent(i),o=void 0===o?null:decodeURIComponent(o),t.hasOwnProperty(i)?Array.isArray(t[i])?t[i].push(o):t[i]=[t[i],o]:t[i]=o,t},{}):{})}function i(t){return t?Object.keys(t).sort().map(function(e){var n=t[e];return Array.isArray(n)?n.sort().map(function(t){return encodeURIComponent(e)+"="+encodeURIComponent(t)}).join("&"):encodeURIComponent(e)+"="+encodeURIComponent(n)}).join("&"):""}function o(){if(location.search.length>=1){var t=n(location.search).language;if(t)return t;if(-1!=jQuery.inArray(location.search.substr(1),l))return location.search.substr(1)}return!1}function s(t){var e=n(location.search);return e.language?(e.language=t,i(e)):t}function r(t){if(history){var e=window.location.hash;e&&(e=e.replace(/^#+/,"")),history.pushState({},"","?"+s(t)+"#"+e),localStorage.setItem("language",t)}}function a(t){var n=localStorage.getItem("language");l=t;var i=o();i?(e(i),localStorage.setItem("language",i)):e(null!==n&&-1!=jQuery.inArray(n,l)?n:l[0])}var l=[];t.setupLanguages=a,t.activateLanguage=e,$(function(){$(".lang-selector a").on("click",function(){var t=$(this).data("language-name");return r(t),e(t),!1}),window.onpopstate=function(){e(o())}})}(window),/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.5.7
 * Copyright (C) 2014 Oliver Nightingale
 * MIT Licensed
 * @license
 */
function(){var t=function(e){var n=new t.Index;return n.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),e&&e.call(n,n),n};t.version="0.5.7",/*!
   * lunr.utils
   * Copyright (C) 2014 Oliver Nightingale
   */
t.utils={},t.utils.warn=function(t){return function(e){t.console&&console.warn&&console.warn(e)}}(this),/*!
   * lunr.EventEmitter
   * Copyright (C) 2014 Oliver Nightingale
   */
t.EventEmitter=function(){this.events={}},t.EventEmitter.prototype.addListener=function(){var t=Array.prototype.slice.call(arguments),e=t.pop(),n=t;if("function"!=typeof e)throw new TypeError("last argument must be a function");n.forEach(function(t){this.hasHandler(t)||(this.events[t]=[]),this.events[t].push(e)},this)},t.EventEmitter.prototype.removeListener=function(t,e){if(this.hasHandler(t)){var n=this.events[t].indexOf(e);this.events[t].splice(n,1),this.events[t].length||delete this.events[t]}},t.EventEmitter.prototype.emit=function(t){if(this.hasHandler(t)){var e=Array.prototype.slice.call(arguments,1);this.events[t].forEach(function(t){t.apply(void 0,e)})}},t.EventEmitter.prototype.hasHandler=function(t){return t in this.events},/*!
   * lunr.tokenizer
   * Copyright (C) 2014 Oliver Nightingale
   */
t.tokenizer=function(t){if(!arguments.length||null==t||void 0==t)return[];if(Array.isArray(t))return t.map(function(t){return t.toLowerCase()});for(var e=t.toString().replace(/^\s+/,""),n=e.length-1;n>=0;n--)if(/\S/.test(e.charAt(n))){e=e.substring(0,n+1);break}return e.split(/(?:\s+|\-)/).filter(function(t){return!!t}).map(function(t){return t.toLowerCase()})},/*!
   * lunr.Pipeline
   * Copyright (C) 2014 Oliver Nightingale
   */
t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions={},t.Pipeline.registerFunction=function(e,n){n in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+n),e.label=n,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){var n=e.label&&e.label in this.registeredFunctions;n||t.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},t.Pipeline.load=function(e){var n=new t.Pipeline;return e.forEach(function(e){var i=t.Pipeline.registeredFunctions[e];if(!i)throw new Error("Cannot load un-registered function: "+e);n.add(i)}),n},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(e){t.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)},this)},t.Pipeline.prototype.after=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e)+1;this._stack.splice(i,0,n)},t.Pipeline.prototype.before=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e);this._stack.splice(i,0,n)},t.Pipeline.prototype.remove=function(t){var e=this._stack.indexOf(t);this._stack.splice(e,1)},t.Pipeline.prototype.run=function(t){for(var e=[],n=t.length,i=this._stack.length,o=0;n>o;o++){for(var s=t[o],r=0;i>r&&(s=this._stack[r](s,o,t),void 0!==s);r++);void 0!==s&&e.push(s)}return e},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})},/*!
   * lunr.Vector
   * Copyright (C) 2014 Oliver Nightingale
   */
t.Vector=function(){this._magnitude=null,this.list=void 0,this.length=0},t.Vector.Node=function(t,e,n){this.idx=t,this.val=e,this.next=n},t.Vector.prototype.insert=function(e,n){var i=this.list;if(!i)return this.list=new t.Vector.Node(e,n,i),this.length++;for(var o=i,s=i.next;void 0!=s;){if(e<s.idx)return o.next=new t.Vector.Node(e,n,s),this.length++;o=s,s=s.next}return o.next=new t.Vector.Node(e,n,s),this.length++},t.Vector.prototype.magnitude=function(){if(this._magniture)return this._magnitude;for(var t,e=this.list,n=0;e;)t=e.val,n+=t*t,e=e.next;return this._magnitude=Math.sqrt(n)},t.Vector.prototype.dot=function(t){for(var e=this.list,n=t.list,i=0;e&&n;)e.idx<n.idx?e=e.next:e.idx>n.idx?n=n.next:(i+=e.val*n.val,e=e.next,n=n.next);return i},t.Vector.prototype.similarity=function(t){return this.dot(t)/(this.magnitude()*t.magnitude())},/*!
   * lunr.SortedSet
   * Copyright (C) 2014 Oliver Nightingale
   */
t.SortedSet=function(){this.length=0,this.elements=[]},t.SortedSet.load=function(t){var e=new this;return e.elements=t,e.length=t.length,e},t.SortedSet.prototype.add=function(){Array.prototype.slice.call(arguments).forEach(function(t){~this.indexOf(t)||this.elements.splice(this.locationFor(t),0,t)},this),this.length=this.elements.length},t.SortedSet.prototype.toArray=function(){return this.elements.slice()},t.SortedSet.prototype.map=function(t,e){return this.elements.map(t,e)},t.SortedSet.prototype.forEach=function(t,e){return this.elements.forEach(t,e)},t.SortedSet.prototype.indexOf=function(t,e,n){var e=e||0,n=n||this.elements.length,i=n-e,o=e+Math.floor(i/2),s=this.elements[o];return 1>=i?s===t?o:-1:t>s?this.indexOf(t,o,n):s>t?this.indexOf(t,e,o):s===t?o:void 0},t.SortedSet.prototype.locationFor=function(t,e,n){var e=e||0,n=n||this.elements.length,i=n-e,o=e+Math.floor(i/2),s=this.elements[o];if(1>=i){if(s>t)return o;if(t>s)return o+1}return t>s?this.locationFor(t,o,n):s>t?this.locationFor(t,e,o):void 0},t.SortedSet.prototype.intersect=function(e){for(var n=new t.SortedSet,i=0,o=0,s=this.length,r=e.length,a=this.elements,l=e.elements;;){if(i>s-1||o>r-1)break;a[i]!==l[o]?a[i]<l[o]?i++:a[i]>l[o]&&o++:(n.add(a[i]),i++,o++)}return n},t.SortedSet.prototype.clone=function(){var e=new t.SortedSet;return e.elements=this.toArray(),e.length=e.elements.length,e},t.SortedSet.prototype.union=function(t){var e,n,i;return this.length>=t.length?(e=this,n=t):(e=t,n=this),i=e.clone(),i.add.apply(i,n.toArray()),i},t.SortedSet.prototype.toJSON=function(){return this.toArray()},/*!
   * lunr.Index
   * Copyright (C) 2014 Oliver Nightingale
   */
t.Index=function(){this._fields=[],this._ref="id",this.pipeline=new t.Pipeline,this.documentStore=new t.Store,this.tokenStore=new t.TokenStore,this.corpusTokens=new t.SortedSet,this.eventEmitter=new t.EventEmitter,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},t.Index.prototype.on=function(){var t=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,t)},t.Index.prototype.off=function(t,e){return this.eventEmitter.removeListener(t,e)},t.Index.load=function(e){e.version!==t.version&&t.utils.warn("version mismatch: current "+t.version+" importing "+e.version);var n=new this;return n._fields=e.fields,n._ref=e.ref,n.documentStore=t.Store.load(e.documentStore),n.tokenStore=t.TokenStore.load(e.tokenStore),n.corpusTokens=t.SortedSet.load(e.corpusTokens),n.pipeline=t.Pipeline.load(e.pipeline),n},t.Index.prototype.field=function(t,e){var e=e||{},n={name:t,boost:e.boost||1};return this._fields.push(n),this},t.Index.prototype.ref=function(t){return this._ref=t,this},t.Index.prototype.add=function(e,n){var i={},o=new t.SortedSet,s=e[this._ref],n=void 0===n?!0:n;this._fields.forEach(function(n){var s=this.pipeline.run(t.tokenizer(e[n.name]));i[n.name]=s,t.SortedSet.prototype.add.apply(o,s)},this),this.documentStore.set(s,o),t.SortedSet.prototype.add.apply(this.corpusTokens,o.toArray());for(var r=0;r<o.length;r++){var a=o.elements[r],l=this._fields.reduce(function(t,e){var n=i[e.name].length;if(!n)return t;var o=i[e.name].filter(function(t){return t===a}).length;return t+o/n*e.boost},0);this.tokenStore.add(a,{ref:s,tf:l})}n&&this.eventEmitter.emit("add",e,this)},t.Index.prototype.remove=function(t,e){var n=t[this._ref],e=void 0===e?!0:e;if(this.documentStore.has(n)){var i=this.documentStore.get(n);this.documentStore.remove(n),i.forEach(function(t){this.tokenStore.remove(t,n)},this),e&&this.eventEmitter.emit("remove",t,this)}},t.Index.prototype.update=function(t,e){var e=void 0===e?!0:e;this.remove(t,!1),this.add(t,!1),e&&this.eventEmitter.emit("update",t,this)},t.Index.prototype.idf=function(t){var e="@"+t;if(Object.prototype.hasOwnProperty.call(this._idfCache,e))return this._idfCache[e];var n=this.tokenStore.count(t),i=1;return n>0&&(i=1+Math.log(this.tokenStore.length/n)),this._idfCache[e]=i},t.Index.prototype.search=function(e){var n=this.pipeline.run(t.tokenizer(e)),i=new t.Vector,o=[],s=this._fields.reduce(function(t,e){return t+e.boost},0),r=n.some(function(t){return this.tokenStore.has(t)},this);if(!r)return[];n.forEach(function(e,n,r){var a=1/r.length*this._fields.length*s,l=this,c=this.tokenStore.expand(e).reduce(function(n,o){var s=l.corpusTokens.indexOf(o),r=l.idf(o),c=1,h=new t.SortedSet;if(o!==e){var u=Math.max(3,o.length-e.length);c=1/Math.log(u)}return s>-1&&i.insert(s,a*r*c),Object.keys(l.tokenStore.get(o)).forEach(function(t){h.add(t)}),n.union(h)},new t.SortedSet);o.push(c)},this);var a=o.reduce(function(t,e){return t.intersect(e)});return a.map(function(t){return{ref:t,score:i.similarity(this.documentVector(t))}},this).sort(function(t,e){return e.score-t.score})},t.Index.prototype.documentVector=function(e){for(var n=this.documentStore.get(e),i=n.length,o=new t.Vector,s=0;i>s;s++){var r=n.elements[s],a=this.tokenStore.get(r)[e].tf,l=this.idf(r);o.insert(this.corpusTokens.indexOf(r),a*l)}return o},t.Index.prototype.toJSON=function(){return{version:t.version,fields:this._fields,ref:this._ref,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},t.Index.prototype.use=function(t){var e=Array.prototype.slice.call(arguments,1);e.unshift(this),t.apply(this,e)},/*!
   * lunr.Store
   * Copyright (C) 2014 Oliver Nightingale
   */
t.Store=function(){this.store={},this.length=0},t.Store.load=function(e){var n=new this;return n.length=e.length,n.store=Object.keys(e.store).reduce(function(n,i){return n[i]=t.SortedSet.load(e.store[i]),n},{}),n},t.Store.prototype.set=function(t,e){this.has(t)||this.length++,this.store[t]=e},t.Store.prototype.get=function(t){return this.store[t]},t.Store.prototype.has=function(t){return t in this.store},t.Store.prototype.remove=function(t){this.has(t)&&(delete this.store[t],this.length--)},t.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},/*!
   * lunr.stemmer
   * Copyright (C) 2014 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */
t.stemmer=function(){var t={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},e={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[^aeiou]",i="[aeiouy]",o=n+"[^aeiouy]*",s=i+"[aeiou]*",r="^("+o+")?"+s+o,a="^("+o+")?"+s+o+"("+s+")?$",l="^("+o+")?"+s+o+s+o,c="^("+o+")?"+i,h=new RegExp(r),u=new RegExp(l),d=new RegExp(a),f=new RegExp(c),p=/^(.+?)(ss|i)es$/,g=/^(.+?)([^s])s$/,m=/^(.+?)eed$/,v=/^(.+?)(ed|ing)$/,y=/.$/,w=/(at|bl|iz)$/,b=new RegExp("([^aeiouylsz])\\1$"),S=new RegExp("^"+o+i+"[^aeiouwxy]$"),x=/^(.+?[^aeiou])y$/,_=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,C=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,E=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,k=/^(.+?)(s|t)(ion)$/,O=/^(.+?)e$/,N=/ll$/,$=new RegExp("^"+o+i+"[^aeiouwxy]$"),T=function(n){var i,o,s,r,a,l,c;if(n.length<3)return n;if(s=n.substr(0,1),"y"==s&&(n=s.toUpperCase()+n.substr(1)),r=p,a=g,r.test(n)?n=n.replace(r,"$1$2"):a.test(n)&&(n=n.replace(a,"$1$2")),r=m,a=v,r.test(n)){var T=r.exec(n);r=h,r.test(T[1])&&(r=y,n=n.replace(r,""))}else if(a.test(n)){var T=a.exec(n);i=T[1],a=f,a.test(i)&&(n=i,a=w,l=b,c=S,a.test(n)?n+="e":l.test(n)?(r=y,n=n.replace(r,"")):c.test(n)&&(n+="e"))}if(r=x,r.test(n)){var T=r.exec(n);i=T[1],n=i+"i"}if(r=_,r.test(n)){var T=r.exec(n);i=T[1],o=T[2],r=h,r.test(i)&&(n=i+t[o])}if(r=C,r.test(n)){var T=r.exec(n);i=T[1],o=T[2],r=h,r.test(i)&&(n=i+e[o])}if(r=E,a=k,r.test(n)){var T=r.exec(n);i=T[1],r=u,r.test(i)&&(n=i)}else if(a.test(n)){var T=a.exec(n);i=T[1]+T[2],a=u,a.test(i)&&(n=i)}if(r=O,r.test(n)){var T=r.exec(n);i=T[1],r=u,a=d,l=$,(r.test(i)||a.test(i)&&!l.test(i))&&(n=i)}return r=N,a=u,r.test(n)&&a.test(n)&&(r=y,n=n.replace(r,"")),"y"==s&&(n=s.toLowerCase()+n.substr(1)),n};return T}(),t.Pipeline.registerFunction(t.stemmer,"stemmer"),/*!
   * lunr.stopWordFilter
   * Copyright (C) 2014 Oliver Nightingale
   */
t.stopWordFilter=function(e){return-1===t.stopWordFilter.stopWords.indexOf(e)?e:void 0},t.stopWordFilter.stopWords=new t.SortedSet,t.stopWordFilter.stopWords.length=119,t.stopWordFilter.stopWords.elements=["","a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"],t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter"),/*!
   * lunr.trimmer
   * Copyright (C) 2014 Oliver Nightingale
   */
t.trimmer=function(t){return t.replace(/^\W+/,"").replace(/\W+$/,"")},t.Pipeline.registerFunction(t.trimmer,"trimmer"),/*!
   * lunr.stemmer
   * Copyright (C) 2014 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */
t.TokenStore=function(){this.root={docs:{}},this.length=0},t.TokenStore.load=function(t){var e=new this;return e.root=t.root,e.length=t.length,e},t.TokenStore.prototype.add=function(t,e,n){var n=n||this.root,i=t[0],o=t.slice(1);return i in n||(n[i]={docs:{}}),0===o.length?(n[i].docs[e.ref]=e,void(this.length+=1)):this.add(o,e,n[i])},t.TokenStore.prototype.has=function(t){if(!t)return!1;for(var e=this.root,n=0;n<t.length;n++){if(!e[t[n]])return!1;e=e[t[n]]}return!0},t.TokenStore.prototype.getNode=function(t){if(!t)return{};for(var e=this.root,n=0;n<t.length;n++){if(!e[t[n]])return{};e=e[t[n]]}return e},t.TokenStore.prototype.get=function(t,e){return this.getNode(t,e).docs||{}},t.TokenStore.prototype.count=function(t,e){return Object.keys(this.get(t,e)).length},t.TokenStore.prototype.remove=function(t,e){if(t){for(var n=this.root,i=0;i<t.length;i++){if(!(t[i]in n))return;n=n[t[i]]}delete n.docs[e]}},t.TokenStore.prototype.expand=function(t,e){var n=this.getNode(t),i=n.docs||{},e=e||[];return Object.keys(i).length&&e.push(t),Object.keys(n).forEach(function(n){"docs"!==n&&e.concat(this.expand(t+n,e))},this),e},t.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}},function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.lunr=e()}(this,function(){return t})}(),/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */
jQuery.extend({highlight:function(t,e,n,i){if(3===t.nodeType){var o=t.data.match(e);if(o){var s=document.createElement(n||"span");s.className=i||"highlight";var r=t.splitText(o.index);r.splitText(o[0].length);var a=r.cloneNode(!0);return s.appendChild(a),r.parentNode.replaceChild(s,r),1}}else if(1===t.nodeType&&t.childNodes&&!/(script|style)/i.test(t.tagName)&&(t.tagName!==n.toUpperCase()||t.className!==i))for(var l=0;l<t.childNodes.length;l++)l+=jQuery.highlight(t.childNodes[l],e,n,i);return 0}}),jQuery.fn.unhighlight=function(t){var e={className:"highlight",element:"span"};return jQuery.extend(e,t),this.find(e.element+"."+e.className).each(function(){var t=this.parentNode;t.replaceChild(this.firstChild,this),t.normalize()}).end()},jQuery.fn.highlight=function(t,e){var n={className:"highlight",element:"span",caseSensitive:!1,wordsOnly:!1};if(jQuery.extend(n,e),t.constructor===String&&(t=[t]),t=jQuery.grep(t,function(t){return""!=t}),t=jQuery.map(t,function(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}),0==t.length)return this;var i=n.caseSensitive?"":"i",o="("+t.join("|")+")";n.wordsOnly&&(o="\\b"+o+"\\b");var s=new RegExp(o,i);return this.each(function(){jQuery.highlight(this,s,n.element,n.className)})},function(){"use strict";function t(){$("h1, h2").each(function(){var t=$(this),e=t.nextUntil("h1, h2");l.add({id:t.prop("id"),title:t.text(),body:e.text()})})}function e(){s=$(".content"),r=$(".search-results"),$("#input-search").on("keyup",n)}function n(t){if(o(),r.addClass("visible"),27===t.keyCode&&(this.value=""),this.value){var e=l.search(this.value).filter(function(t){return t.score>1e-4});e.length?(r.empty(),$.each(e,function(t,e){var n=document.getElementById(e.ref);r.append("<li><a href='#"+e.ref+"'>"+$(n).text()+"</a></li>")}),i.call(this)):(r.html("<li></li>"),$(".search-results li").text('No Results Found for "'+this.value+'"'))}else o(),r.removeClass("visible")}function i(){this.value&&s.highlight(this.value,a)}function o(){s.unhighlight(a)}var s,r,a={element:"span",className:"search-highlight"},l=new lunr.Index;l.ref("id"),l.field("title",{boost:10}),l.field("body"),l.pipeline.add(lunr.trimmer,lunr.stopWordFilter),$(t),$(e)}(),/*! jQuery UI - v1.11.3 - 2015-02-12
 * http://jqueryui.com
 * Includes: widget.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){/*!
   * jQuery UI Widget 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/jQuery.widget/
   */
var e=0,n=Array.prototype.slice;t.cleanData=function(e){return function(n){var i,o,s;for(s=0;null!=(o=n[s]);s++)try{i=t._data(o,"events"),i&&i.remove&&t(o).triggerHandler("remove")}catch(r){}e(n)}}(t.cleanData),t.widget=function(e,n,i){var o,s,r,a,l={},c=e.split(".")[0];return e=e.split(".")[1],o=c+"-"+e,i||(i=n,n=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},s=t[c][e],r=t[c][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new r(t,e)},t.extend(r,s,{version:i.version,_proto:t.extend({},i),_childConstructors:[]}),a=new n,a.options=t.widget.extend({},a.options),t.each(i,function(e,i){return t.isFunction(i)?void(l[e]=function(){var t=function(){return n.prototype[e].apply(this,arguments)},o=function(t){return n.prototype[e].apply(this,t)};return function(){var e,n=this._super,s=this._superApply;return this._super=t,this._superApply=o,e=i.apply(this,arguments),this._super=n,this._superApply=s,e}}()):void(l[e]=i)}),r.prototype=t.widget.extend(a,{widgetEventPrefix:s?a.widgetEventPrefix||e:e},l,{constructor:r,namespace:c,widgetName:e,widgetFullName:o}),s?(t.each(s._childConstructors,function(e,n){var i=n.prototype;t.widget(i.namespace+"."+i.widgetName,r,n._proto)}),delete s._childConstructors):n._childConstructors.push(r),t.widget.bridge(e,r),r},t.widget.extend=function(e){for(var i,o,s=n.call(arguments,1),r=0,a=s.length;a>r;r++)for(i in s[r])o=s[r][i],s[r].hasOwnProperty(i)&&void 0!==o&&(e[i]=t.isPlainObject(o)?t.isPlainObject(e[i])?t.widget.extend({},e[i],o):t.widget.extend({},o):o);return e},t.widget.bridge=function(e,i){var o=i.prototype.widgetFullName||e;t.fn[e]=function(s){var r="string"==typeof s,a=n.call(arguments,1),l=this;return r?this.each(function(){var n,i=t.data(this,o);return"instance"===s?(l=i,!1):i?t.isFunction(i[s])&&"_"!==s.charAt(0)?(n=i[s].apply(i,a),n!==i&&void 0!==n?(l=n&&n.jquery?l.pushStack(n.get()):n,!1):void 0):t.error("no such method '"+s+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+s+"'")}):(a.length&&(s=t.widget.extend.apply(null,[s].concat(a))),this.each(function(){var e=t.data(this,o);e?(e.option(s||{}),e._init&&e._init()):t.data(this,o,new i(s,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(n,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),n),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,n){var i,o,s,r=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(r={},i=e.split("."),e=i.shift(),i.length){for(o=r[e]=t.widget.extend({},this.options[e]),s=0;s<i.length-1;s++)o[i[s]]=o[i[s]]||{},o=o[i[s]];if(e=i.pop(),1===arguments.length)return void 0===o[e]?null:o[e];o[e]=n}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];r[e]=n}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,n,i){var o,s=this;"boolean"!=typeof e&&(i=n,n=e,e=!1),i?(n=o=t(n),this.bindings=this.bindings.add(n)):(i=n,n=this.element,o=this.widget()),t.each(i,function(i,r){function a(){return e||s.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?s[r]:r).apply(s,arguments):void 0}"string"!=typeof r&&(a.guid=r.guid=r.guid||a.guid||t.guid++);var l=i.match(/^([\w:-]*)\s*(.*)$/),c=l[1]+s.eventNamespace,h=l[2];h?o.delegate(h,c,a):n.bind(c,a)})},_off:function(e,n){n=(n||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(n).undelegate(n),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function n(){return("string"==typeof t?i[t]:t).apply(i,arguments)}var i=this;return setTimeout(n,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,n,i){var o,s,r=this.options[e];if(i=i||{},n=t.Event(n),n.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),n.target=this.element[0],s=n.originalEvent)for(o in s)o in n||(n[o]=s[o]);return this.element.trigger(n,i),!(t.isFunction(r)&&r.apply(this.element[0],[n].concat(i))===!1||n.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,n){t.Widget.prototype["_"+e]=function(i,o,s){"string"==typeof o&&(o={effect:o});var r,a=o?o===!0||"number"==typeof o?n:o.effect||n:e;o=o||{},"number"==typeof o&&(o={duration:o}),r=!t.isEmptyObject(o),o.complete=s,o.delay&&i.delay(o.delay),r&&t.effects&&t.effects.effect[a]?i[e](o):a!==e&&i[a]?i[a](o.duration,o.easing,s):i.queue(function(n){t(this)[e](),s&&s.call(i[0]),n()})}});t.widget}),/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
function(t){"use strict";t(window.jQuery,window,document)}(function(t,e,n,i){"use strict";var o="tocify",s="tocify-focus",r="tocify-hover",a="tocify-hide",l="tocify-header",c="."+l,h="tocify-subheader",u="."+h,d="tocify-item",f="."+d,p="tocify-extend-page",g="."+p;t.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var n=this;n.tocifyWrapper=t(".tocify-wrapper"),n.extendPageScroll=!0,n.items=[],n._generateToc(),n.cachedHeights=[],n.cachedAnchors=[],n._addCSSClasses(),n.webkit=function(){for(var t in e)if(t&&-1!==t.toLowerCase().indexOf("webkit"))return!0;return!1}(),n._setEventHandlers(),t(e).load(function(){n._setActiveElement(!0),t("html, body").promise().done(function(){setTimeout(function(){n.extendPageScroll=!1},0)})})},_generateToc:function(){var e,n,i=this,s=i.options.ignoreSelector;return e=t(this.options.context).find(-1!==this.options.selectors.indexOf(",")?this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(",")):this.options.selectors.replace(/ /g,"")),e.length?(i.element.addClass(o),void e.each(function(e){t(this).is(s)||(n=t("<ul/>",{id:l+e,"class":l}).append(i._nestElements(t(this),e)),i.element.append(n),t(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===t(this).find(i.options.selectors).length?t(this).filter(i.options.selectors).each(function(){t(this).is(s)||i._appendSubheaders.call(this,i,n)}):t(this).find(i.options.selectors).each(function(){t(this).is(s)||i._appendSubheaders.call(this,i,n)})}))})):void i.element.addClass(a)},_setActiveElement:function(t){var n=this,i=e.location.hash.substring(1),o=n.element.find("li[data-unique='"+i+"']");return i.length?(n.element.find("."+n.focusClass).removeClass(n.focusClass),o.addClass(n.focusClass),n.options.showAndHide&&o.click()):(n.element.find("."+n.focusClass).removeClass(n.focusClass),!i.length&&t&&n.options.highlightDefault&&n.element.find(f).first().addClass(n.focusClass)),n},_nestElements:function(e,n){var i,o,s;return i=t.grep(this.items,function(t){return t===e.text()}),this.items.push(i.length?e.text()+n:e.text()),s=this._generateHashValue(i,e,n),o=t("<li/>",{"class":d,"data-unique":s}).append(t("<a/>",{text:e.text()})),e.before(t("<div/>",{name:s,"data-unique":s})),o},_generateHashValue:function(t,e,n){var i="",o=this.options.hashGenerator;if("pretty"===o){for(i=e.text().toLowerCase().replace(/\s/g,"-"),i=i.replace(/[^\x00-\x7F]/g,"");i.indexOf("--")>-1;)i=i.replace(/--/g,"-");for(;i.indexOf(":-")>-1;)i=i.replace(/:-/g,"-")}else i="function"==typeof o?o(e.text(),e):e.text().replace(/\s/g,"");return t.length&&(i+=""+n),i},_appendSubheaders:function(e,n){var i=t(this).index(e.options.selectors),o=t(e.options.selectors).eq(i-1),s=+t(this).prop("tagName").charAt(1),r=+o.prop("tagName").charAt(1);r>s?e.element.find(u+"[data-tag="+s+"]").last().append(e._nestElements(t(this),i)):s===r?n.find(f).last().after(e._nestElements(t(this),i)):n.find(f).last().after(t("<ul/>",{"class":h,"data-tag":s})).next(u).append(e._nestElements(t(this),i))},_setEventHandlers:function(){var o=this;this.element.on("click.tocify","li",function(){if(o.options.history&&(e.location.hash=t(this).attr("data-unique")),o.element.find("."+o.focusClass).removeClass(o.focusClass),t(this).addClass(o.focusClass),o.options.showAndHide){var n=t('li[data-unique="'+t(this).attr("data-unique")+'"]');o._triggerShow(n)}o._scrollTo(t(this))}),this.element.find("li").on({"mouseenter.tocify":function(){t(this).addClass(o.hoverClass),t(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==o.options.theme&&t(this).removeClass(o.hoverClass)}}),t(e).on("resize",function(){o.calculateHeights()}),t(e).on("scroll.tocify",function(){t("html, body").promise().done(function(){var s,r,a,l,c=t(e).scrollTop(),h=t(e).height(),u=t(n).height(),d=t("body")[0].scrollHeight;if(o.options.extendPage&&(o.webkit&&c>=d-h-o.options.extendPageOffset||!o.webkit&&h+c>u-o.options.extendPageOffset)&&!t(g).length){if(r=t('div[data-unique="'+t(f).last().attr("data-unique")+'"]'),!r.length)return;a=r.offset().top,t(o.options.context).append(t("<div />",{"class":p,height:Math.abs(a-c)+"px","data-unique":p})),o.extendPageScroll&&(l=o.element.find("li.active"),o._scrollTo(t("div[data-unique="+l.attr("data-unique")+"]")))}setTimeout(function(){var r,a=null;0==o.cachedHeights.length&&o.calculateHeights();var l=t(e).scrollTop();if(o.cachedAnchors.each(function(t){return o.cachedHeights[t]-l<0?void(a=t):!1}),r=t(o.cachedAnchors[a]).attr("data-unique"),s=t('li[data-unique="'+r+'"]'),o.options.highlightOnScroll&&s.length&&!s.hasClass(o.focusClass)){o.element.find("."+o.focusClass).removeClass(o.focusClass),s.addClass(o.focusClass);var c=o.tocifyWrapper,h=t(s).closest(".tocify-header"),u=h.offset().top,d=c.offset().top,f=u-d;if(f>=t(e).height()){var p=f+c.scrollTop();c.scrollTop(p)}else 0>f&&c.scrollTop(0)}o.options.scrollHistory&&e.location.hash!=="#"+r&&r!==i&&(history.replaceState?history.replaceState({},"","#"+r):(scrollV=n.body.scrollTop,scrollH=n.body.scrollLeft,location.hash="#"+r,n.body.scrollTop=scrollV,n.body.scrollLeft=scrollH)),o.options.showAndHideOnScroll&&o.options.showAndHide&&o._triggerShow(s,!0)},0)})})},calculateHeights:function(){var e=this;e.cachedHeights=[],e.cachedAnchors=[];var n=t(e.options.context).find("div[data-unique]");n.each(function(n){var i=(t(this).next().length?t(this).next():t(this)).offset().top-e.options.highlightOffset;e.cachedHeights[n]=i}),e.cachedAnchors=n},show:function(e){var n=this;if(!e.is(":visible"))switch(e.find(u).length||e.parent().is(c)||e.parent().is(":visible")?e.children(u).length||e.parent().is(c)||(e=e.closest(u)):e=e.parents(u).add(e),n.options.showEffect){case"none":e.show();break;case"show":e.show(n.options.showEffectSpeed);break;case"slideDown":e.slideDown(n.options.showEffectSpeed);break;case"fadeIn":e.fadeIn(n.options.showEffectSpeed);break;default:e.show()}return n.hide(t(u).not(e.parent().is(c)?e:e.closest(c).find(u).not(e.siblings()))),n},hide:function(t){var e=this;switch(e.options.hideEffect){case"none":t.hide();break;case"hide":t.hide(e.options.hideEffectSpeed);break;case"slideUp":t.slideUp(e.options.hideEffectSpeed);break;case"fadeOut":t.fadeOut(e.options.hideEffectSpeed);break;default:t.hide()}return e},_triggerShow:function(t,e){var n=this;return t.parent().is(c)||t.next().is(u)?n.show(t.next(u),e):t.parent().is(u)&&n.show(t.parent(),e),n},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(c+","+u).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=s,this.hoverClass=r),this},setOption:function(){t.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){t.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(e){var n=this,i=n.options.smoothScroll||0,o=n.options.scrollTo;return t("html, body").promise().done(function(){t("html, body").animate({scrollTop:t('div[data-unique="'+e.attr("data-unique")+'"]').next().offset().top-(t.isFunction(o)?o.call():o)+"px"},{duration:i})}),n}})}),function(t){"use strict";function e(){setTimeout(function(){toc.setOption("showEffectSpeed",180)},50)}var n=function(){$(".tocify-wrapper").removeClass("open"),$("#nav-button").removeClass("open")},i=function(){t.toc=$("#toc").tocify({selectors:"h1, h2",extendPage:!1,theme:"none",smoothScroll:!1,showEffectSpeed:0,hideEffectSpeed:180,ignoreSelector:".toc-ignore",highlightOffset:60,scrollTo:-1,scrollHistory:!0,hashGenerator:function(t,e){return e.prop("id")}}).data("toc-tocify"),$("#nav-button").click(function(){return $(".tocify-wrapper").toggleClass("open"),$("#nav-button").toggleClass("open"),!1}),$(".page-wrapper").click(n),$(".tocify-item").click(n)};$(i),$(e)}(window),$(document).ready(function(){$("button.tryme").click(function(){var t=new WebSocket("wss://socket.blockcypher.com/v1/btc/main"),e=0;t.onmessage=function(n){var i=JSON.parse(n.data),o=i.hash.substring(0,6)+"...",s=i.total/1e8,r=i.addresses.join(", ");$("#browser-websocket").before("<div>Unconfirmed transaction "+o+" totalling "+s+"BTC involving addresses "+r+"</div>"),e++,e>10&&t.close()},t.onopen=function(){t.send(JSON.stringify({filter:"event=unconfirmed-tx"}))}})});