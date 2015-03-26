<?php

use App\User;
use Illuminate\Http\Response as HttpResponse;

Route::any('/admin/', function()
{
	return File::get(public_path() . '/admin/angular.html');
});

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::get('aa', function(){ dd('d');});

Route::get('/set_pass', function(){
	$user =  App\User::first();
	$user->password = '123';
	$user->save();
	dd($user);

});

Route::group(array('prefix' => 'api'), function () {
	Route::get('pages', 'PagesController@index');
	Route::get('articles', 'ArticlesController@index');
});

Route::post('/admin/auth', function () {
	$credentials = Input::only('email', 'password');
	$token = JWTAuth::attempt($credentials);


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
