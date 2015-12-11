"use strict";var app=angular.module("scradioApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngSanitize","ngTouch","ui.bootstrap","ui.router"]);app.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("home",{url:"/",templateUrl:"views/home.html",controller:"HomeCtrl"}),b.otherwise("/")}]),$(document).ready(function(){$(".tile").height($("#tile1").width()),$(".carousel").height($("#tile1").width()),$(".item").height($("#tile1").width()),$(window).resize(function(){this.resizeTO&&clearTimeout(this.resizeTO),this.resizeTO=setTimeout(function(){$(this).trigger("resizeEnd")},10)}),$(window).bind("resizeEnd",function(){$(".tile").height($("#tile1").width()),$(".carousel").height($("#tile1").width()),$(".item").height($("#tile1").width())})});var app=angular.module("scradioApp");app.filter("startFrom",function(){return function(a,b){return b=+b,a.slice(b)}});var app=angular.module("scradioApp");app.controller("MainCtrl",["$scope","$rootScope","$http",function(a,b,c){a.menu_toggled=!1,a.menuToggle=function(){a.menu_toggled=!a.menu_toggled},a.currentTrack=0,a.pageSize=5,a.data=[];var d=function(){b.$broadcast("audio.set","http://streaming.radio.co/s8ca94767c/listen",a.data[a.currentTrack],a.currentTrack,a.data.length)};b.$on("audio.next",function(){a.currentTrack++,a.currentTrack<a.data.length?d():a.currentTrack=a.data.length-1}),b.$on("audio.prev",function(){a.currentTrack--,a.currentTrack>=0?d():a.currentTrack=0})}]);var app=angular.module("scradioApp");app.controller("HomeCtrl",["$scope","$http","$rootScope",function(a,b,c){b.get("data/shows-list.json").then(function(b){a.tiles=b.data})}]);var app=angular.module("scradioApp");app.directive("audioPlayer",["$rootScope",function(a){return{restrict:"E",scope:{},controller:["$scope","$element",function(b,c){b.audio=new Audio,b.currentNum=0,b.radio=c.find(".radioplayer").radiocoPlayer(),b.next=function(){a.$broadcast("audio.next")},b.prev=function(){a.$broadcast("audio.prev")},console.log(b.radio),b.playPause=function(){console.log(b.radio),b.radio.isPlaying()?b.radio.pause():b.radio.play()},b.playpause=function(){b.audio.paused?b.audio.play():b.audio.pause()},b.audio.addEventListener("play",function(){a.$broadcast("audio.play",this)}),b.audio.addEventListener("pause",function(){a.$broadcast("audio.pause",this)}),b.audio.addEventListener("timeupdate",function(){a.$broadcast("audio.time",this)}),b.audio.addEventListener("ended",function(){a.$broadcast("audio.ended",this),b.next()}),a.$on("audio.set",function(a,c,d,e,f){var g=!b.audio.paused;b.audio.src=c;g?b.audio.play():b.audio.pause();b.info=d,b.currentNum=e,b.totalNum=f}),setInterval(function(){b.$apply()},500)}],templateUrl:"views/components/audio-player.html"}}]);var app=angular.module("scradioApp");app.directive("scrCarousel",["$rootScope","$http",function(a,b){return{restrict:"E",scope:{},controller:["$scope","$element","$interval",function(a,c,d){b.get("data/shows-list.json").then(function(b){a.slides=b.data}),a.slides=[],a.currentIndex=0,a.isCurrentSlideIndex=function(b){return a.currentIndex===b},a.direction="slide-right",a.next=function(){a.direction="slide-left",a.currentIndex=a.currentIndex>0?--a.currentIndex:a.slides.length-1},a.previous=function(){a.direction="slide-right",a.currentIndex=a.currentIndex<a.slides.length-1?++a.currentIndex:0};var e=d(function(){a.next()},4e3);a.startRotation=function(){e=d(function(){a.next()},4e3)},a.stopRotation=function(){e&&(d.cancel(e),e=void 0)},a.$on("$destroy",function(){e&&(d.cancel(e),e=void 0)})}],templateUrl:"views/components/carousel.html"}}]);var app=angular.module("scradioApp");app.directive("scrTiles",["$http",function(a){return{restrict:"E",scope:{data:"="},controller:["$scope","$element",function(a,b){}],templateUrl:"views/components/tiles.html"}}]),angular.module("scradioApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/components/audio-player.html",'<div class="form-inline"> <div class="form-group play-pause" ng-click="playPause()" ng-class="{paused:radio.isPlaying()}"> <div class="sr-only">Play/pause Button</div> <i class="fa fa-play play-text"></i> <i class="fa fa-pause pause-text"></i> </div> <div class="form-group vol-control col-xs-hidden"> <input min="0" max="100" step="5" type="range" ng-change="radio.volume(volume)" ng-model="volume" placeholder="volume"> </div> <div class="form-group meta-data marquee"> <span class="radioplayer" data-src="http://streaming.radio.co/s8ca94767c/listen" data-playbutton="false" data-volumeslider="false" data-elapsedtime="false" data-nowplaying="true" data-showplayer="false"> </span> </div> </div>'),a.put("views/components/carousel.html",'<div class="carousel-container" ng-swipe-left="next()" ng-swipe-right="previous()"> <!--Top Marquee for controls and info display--> <div class="carousel-controls col-xs-12"> <div class="previous" ng-click="previous()" ng-mouseover="stopRotation()" ng-mouseleave="startRotation()"> <div class="arrow"> <span class="icon-wrap"></span> </div> </div> <div class="next" ng-click="next()" ng-mouseover="stopRotation()" ng-mouseleave="startRotation()"> <div class="arrow"> <span class="icon-wrap"></span> </div> </div> </div> <div class="carousel-img-container"> <div class="bg-img" ng-class="direction" ng-repeat="slide in slides" ng-hide="!isCurrentSlideIndex($index)" style="background-image: url(\'{{slide.images[0]}}\')"></div> </div> <div class="info" ng-mouseover="stopRotation()" ng-mouseleave="startRotation()"> <div class="animated-slide" ng-class="direction" ng-hide="!isCurrentSlideIndex($index)" ng-repeat="slide in slides"> <h2>{{slide.name}}</h2> <h4>{{slide.category}}</h4> <p><span>{{slide.desc.en}}</span></p> <a ui-sref="pages({type:\'{{slide.category}}\', id:\'{{slide.id}}\')">Go! --></a> </div> </div> </div>'),a.put("views/components/tiles.html",'<div class="col-xs-6 col-sm-4" ng-repeat="item in data"></div>'),a.put("views/home.html",'<div class="row"> <scr-carousel></scr-carousel> <scr-tiles data="tiles"></scr-tiles> </div>')}]);