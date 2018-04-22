
var Yike = angular.module('Yike',['ngRoute','Controllers','Directives']);
//配置路由
Yike.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/today',{
		templateUrl:'./views/today.html',
		controller:'todayController'
	})
	.when('/older',{
		templateUrl:'./views/older.html',
		controller:'olderController'
	})
	.when('/author',{
		templateUrl:'./views/author.html',
		controller:'authorController'
	})
	.when('/category',{
		templateUrl:'./views/category.html',
		controller:'categoryController'
	})
	.when('/favourite',{
		templateUrl:'./views/favourite.html',
		controller:'favouriteController'
	})
	.when('/settings',{
		templateUrl:'./views/setting.html'
		// controller:'settingController'
	})
	.otherwise({
		redirectTo:'/today'
	});
}]);
//运行块儿
Yike.run(['$rootScope',function($rootScope){
	$rootScope.collapsed = false;
	$rootScope.toggle = function(){
		$rootScope.collapsed = !$rootScope.collapsed;
		var navs = document.querySelectorAll('.navs dd');
		//展开
		if($rootScope.collapsed){
			for(var i=0;i<navs.length;i++){
				navs[i].style.transform = 'translate(0)';
				navs[i].style.transitionDelay ='0.2s';
				navs[i].style.transitionDuration = (i+1)*0.15+'s';
			}
		}else{
			//关闭
			var len = navs.length-1;
			for(var i=len;i>0;i--){
				navs[i].style.transform = 'translate(-100%)';
				navs[i].style.transitionDelay ='';
				navs[i].style.transitionDuration =(len-i)*0.15+'s';

			}
		}
	}
}]);