"use strict";var app=angular.module("scradioApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngSanitize","ngTouch","ui.bootstrap","ui.router"]);app.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("home",{url:"/",templateUrl:"views/home.html",controller:"HomeCtrl"}),b.otherwise("/")}]);var app=angular.module("scradioApp");app.filter("startFrom",function(){return function(a,b){return b=+b,a.slice(b)}});var app=angular.module("scradioApp");app.controller("MainCtrl",["$scope","$rootScope","$http",function(a,b,c){a.menu_toggled=!1,a.menuToggle=function(){a.menu_toggled=!a.menu_toggled},a.currentTrack=0,a.pageSize=5,a.data=[];var d=function(){b.$broadcast("audio.set","http://streaming.radio.co/s8ca94767c/listen",a.data[a.currentTrack],a.currentTrack,a.data.length)};b.$on("audio.next",function(){a.currentTrack++,a.currentTrack<a.data.length?d():a.currentTrack=a.data.length-1}),b.$on("audio.prev",function(){a.currentTrack--,a.currentTrack>=0?d():a.currentTrack=0})}]);var app=angular.module("scradioApp");app.controller("HomeCtrl",["$scope","$http","$rootScope",function(a,b,c){}]);var app=angular.module("scradioApp");app.directive("audioPlayer",["$rootScope",function(a){return{restrict:"E",scope:{},controller:["$scope","$element",function(b,c){b.audio=new Audio,b.currentNum=0,b.radio=c.find(".radioplayer").radiocoPlayer(),b.next=function(){a.$broadcast("audio.next")},b.prev=function(){a.$broadcast("audio.prev")},console.log(b.radio),b.playPause=function(){console.log(b.radio),b.radio.isPlaying()?b.radio.pause():b.radio.play()},b.playpause=function(){b.audio.paused?b.audio.play():b.audio.pause()},b.audio.addEventListener("play",function(){a.$broadcast("audio.play",this)}),b.audio.addEventListener("pause",function(){a.$broadcast("audio.pause",this)}),b.audio.addEventListener("timeupdate",function(){a.$broadcast("audio.time",this)}),b.audio.addEventListener("ended",function(){a.$broadcast("audio.ended",this),b.next()}),a.$on("audio.set",function(a,c,d,e,f){var g=!b.audio.paused;b.audio.src=c;g?b.audio.play():b.audio.pause();b.info=d,b.currentNum=e,b.totalNum=f}),setInterval(function(){b.$apply()},500)}],templateUrl:"views/components/audio-player.html"}}]);var app=angular.module("scradioApp");app.directive("scrCarousel",["$rootScope",function(a){return{restrict:"E",scope:{},controller:["$scope","$element",function(a,b){var c=a.slides=[];a.addSlide=function(){var a=600+c.length+1;c.push({image:"//placekitten.com/"+a+"/300",text:["More","Extra","Lots of","Surplus"][c.length%4]+" "+["Cats","Kittys","Felines","Cutes"][c.length%4]})};for(var d=0;4>d;d++)a.addSlide();a.currentIndex=0,a.isCurrentSlideIndex=function(b){return a.currentIndex===b},a.previous=function(){a.currentIndex=a.currentIndex<a.slides.length-1?++a.currentIndex:0},a.next=function(){a.currentIndex=a.currentIndex>0?--a.currentIndex:a.slides.length-1}}],templateUrl:"views/components/carousel.html"}}]),angular.module("scradioApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/components/audio-player.html",'<div class="form-inline"> <div class="form-group play-pause" ng-click="playPause()" ng-class="{paused:radio.isPlaying()}"> <div class="sr-only">Play/pause Button</div> <i class="fa fa-play play-text"></i> <i class="fa fa-pause pause-text"></i> </div> <div class="form-group vol-control"> <input min="0" max="100" step="5" type="range" ng-change="radio.volume(volume)" ng-model="volume" placeholder="volume"> </div> <div class="form-group meta-data marquee"> <span class="radioplayer" data-src="http://streaming.radio.co/s8ca94767c/listen" data-playbutton="false" data-volumeslider="false" data-elapsedtime="false" data-nowplaying="true" data-showplayer="false"> </span> </div> <div class="form-group"> {{radio.getStreamState()}} </div> </div>'),a.put("views/components/carousel.html",'<div class="carousel-container"> <!--Top Marquee for controls and info display --> <div class="carousel-controls"> <div class="previous col-xs-1" ng-click="previous()"> <i class="fa fa-chevron-left fa-4x"></i> </div> <div class="info col-xs-10"> <div ui-sref="#/" ng-hide="!isCurrentSlideIndex($index)" ng-repeat="slide in slides"> <h2>The Berg</h2> <p><span>{{slide.text}}</span></p> </div> </div> <div class="next col-xs-1" ng-click="next()"> <i class="fa fa-chevron-right fa-4x pull-right"></i> </div> </div> <div class="carousel-img-container"> <div ng-repeat="slide in slides" ng-hide="!isCurrentSlideIndex($index)" class="bg-img" style="background-image: url({{slide.image}})"> </div> </div> </div>'),a.put("views/home.html",'<div class="row"> <scr-carousel></scr-carousel> </div>')}]);