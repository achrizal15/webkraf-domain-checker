const whoiser = require('../index.js');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const domainName = 'webkraf.com'

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(domainName);
  });
  
  server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	(async () => {
		//isi nama domain disini
	
	
		// retrieve WHOIS info from Registrar WHOIS servers
		const domainWhois = await whoiser(domainName, { follow: 1 })
	
		const firstDomainWhois = whoiser.firstResult(domainWhois)
		const firstTextLine = (firstDomainWhois.text[0] || '').toLowerCase()
	
		let domainAvailability = 'unknown'
	
		if (firstTextLine.includes('reserved')) {
			domainAvailability = 'reserved'
		} else if (firstDomainWhois['Domain Name'] && firstDomainWhois['Domain Name'].toLowerCase() === domainName) {
			domainAvailability = 'registered'
		} else if (firstTextLine.includes(`no match for "${domainName}"`)) {
			domainAvailability = 'available'
		}
	
		console.log(`Domain "${domainName}" is "${domainAvailability}"`)
	
		if (domainAvailability === 'registered') {
			console.log('Domain was registered on', firstDomainWhois['Created Date'], 'at', firstDomainWhois.Registrar)
			console.log('Registration will expire on', firstDomainWhois['Expiry Date'])
			console.log('Domain uses name servers:', firstDomainWhois['Name Server'])
		} else if (domainAvailability === 'available') {
			console.log('This domain is available for registration right now')
		}
	
	})();
});



/* Result for domainName = 'google.com'

Domain "google.com" is "registered"
Domain was registered on 1997-09-15T04:00:00Z at MarkMonitor Inc.
Registration will expire on 2028-09-14T04:00:00Z
Domain uses name servers: [
  'NS1.GOOGLE.COM',
  'NS2.GOOGLE.COM',
  'NS3.GOOGLE.COM',
  'NS4.GOOGLE.COM'
]
*/

/* Result for domainName = 'an-available-domain.com'

Domain "an-available-domain.com" is "available"
This domain is available for registration right now
*/
