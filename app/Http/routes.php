<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::group(array('prefix' => 'api'), function () {
	Route::get('pages', 'PagesController@index');
	Route::get('articles', 'ArticlesController@index');
});

Route::group(array('prefix' => 'admin'), function () {
	Route::any('{path?}', function()
	{
		return File::get(public_path() . '/admin/angular.html');
	})->where("path", ".+");
});

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::any('{path?}', function()
{
	return File::get(public_path() . '/angular.html');
})->where("path", ".+");
