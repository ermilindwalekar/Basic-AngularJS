var myModule = angular.module('productApplication', ['ngRoute']);

function productController($rootrootScope) {
	$rootrootScope.products = [{id:1,name: 'Table',quantity:25,price:2000 },
	                       {id:2,name: 'Chair',quantity:50,price:8000 }];
	
	$rootrootScope.add_product = function() {
		$rootrootScope.products.push({id: $rootrootScope.id, name:$rootrootScope.name, quantity: $rootrootScope.quantity,price: $rootrootScope.price});
	}
	$rootScope.delete_product=function(product){
		 var index = $rootScope.products.indexOf(product);
		    $rootScope.products.splice(index, 1);
	}
	$rootrootScope.update_product = function(product) {
		var index = $rootrootScope.products.indexOf(product);
		console.log(index);
		//id:$rootScope.id=product[index].id;
		//id:$rootScope.name=product[index].name;
		
		//$rootrootScope.products.splice(index, 1);
		//$rootrootScope.product[index].push({id: $rootrootScope.id, name:$rootrootScope.name, quantity: $rootrootScope.quantity,price: $rootrootScope.price});
	}
}
	
myModule.controller('ProductController', productController);

myModule.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'ProductController',
			templateUrl: 'show_product.html'
		})
		.when('/editProducts', {
			controller: 'ProductController',
			templateUrl: 'edit_product.html'
		})
		.otherwise({redirectTo: '/'})
});
