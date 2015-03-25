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

Route::get('aa', function(){ dd('d');});

Route::group(array('prefix' => 'api'), function () {
	Route::get('pages', 'PagesController@index');
	Route::get('articles', 'ArticlesController@index');
});

Route::post('/admin/auth', function () {
	$credentials = Input::only('email', 'password');

	if ( ! $token = JWTAuth::attempt($credentials)) {
		return Response::json(false, HttpResponse::HTTP_UNAUTHORIZED);
	}

	return Response::json(compact('token'));
});

Route::get('/admin/restricted', [
	'before' => 'jwt-auth',
	function () {
		$token = JWTAuth::getToken();
		$user = JWTAuth::toUser($token);

		return Response::json([
			'data' => [
				'email' => $user->email,
				'registered_at' => $user->created_at->toDateTimeString()
			]
		]);
	}
]);

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
