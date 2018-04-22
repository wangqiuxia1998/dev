
//控制器模块
angular.module('Controllers',[])
.controller('NavController', ['$scope', function($scope){
	$scope.navs = [
	{link:'#/today',icon:'icon-home' ,text:'今日一刻'},
	{link:'#/older' ,icon:'icon-file-empty' ,text:'往期内容'},
	{link: '#/author', text: '热门作者', icon: 'icon-pencil'},
	{link: '#/category', text: '栏目浏览', icon: 'icon-menu'},
	{link: '#/favourite', text: '我的喜欢', icon: 'icon-heart'},
	{link: '#/settings', text: '设置', icon: 'icon-cog'}
	]
}])
.controller('todayController',['$scope','$rootScope','$http','$filter',function($scope,$rootScope,$http,$filter){
	var today = $filter('date')(new Date,'yyyy-MM-dd');
	$rootScope.loaded = false;
	$rootScope.title = '今日一刻';
	$rootScope.index = 0;
	$http({
		url:'./api/today.php',
		params:{today:today}
	}).success(function(info){
		$rootScope.loaded = true;
		$scope.date = info.date;
		$scope.posts = info.posts;
	})
}])
.controller('olderController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.loaded = false;
	$rootScope.title = '今日一刻';
	$rootScope.index = 1;
	$http({
		url:'./api/older.php'
	}).success(function(info){
		$rootScope.loaded = true;
		$scope.posts = info.posts;
		$scope.date = info.date;
	})

}])
.controller('authorController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.loaded = false;
	$rootScope.index = 2;
	$rootScope.title = '热门作者';
	$http({
		url:'./api/author.php'
	}).success(function(info){
		$rootScope.loaded = true;
		$scope.all = info.all;
		$scope.rec = info.rec;
	})
}])
.controller('categoryController',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
	$rootScope.loaded = false;
	$rootScope.index = 3;
	$http({
		url:'./api/column.php'
	}).success(function(info){
		$rootScope.loaded = true;
		$scope.columns = info;
	})
}])
.controller('favouriteController',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
	$rootScope.loaded = false;
	$rootScope.index = 4;
	$http({
		url:'./api/favourite.php'
	}).success(function(info){
		$rootScope.loaded = true;
		// console.log(info);
		$scope.posts = info.posts;
		$scope.column = info.column;


	})
}])
