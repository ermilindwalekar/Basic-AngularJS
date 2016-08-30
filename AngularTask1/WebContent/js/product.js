var myModule = angular.module('productApplication', ['ngRoute']);

function productFactory(){
	var factoryObj={};
	factoryObj.products=[{id:1,name:"Chair",price:2000,quantity:15},{id:2,name:"Table",price:2500,quantity:10}];
	var id=3;
	factoryObj.add_product = function (name,quantity,price) {
        factoryObj.products.push({id: ++id,name:name,quantity:quantity,price:price});
    }
	
	factoryObj.delete_product = function (index) {
		factoryObj.products.splice(index, 1);
    }
	factoryObj.edit_product = function (index,$scope) {
		console.log(factoryObj.products[index].id);
		console.log(factoryObj.products[index].name);
		console.log(factoryObj.products[index].quantity);
		console.log(factoryObj.products[index].price);
	}
	factoryObj.update_product = function (id,name,quantity,price,index) {
		
		factoryObj.products[index]={id:id,name:name,quantity:quantity,price:price};
		console.log("-------------UPDATED-------------");
		console.log(factoryObj.products[index].id);
		console.log(factoryObj.products[index].name);
		console.log(factoryObj.products[index].quantity);
		console.log(factoryObj.products[index].price);
		
    }
	return factoryObj;
}
myModule.factory("ProductFactory",productFactory);

function productController($scope,ProductFactory) {
	$scope.products=ProductFactory.products;
	var index=-1;
	$scope.add= function() {
		
		ProductFactory.add_product($scope.name,$scope.quantity,$scope.price);
	}
	$scope.del= function(product) {
		index = $scope.products.indexOf(product);
		console.log(index);
		ProductFactory.delete_product(index);
	}
	$scope.edit= function(product) {
		index = $scope.products.indexOf(product);
		ProductFactory.edit_product(index);
		
	}
	$scope.update= function() {
		console.log("---------Grasp Value-------");
		console.log($scope.id);
		console.log($scope.name);
		console.log($scope.quantity);
		console.log($scope.price);
		
		ProductFactory.update_product($scope.id,$scope.name,$scope.quantity,$scope.price,index);
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
