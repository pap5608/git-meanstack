var db = require('../../db')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect

describe('making a post', function() {
	it('logs in and creates a new post',function() {
		browser.get('http://localhost:3001')
		element(by.css('nav .login')).click()

		element(by.model('username')).sendKeys('jinsan')
		element(by.model('password')).sendKeys('jinsan')
		element(by.css('form .btn')).click()

		
		var post = 'my new post' + Math.random()
		element(by.model('postBody')).sendKeys(post)
		element(by.css('form .btn')).click()
		element.all(by.css('ul.list-group li')).first().getText().then(function (text){
			expect(text).to.contain(post)
		})
		
	})
	afterEach(function() {
		
	})
})