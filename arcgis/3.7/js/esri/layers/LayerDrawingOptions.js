/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/layers/LayerDrawingOptions","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has esri/kernel esri/lang esri/renderers/jsonUtils esri/layers/LabelClass".split(" "),function(b,c,d,e,f,g,h,k){b=b(null,{declaredClass:"esri.layers.LayerDrawingOptions",constructor:function(a){if(a&&(c.mixin(this,a),a.renderer&&(this.renderer=h.fromJson(a.renderer)),a.labelingInfo&&0<a.labelingInfo.length)){this.labelingInfo=[];var b;d.forEach(a.labelingInfo,function(a){b=new k(a);this.labelingInfo.push(b)},
this)}},toJson:function(){var a={renderer:this.renderer&&this.renderer.toJson(),transparency:this.transparency,scaleSymbols:this.scaleSymbols,showLabels:this.showLabels};this.labelingInfo&&0<this.labelingInfo.length&&(a.labelingInfo=[],d.forEach(this.labelingInfo,function(b){a.labelingInfo.push(b.toJson())}));return g.fixJson(a)}});e("extend-esri")&&c.setObject("layers.LayerDrawingOptions",b,f);return b});