// Sliding Control Panel
$(document).ready(function(){
	$(".btn-slide").click(function(){
		$("#timeSliderWin").slideToggle("slow");
		$(this).toggleClass("active"); return false;
	});
    $(window).resize(function(){
        diaWinWidth = .7 * $(window).width();
        diaWinHeight = .9 * $(window).height();
        pictureHeight = .6 * diaWinHeight;
    });
});

// Load Dojo modules
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.registry");
dojo.require("dojo.fx.easing");
dojo.require("dojo.on");
dojo.require("dojo.query");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.InfoTemplate");
dojo.require("esri.dijit.TimeSlider");
dojo.require("esri.dijit.HomeButton");
dojo.require("esri.graphic");
dojo.require("esri.lang");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.popup");
dojo.require("esri.map");
dojo.require("esri.layers.ArcGISImageServiceLayer");
dojo.require("dijit.Dialog");
dojo.require("dojo.dom-class");
dojo.require("dojo.dom-style")

 
var map,
    diaWinWidth = .7 * $(window).width(),
    diaWinHeight = .9 * $(window).height(),
    pictureHeight = .6 * diaWinHeight,
    siteName,
    serviceType,
    serviceName = [],
    serviceLayerName = [],
    pointService,
    imageService,
    lineService, 
    myTimeStepIntervals = [],
    photoDate,
    today = new Date(),
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    // MPA Sites Overview
    mpaSitePointsService = "http://staging.mesgis.com/arcgis/rest/services/MPA/MPASites/MapServer/0",
    // Cox Creek
    coxCenter = [-76.5320, 39.1975],
    coxZoom = 16,
    coxImageService = "http://staging.mesgis.com/arcgis/rest/services/MPA/CoxCreek/ImageServer",
    coxImageServiceLayer = [],
    coxShorelineService = "http://staging.mesgis.com/arcgis/rest/services/MPA/CoxCreekShoreline/MapServer/0",
    coxTourPointsService = "http://staging.mesgis.com/arcgis/rest/services/MPA/CoxCreekTourPoints/MapServer/0",
    coxShoreline = [],
    coxTourPoints = [],
    // Masonville
    masonCenter = [-76.5873, 39.2470],
    masonZoom = 16,
    masonImageService = "http://staging.mesgis.com/arcgis/rest/services/MPA/Masonville/ImageServer",
    masonImageServiceLayer = [],
    masonShorelineService = "http://staging.mesgis.com/arcgis/rest/services/MPA/MasonvilleShoreline/MapServer/0",
    masonTourPointsService = "http://staging.mesgis.com/arcgis/rest/services/MPA/MasonvilleTourPoints/MapServer/0",
    masonShoreline = [],
    masonTourPoints = [],
    //Poplar Island
    poplarCenter = [-76.3818, 38.7590],
    poplarZoom = 14,
    poplarImageService = "http://staging.mesgis.com/arcgis/rest/services/MPA/PoplarIsland/ImageServer",
    poplarImageServiceLayer = [],
    poplarShorelineService = "http://staging.mesgis.com/arcgis/rest/services/MPA/PoplarIslandShoreline/MapServer/0",
    poplarTourPointsService = "http://staging.mesgis.com/arcgis/rest/services/MPA/PoplarTourPoints/MapServer/0",
    poplarShoreline = [],
    poplarTourPoints = [],
    //Hart-Miller Island
    hmiCenter = [-76.3665, 39.2483],
    hmiZoom = 15,
    hmiImageService = "http://staging.mesgis.com/arcgis/rest/services/MPA/HMI/ImageServer",
    hmiImageServiceLayer = [],
    hmiShorelineService = "http://staging.mesgis.com/arcgis/rest/services/MPA/HMIShoreline/MapServer/0",
    hmiTourPointsService = "http://staging.mesgis.com/arcgis/rest/services/MPA/HMITourPoints/MapServer/0",
    hmiShoreline = [];
    hmiTourPoints = [];
    
function init() {
    siteName = 'MPA Image Viewer';
    
    map = new esri.Map("map", {
        //extent: initMasonExtent,
        basemap: "satellite",
        center: [-76.38, 39.07],
        zoom: 9,
        isClickRecenter: true,
        navigationMode: 'classic',
        logo: false
    });

    dojo.on(map, 'update-start', function() {
        dojo.query('#loadingGif').style("visibility", "visible");
    });

    dojo.on(map, 'update-end', function() {
        dojo.query('#loadingGif').style("visibility", "hidden");
    });

    var template = new esri.InfoTemplate();
    template.setTitle("Info for ${Name}");
    template.setContent("<b>Description: </b>${Description}<br/>" + "<iframe width=100%; height=100% src=${URL}></iframe>");
    
    dojo.on(map.infoWindow, 'hide', function() {
        dojo.query(".esriPopup iframe").style("width", "0");
    });

    var params = new esri.layers.ImageServiceParameters();
    params.noData = 0;

    // MPA Sites Overview Layer
    mpaSitePoints = new esri.layers.FeatureLayer(mpaSitePointsService, {
    	mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
    	outFields: ["Name"]
    });

    // Cox Creek Services
    coxImageServiceLayer = new esri.layers.ArcGISImageServiceLayer(coxImageService, {
        imageServiceParameters: params,
        hasAttributionData: true
    });

    coxShoreline = new esri.layers.FeatureLayer(coxShorelineService, {
        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
        outFields: ["Name", "Date"]
    });

    //coxShoreline.setDefinitionExpression("Date = (SELECT MIN(Date) FROM CoxCreekShorelines WHERE OBJECTID >= 1"); 

    coxTourPoints = new esri.layers.FeatureLayer(coxTourPointsService, {
        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
        infoTemplate: template,
        outFields: ["StopNumber", "Name", "Description", "URL", "PhotoDate"]
    });

    // Masonville Services
    masonImageServiceLayer = new esri.layers.ArcGISImageServiceLayer(masonImageService, {
        imageServiceParameters: params,
        hasAttributionData: true
    });

    masonShoreline = new esri.layers.FeatureLayer(masonShorelineService, {
        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
        outFields: ["Name", "Date"]
    });

    masonTourPoints = new esri.layers.FeatureLayer(masonTourPointsService, {
        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
        infoTemplate: template,
        outFields: ["StopNumber", "Name", "Description", "URL", "PhotoDate"]
    });

    // Poplar Island Services
    poplarImageServiceLayer = new esri.layers.ArcGISImageServiceLayer(poplarImageService, {
    	imageServiceParameters: params,
    	hasAttributionData: true
    });

    poplarShoreline = new esri.layers.FeatureLayer(poplarShorelineService, {
    	mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
    	outFields: ["Name", "Date"]
    });

    poplarTourPoints = new esri.layers.FeatureLayer(poplarTourPointsService, {
    	mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
    	infoTemplate: template,
    	outFields: ["StopNumber", "Name", "Description", "URL", "PhotoDate"]
    });
	
    // Hart-Miller Island Services
    hmiImageServiceLayer = new esri.layers.ArcGISImageServiceLayer(hmiImageService, {
    	imageServiceParameters: params,
    	hasAttributionData: true
    });

    hmiShoreline = new esri.layers.FeatureLayer(hmiShorelineService, {
    	mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
    	outFields: ["Name", "Date"]
    });
    
    hmiTourPoints = new esri.layers.FeatureLayer(hmiTourPointsService, {
	mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
	infoTemplate: template,
	outFields: ["StopNumber", "Name", "Description", "URL", "PhotoDate"]
    });

    // If we needed a definition query here's where we would add it
    // tourPoints.setDefinitionExpression("SiteName = 'Masonville'");
    map.infoWindow.set("popupWindow", false);

    // MPA Site Points Events
    mpaSitePoints.on("mouse-over", showSiteName);
    mpaSitePoints.on("mouse-out", closeDialog);


    // Cox Creek Events
    dojo.connect(coxTourPoints, "onClick", function(evt) {
        serviceName = coxTourPoints;
        displayPopupContent(evt.graphic);
    });

    coxShoreline.on("mouse-over", showTooltip);
    coxShoreline.on("mouse-out", closeDialog);

    // Masonville Events
    dojo.connect(masonTourPoints, "onClick", function(evt) {
        serviceName = masonTourPoints;
        displayPopupContent(evt.graphic, serviceName);
    });

    masonShoreline.on("mouse-over", showTooltip);
    masonShoreline.on("mouse-out", closeDialog);    

    // Poplar Island Events
    dojo.connect(poplarTourPoints, "onClick", function(evt) {
	serviceName = poplarTourPoints;
       	displayPopupContent(evt.graphic, serviceName);
    });

    poplarShoreline.on("mouse-over", showTooltip);
    poplarShoreline.on("mouse-out", closeDialog);

    // Hart-Miller Island Events
    dojo.connect(hmiTourPoints, "onClick", function(evt) {
        serviceName = hmiTourPoints;
        displayPopupContent(evt.graphic, serviceName);
    });
	
    hmiShoreline.on("mouse-over", showTooltip);
    hmiShoreline.on("mouse-out", closeDialog);




    function showSiteName(evt){
        closeDialog();
        var tipContent = evt.graphic.attributes.Name;
        var dialog = new dijit.TooltipDialog({
          id: "tooltipDialog",
          content: tipContent,
          style: "position: absolute; z-index:100"
        });
        dialog.startup();


        dojo.style(dialog.domNode, "opacity", 0.85);
        dijit.placeOnScreen(dialog.domNode, {x: evt.pageX, y: evt.pageY}, ["TL", "BL"], {x: 10, y: 10});
    }
   
    function showTooltip(evt){
        shoreDate = new Date(evt.graphic.attributes.Date);
        var month = monthNames[shoreDate.getMonth()];
        var year = shoreDate.getFullYear();
        shoreDate = month + " " + year;
        closeDialog();
        var tipContent = shoreDate + " " + "shoreline";
          
        var dialog = new dijit.TooltipDialog({
          id: "tooltipDialog",
          content: tipContent,
          style: "position: absolute;"
        });
        dialog.startup();


        dojo.style(dialog.domNode, "opacity", 0.85);
        dijit.placeOnScreen(dialog.domNode, {x: evt.pageX, y: evt.pageY}, ["TL", "BL"], {x: 10, y: 10});
      }

      function closeDialog() {
        var widget = dijit.byId("tooltipDialog");
        if (widget) {
          widget.destroy();
        }
      }


    function displayPopupContent(feature) {
        // var diaWinHeight = 0.8*brWinHeight;
        // var diaWinWidth = 0.5*brWinWidth;
        //var picHeight = 0.9*diaWinHeight;
        var picHeight = 0.7*diaWinHeight;
        if (feature) {
			var photoDate = feature.attributes.PhotoDate;
            var panoURL = feature.attributes.URL;
            panoURL = panoURL.replace(/"/g, '');
            var diacontent = "<iframe id='ifr' src='http://staging.mesgis.com/MPAImageViewer/" + panoURL + "' width='98%' height='" + pictureHeight + "px;'></iframe><p style='position:absolute; left:5px; color:blue; padding-right:20px;'><i>Use mousewheel to zoom in/out.</i></p><br /><br /><p style='padding-right:20px;'>" + feature.attributes.Description + "</p>";
            var dialog = new dijit.Dialog({
                title: feature.attributes.Name + ' - ' + formatDate(photoDate),
                content: diacontent,
                style: "width:" + diaWinWidth + "px; height:" + diaWinHeight + "px"
                //style: "width: 900px; height:700px "
            });
            dialog.show();
            dojo.connect(dialog, "hide", function(e) {
                serviceName.clearSelection();
                map.graphics.clear();
            });
            //registry.byId("leftPane").set("content", content);
        }
    }
    //map.addLayer(coxTourPoints);
    // Resize the info window
    map.infoWindow.resize(530, 650);
    var home = new esri.dijit.HomeButton({
        map: map
    }, "HomeButton");
    home.startup(updateTitle(siteName));
   

    // Add our MPA Sites Overview Layer
    //map.addLayer(mpaSitePoints);

    $('#HomeButton').click(function() {
    	siteName = 'MPA Image Viewer';
    	resetButtons();
    	removeAllLayers();
    	updateTitle(siteName);
    });

    $('#btnShoreline').click(function() {
        serviceType = '';
        serviceType = 'lineService';
        getService(siteName, serviceType);
        $('#info').toggle('linear');
        if ($('#btnShoreline').hasClass('btnSelected')) {
            $('#btnShoreline').removeClass('btnSelected');
            map.removeLayer(serviceName);
        } else {
            $('#btnShoreline').addClass('btnSelected');
            map.addLayer(serviceName);
            map.reorderLayer(serviceName);
            
        }
    });

    
    $('#btnMarker').click(function() {
        serviceType = '';
        serviceType = 'pointService';
        getService(siteName, serviceType);
        if ($('#btnMarker').hasClass('btnSelected')) {
            $('#btnMarker').removeClass('btnSelected');
            map.removeLayer(serviceName);
        } else {
            $('#btnMarker').addClass('btnSelected');
            map.addLayer(serviceName);
            reorderLayers(siteName);
        }
    });
 

    $('#btnImagery').click(function() {
        serviceType = '';
        serviceType = 'imageService';
        getService(siteName, serviceType);

        if ($('#btnImagery').hasClass('btnSelected')) {
            $('#btnImagery').removeClass('btnSelected');
            map.removeLayer(serviceLayerName);
            destroySlider();
            $('#subTitle').html('');
        } 
        else {
            $('#btnImagery').addClass('btnSelected');
            map.addLayer(serviceLayerName);
            getQueryTask(serviceName, serviceLayerName);
            //reorderLayers(siteName);
            //initSlider(timeSlider);
        }
    });

    
    $("#cox-creek").click(function() {
        resetButtons();
        removeAllLayers();
        siteName = 'Cox Creek';
        updateTitle(siteName);
        map.centerAndZoom(coxCenter, coxZoom);
    });
    

    $("#masonville").click(function() {
        siteName = 'Masonville';
        updateTitle(siteName);
        resetButtons();
        removeAllLayers();
        map.centerAndZoom(masonCenter, masonZoom);
    });

        
    $("#poplar-island").click(function() {
        siteName = 'Poplar Island';
        updateTitle(siteName);
        resetButtons();
        removeAllLayers();
        map.centerAndZoom(poplarCenter, poplarZoom);
    });


    $("#hart-miller").click(function() {
        siteName = 'Hart-Miller Island';
        updateTitle(siteName);
        resetButtons();
        removeAllLayers();
        map.centerAndZoom(hmiCenter, hmiZoom);
    });


}

function formatDate(photoDate){
	photoDate = new Date(photoDate);
	var month = monthNames[photoDate.getMonth()];
	var day = photoDate.getDate();
	var year = photoDate.getFullYear();
	photoDate = month + ' ' + day + ', ' + year;

	return photoDate;
}

function removeAllLayers(){
	// Cox Creek
	map.removeLayer(coxImageServiceLayer);
	map.removeLayer(coxTourPoints);
	map.removeLayer(coxShoreline);
	
	// Masonville
	map.removeLayer(masonImageServiceLayer);
	map.removeLayer(masonTourPoints);
	map.removeLayer(masonShoreline);
	
	// Poplar Island
	map.removeLayer(poplarImageServiceLayer);
	map.removeLayer(poplarTourPoints);
	map.removeLayer(poplarShoreline);

	// Hart-Miller Island
	map.removeLayer(hmiImageServiceLayer);
	map.removeLayer(hmiTourPoints);
	map.removeLayer(hmiShoreline);
}

function resetButtons(){
	destroySlider();
        	$('#subTitle').html('');
	if ($('#btnImagery').hasClass('btnSelected')) {
		$('#btnImagery').removeClass('btnSelected');
	}
	if ($('#btnMarker').hasClass('btnSelected')){
		$('#btnMarker').removeClass('btnSelected');
	}
	if ($('#btnShoreline').hasClass('btnSelected')){
		$('#btnShoreline').removeClass('btnSelected');
	}
        	
}

function getQueryTask(serviceName, serviceLayerName){
	map.addLayer(serviceLayerName);
	var minDate = today.getTime();
	myTimeStepIntervals.length = 0;
	var query = new esri.tasks.Query();
	query.where = "1=1";
	query.outFields = ["Date"];
	query.returnGeometry = false;
	var queryTask = new esri.tasks.QueryTask(serviceName);
	// Query for the image dates and put them in an array
	queryTask.execute(query, function(featureSet) {
		//alert(featureSet.features[0].attributes.Date);
		var resultSet = featureSet.features;
		for (var i = 0, il = resultSet.length; i < il; i++) {
			var interval = resultSet[i].attributes.Date;
			var testDate = new Date(interval);
			testDate = testDate.getTime();

			if (testDate < minDate) {
			  minDate = testDate;
			}
		myTimeStepIntervals.push(new Date(interval));
		}

	minDate = new Date(minDate);
	var month = monthNames[minDate.getMonth()];
	var day = minDate.getDate();
	var year = minDate.getFullYear();
	minDate = month + ' ' + day + ' ' + year;
	
	$('#subTitle').html(minDate);
	//alert(myTimeStepIntervals.length);
	initSlider(serviceLayerName);  


	});
}

function reorderLayers(siteName){
    if (siteName = 'Cox Creek'){
        map.reorderLayer(coxTourPoints, 1);
    }
    else if (siteName = 'Masonville'){
        map.reorderLayer(masonTourPoints, 1);
    }
    else if (siteName = 'Poplar Island'){
        map.reorderLayer(poplarTourPoints, 1);
    }
    else if (siteName = 'Hart-Miller Island'){
        map.reorderLayer(hmiTourPoints, 1);
    }

}

function getService(siteName, serviceType){
    if (serviceType == 'pointService'){
        if (siteName == 'Cox Creek'){
            serviceName = coxTourPoints;
        }
        else if (siteName == 'Masonville'){
            serviceName = masonTourPoints;
        }
        else if (siteName == 'Poplar Island'){
            serviceName = poplarTourPoints;
        }
        else if (siteName == 'Hart-Miller Island'){
            serviceName = hmiTourPoints;
        }
    }
    else if (serviceType == 'imageService'){
        if (siteName == 'Cox Creek'){
        	  serviceName = coxImageService;
            serviceLayerName = coxImageServiceLayer;
        }
        else if (siteName == 'Masonville'){
        	  serviceName = masonImageService;
            serviceLayerName = masonImageServiceLayer;
        }
        else if (siteName == 'Poplar Island'){
        	  serviceName = poplarImageService;
            serviceLayerName = poplarImageServiceLayer;
        }
        else if (siteName == 'Hart-Miller Island'){
        	  serviceName = hmiImageService;
            serviceLayerName = hmiImageServiceLayer;
        }
    }
    else {
        serviceType == 'lineService';
        if (siteName == 'Cox Creek'){
            serviceName = coxShoreline;
        }
        else if (siteName == 'Masonville'){
            serviceName = masonShoreline;
        }
        else if (siteName == 'Poplar Island'){
            serviceName = poplarShoreline;
        }
        else if (siteName == 'Hart-Miller Island'){
            serviceName = hmiShoreline;
        }
    }
    return serviceName, serviceLayerName;
}

function updateTitle() {
    $(document).ready(function() {
        $('#title').html(siteName);
    });
}


function destroySlider(){
    if (dijit.byId('timeSlider')){
        dijit.byId('timeSlider').destroy();
    }
}

function initSlider(results) {
    // Destroy existing time slider
    if (dijit.byId('timeSlider')) {
        //alert('Exterminate!');
        dijit.byId('timeSlider').destroy();
    }
    // Create a new time slider
    var tsDiv = dojo.create("div", null, dojo.byId('timeSliderDiv'));
    var timeSlider = new esri.dijit.TimeSlider({
        style: "width:100%;",
        id: 'timeSlider'
    }, tsDiv);
    map.setTimeSlider(timeSlider);
    //var myTimeStepIntervals = [new Date("1/1/2005 6:00:01 UTC"), new Date("1/1/2007 6:00:01 UTC"), new Date("11/7/2007 6:00:01 UTC"), new Date("3/29/2008 6:00:01 UTC")];
    var timeExtent = new esri.TimeExtent();
    timeSlider.setThumbCount(1);
    // Set the slider intervals to dates in the raster mosaic
    timeSlider.setTimeStops(myTimeStepIntervals);
    timeExtent = results.timeInfo.timeExtent;
    var attTable = results.getRasterAttributeTable(function() {
        alert('success')
    }, function() {
        alert('fail')
    });
    //timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, 'esriTimeUnitsMonths');
    timeSlider.setThumbMovingRate(5000);
    timeSlider.singleThumbAsTimeInstant(true);
    timeSlider.startup();
    dojo.connect(timeSlider, "onTimeExtentChange", function(timeExtent) {
        dojo.byId("subTitle").innerHTML = dojo.string.substitute("${endTime}", timeExtent, function(val) {
            return dojo.date.locale.format(val, {
                selector: 'date',
                datePattern: 'MMMM dd yyyy'
            });
        });
        dojo.byId("info").innerHTML = dojo.string.substitute("Testing!!");
    }); 
}
dojo.ready(init);