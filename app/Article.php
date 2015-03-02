<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model {

    protected $fillable = ['title', 'body', 'meta_data', 'meta_keywords', 'published_at', 'category_id'];

}
