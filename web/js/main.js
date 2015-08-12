/*
*
* mads - version 2  
* Copyright (c) 2015, Ninjoe
* Dual licensed under the MIT or GPL Version 2 licenses.
* https://en.wikipedia.org/wiki/MIT_License
* https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
*
*/
var mads = function () {
    /* Get Tracker */
    if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
        this.custTracker = rma.customize.custTracker;
    } else if (typeof custTracker != 'undefined') {
        this.custTracker = custTracker;
    } else {
        this.custTracker = [];
    }
    
    /* Unique ID on each initialise */
    this.id = this.uniqId();
    
    /* Tracked tracker */
    this.tracked = [];
    
    /* Body Tag */
    this.bodyTag = document.getElementsByTagName('body')[0];
    
    /* Head Tag */
    this.headTag = document.getElementsByTagName('head')[0];
    
    /* RMA Widget - Content Area */
    this.contentTag = document.getElementById('rma-widget');
    
    /* URL Path */
    this.path = typeof rma != 'undefined' ? rma.customize.src : '';
};

/* Generate unique ID */
mads.prototype.uniqId = function () {
    
    return new Date().getTime();
}

/* Link Opner */
mads.prototype.linkOpener = function (url) {

	if(typeof url != "undefined" && url !=""){
		if (typeof mraid !== 'undefined') {
			mraid.open(url);
		}else{
			window.open(url);
		}
	}
}

/* tracker */
mads.prototype.tracker = function (type, name) {
    
    /* 
    * name is used to make sure that particular tracker is tracked for only once 
    * there might have the same type in different location, so it will need the name to differentiate them
    */
    name = name || type; 
    
    if ( typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1 ) {
        for (var i = 0; i < this.custTracker.length; i++) {
            var img = document.createElement('img');
            img.src = this.custTracker[i] + type + '&' + this.id;
            img.style.display = 'none';
            this.bodyTag.appendChild(img);
            
            this.tracked.push(name);
        }
    }
};

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
    var script = document.createElement('script');
    script.src = js;
    
    if (typeof callback != 'undefined') {
        script.onload = callback;
    }
    
    this.headTag.appendChild(script);
}

/* Load CSS File */
mads.prototype.loadCss = function (href) {
    var link = document.createElement('link');
    link.href = href;
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    
    this.headTag.appendChild(link);
}


/*
* Pizza Hut Ad
*
*/
var pizzahutApp = function() {

    var sdk = new mads();
    
    sdk.loadCss( sdk.path + 'css/style.css');

    sdk.contentTag.innerHTML = '<div id="clickable" class="background"><div class="frame_1"><div class="vector_1"></div><span class="guess_whos_back"></span><div class="vector_2"></div></div><div class="vector_2_container"><div class="vector_2a"></div></div><div class="frame_2"><div class="pizza_outline_1"></div><div class="pizza_outline_2"></div><div class="ingredient_1"></div><div class="ingredient_2"></div><div class="ingredient_3"></div><div class="ingredient_4"></div></div><div class="frame_3"><div class="pizza"></div><div class="emblem"></div><div class="halal"></div><div class="tnc"></div><div id="order_now"></div><div class="cheesy_is_back"></div><div class="get_your_pizza"></div></div></div>';
    
    document.getElementById('clickable').addEventListener('click', function () {
        sdk.linkOpener('https://ad.doubleclick.net/ddm/clk/293842468;120931360;g');
        sdk.tracker('site');
    });
};

pizzahutApp()