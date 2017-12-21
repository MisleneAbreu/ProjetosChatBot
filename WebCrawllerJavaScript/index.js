"use strict";

let MessagingHub = require('messaginghub-client');
let WebSocketTransport = require('lime-transport-websocket');
let Lime = require('lime-js');

let client = new MessagingHub.ClientBuilder()
    .withIdentifier('sdkteste')
    .withAccessKey('cTVFYjhkOVlwTXk3T0lMUzA5dnY=')
    .withTransportFactory(() => new WebSocketTransport())
    .build();

client.connect()
    .then(() => {

        console.log('BOT CONNECTADO!');

// crawller

var Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		Crawler.fs      = require('fs');
		Crawler.getMovies();
	},
	getMovies: function(){
		Crawler.request('http://www.imdb.com/chart/moviemeter', function(err, res, body){
			if(err)
				console.log('Error: ' + err);
			var $ = Crawler.cheerio.load(body);
			$('.lister-list tr').each(function(){
				var title  = $(this).find('.titleColumn a').text().trim();
				var rating = $(this).find('.imdbRating strong').text().trim();
				console.log(title + ' - ' + rating);
				Crawler.fs.appendFile('imdb.txt', title + ' - ' + rating + '\n');
			});
		});
	}
};
Crawler.init();

