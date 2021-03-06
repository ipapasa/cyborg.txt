var robots = require('..');
require('chai').should();

describe('build', function() {

	it('builds a robots.txt', function() {

		var expected = [
			'User-agent: nsa',
			'Disallow: /',
			'',
			'User-agent: coolbot',
			'Disallow: /secret_codes.txt',
			'Disallow: /cool_burrito_photo.jpg',
			'',
			'User-agent: everythingbot',
			'Disallow:',
			'',
			'User-agent: *',
			'Disallow: /robocop_copyright_info'
		].join('\n');

		var actual = robots.build({
			'nsa': ['/'],
			'*': ['robocop_copyright_info'],
			'coolbot': [
				'/secret_codes.txt',
				'cool_burrito_photo.jpg'
			],
			'everythingbot': []
		});

		actual.should.eql(expected);

	});

	it('builds an empty robots.txt', function() {
		var expected = [
			'User-agent: *',
			'Disallow:'
		].join('\n');
		robots.build().should.eql(expected);
		robots.build({}).should.eql(expected);
	});

});
