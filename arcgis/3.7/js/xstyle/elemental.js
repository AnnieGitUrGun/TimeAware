//>>built
define("xstyle/elemental",[],function(){function m(a){for(var b=document.querySelectorAll(a.selector),c=a.name,d=0,r=b.length;d<r;d++){var f=b[d],g=f.elementalStyle;g||(g=f.elementalStyle={},f.elementalSpecificities={});var e=f.renderings;e||(e=f.renderings=[],k.push(f));e.push({name:c,rendered:g[c]==a.propertyValue,renderer:a});g[c]=a.propertyValue}}function n(){for(var a=0;a<k.length;a++)for(var b=k[a],c=b.renderings,d=b.elementalStyle,e=0;e<c.length;e++){var f=c[e],g=f.renderer,h=g.rendered;isCurrent=
d[f.name]==g.propertyValue;!h&&isCurrent&&g.render(b);h&&(!isCurrent&&g.unrender)&&(g.unrender(b),c.splice(e--,1))}k=[]}function p(a){for(var b=0,c=h.length;b<c;b++){var d=h[b];(l?l.apply(a,d.selector):a.currentStyle[d.name]==d.propertyValue)&&d.render(a)}}var e=document.createElement("div"),s={"dom-qsa2.1":!!e.querySelectorAll},l=e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector,h=[],k=[],q;require(["dojo/domReady!"],function(){q=!0;if(s["dom-qsa2.1"]){for(var a=
0,b=h.length;a<b;a++)m(h[a]);n()}else for(var c=document.all,a=0,b=c.length;a<b;a++)p(c[a])});put="undefined"==typeof put?{}:put;put.onaddclass=function(a,b){for(var c=classTriggers[b],d=0,e=c.length;d<e;d++){var f=c[d];l.apply(a,f.selector)&&(f.render(a),(a.renderers=a.renderers||[]).push(f))}};put.onremoveclass=function(a){var b=a.renderers;if(b)for(var c=b.length-1;0<=c;c--){var d=b[c];l.apply(a,d.selector)||(d.unrender(a),b.splice(c,1))}};put.oncreateelement=function(a){tagTriggers[a.tagName]};
return{addRenderer:function(a,b,c,d){a={selector:c.selector,propertyValue:b,name:a,render:d};h.push(a);q&&m(a);n()},update:p}});