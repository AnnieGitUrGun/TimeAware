//>>built
"undefined"==typeof define&&function(){var s={};define=function(k,h,m){for(var l=0;l<h.length;l++)h[l]=s[h[l]];s[k]=m.apply(this,h)};require=function(k){define("",k,factory)}}();
define("xstyle/xstyle",["require"],function(s){function k(e){e=document.getElementsByTagName(e);for(var a=0;a<e.length;a++)h(e[a])}function h(e,a,l){function v(){s(["./load-imports"],function(f){f(e,function(){h(e,a,!0)})})}var f=e.sheet||e.styleSheet,p=f.needsParsing,k=f.rules||f.cssRules;if(f.imports&&!l&&f.imports.length)return v();if(!p)for(var t=0;t<k.length;t++){var q=k[t];if(q.href&&!l)return v();q.selectorText&&"x-"==q.selectorText.substring(0,2)&&(p=!0)}p&&m(f.source||f.ownerElement.innerHTML,
f,a)}function m(e,a,k){function h(b,g,c){(n[b]||(n[b]={}))[g]=c}function f(b){n[b]||(n[b]={});h("selector","x-"+b,{onRule:function(g){g.eachProperty(function(c,g){do{var a=g.match(/require\s*\((.+)\)|([^, ]+)([, ]+(.+))?/);if(a[1])return h(b,c,a[1]);var d=a[2];if("default"==d){if("property"==b&&"string"==typeof l.style[c])break;if("pseudo"==b)try{document.querySelectorAll("x:"+c);break}catch(e){}}else if("prefix"==d){if("string"==typeof l.style[u+c])return h(b,c,"xstyle/xstyle")}else return h(b,c,
function(){return g})}while(g=a[4])})}})}function p(){}function r(b,g){var c=b;do{var a=n.property[b];if(a)return q(a,"onProperty",c,g);b=b.substring(0,b.lastIndexOf("-"))}while(b)}function t(b,a){var c=n.selector[b];c&&q(c,"onRule",a)}function q(b,g,c,e){if(b){var f=d,h=function(c){console.log("loaded ",b,c);c&&a.addRule(f.fullSelector(),c);0==--m&&k&&k(a)};m++;console.log("loading ",b,c,e);var l=function(b){(b=b[g](c,e,f,a))&&b.then?b.then(h):h(b)};"string"==typeof b?s([b],l):l(b)}}a.addRule||(a.addRule=
function(b,a,c){return this.insertRule(b+"{"+a+"}",0<=c?c:this.cssRules.length)});a.deleteRule||(a.deleteRule=sheet.removeRule);var n={property:{}};f("property");f("value");f("pseudo");var m=1;(a.href||location.href).replace(/[^\/]+$/,"");var w=/(?:^|\W)()(?:$|\W)/;p.prototype={eachProperty:function(b,a){this.cssText.replace(/\s*([^;:]+)\s*:\s*([^;]+)?/g,function(a,c,g){b(c,g)});if(this.children)for(var c=0;c<this.children.length;c++){var d=this.children[c];d.selector||b(d.property,d)}},fullSelector:function(){return(this.parent?
this.parent.fullSelector():"")+(this.selector||"")+" "},add:function(b,g){g&&(a.addRule?a.addRule(b,g):a.insertRule(b+"{"+g+"}",a.cssRules.length))},cssText:""};var d=new p;d.css=e;e.replace(/\s*(?:([^{;\s]+)\s*{)?\s*([^{}]+;)?\s*(};?)?/g,function(b,a,c,e){a&&(b=new p,(d.children||(d.children=[])).push(b),b.parent=d,":"==a.charAt(a.length-1)?b.property=a.substring(0,a.length-1):b.selector=a,d=b);c&&(d.cssText+=c);if(e){d.cssText.replace(/\s*([^;:]+)\s*:\s*([^;]+)?/g,function(a,b,c){r(b,c);c.replace(w,
function(b,a){})});if(d.children)for(a=0;a<d.children.length;a++)c=d.children[a],c.selector||r(c.property,c);t(d.selector,d);d.selector&&d.selector.replace(/:([-\w]+)/,function(b,a){var c=n.pseudo[a];c&&q(c,"onPseudo",a,d)});d=d.parent}});0==--m&&k&&k(a)}var l=document.createElement("div"),r=navigator.userAgent,u=-1<r.indexOf("WebKit")?"-webkit-":-1<r.indexOf("Firefox")?"-moz-":-1<r.indexOf("MSIE")?"-ms-":-1<r.indexOf("Opera")?"-o-":"";k("link");k("style");return{process:h,vendorPrefix:u,onProperty:function(e,
a){return"opacity"==e&&"-ms-"==u?"filter: alpha(opacity\x3d"+100*a+"); zoom: 1;":u+e+":"+a+";"}}});