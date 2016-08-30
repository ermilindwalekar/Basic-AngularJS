var myModule = angular.module('productApplication', ['ngRoute']);
function productFactory(){
	var factoryObj={};

	var index=-1;
	factoryObj.products=[{id:1,name:"Chair",price:2000,quantity:15},{id:2,name:"Table",price:2500,quantity:10}];
	var id=3;
	factoryObj.add_product = function (name,quantity,price) {
        factoryObj.products.push({id: ++id,name:name,quantity:quantity,price:price});
    }
	
	factoryObj.delete_product = function (index) {
		factoryObj.products.splice(index, 1);
    }
	factoryObj.update_product = function (id,name,quantity,price) {
		var index=0;
		for(var j=0;j< factoryObj.products.length ;j++)
		{
			if(factoryObj.products[j].id == id)
			{
				index=j;
				factoryObj.products[index]={name:name,quantity:quantity,price:price};
				console.log("-------------UPDATED-------------");
				console.log(factoryObj.products[index].id);
				console.log(factoryObj.products[index].name);
				console.log(factoryObj.products[index].quantity);
				console.log(factoryObj.products[index].price);
				break;
			}
		}
			
    }
	return factoryObj;
}
myModule.factory("ProductFactory",productFactory);

function productController($scope,ProductFactory,$location) {
	$scope.products=ProductFactory.products;

	$scope.add= function() {
		
		ProductFactory.add_product($scope.name,$scope.quantity,$scope.price);
	}
	$scope.del= function(product) {
		var index = $scope.products.indexOf(product);
		ProductFactory.delete_product(index);
	}
	$scope.edit= function(product) {
		var index = $scope.products.indexOf(product);
		$location.path('/edit_product/' + product.id+"/" +product.name+"/"+product.quantity+"/"+product.price);
		
	}
	$scope.update= function() {
		
		ProductFactory.update_product($scope.id,$scope.name,$scope.quantity,$scope.price);
	}
	
}
myModule.controller('ProductController', productController);

myModule.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'ProductController',
			templateUrl: 'show_product.html'
		})
		.when("/edit_product/:id/:name/:quantity/:price", {
			controller: function($scope, ProductFactory, $routeParams) {
				$scope.id = $routeParams.id;
				$scope.name = $routeParams.name;
				$scope.quantity = $routeParams.quantity;
				$scope.price = $routeParams.price;
				
			},
			templateUrl: 'edit_product.html'
		})
		.otherwise({redirectTo: '/'})
});
