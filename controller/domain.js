const whoiser = require('../whois/index.js');
exports.checkDomain = async (req, res) => {
    const { nama_domain } = req.query;
	const domainWhois = await whoiser(nama_domain, { follow: 1 })
	
	const firstDomainWhois = whoiser.firstResult(domainWhois)
	const firstTextLine = (firstDomainWhois.text[0] || '').toLowerCase()
 let available='unknown'

	if (firstTextLine.includes('reserved')) {
		available = 'reserved'
	} else if (firstDomainWhois['Domain Name'] && firstDomainWhois['Domain Name'].toLowerCase() === nama_domain) {
		available = 'registered'
	} else if (firstTextLine.includes(`no match for "${nama_domain}"`)) {
		available = 'available'
	}

	// console.log(`Domain "${nama_domain}" is "${available}"`)

	if (available === 'registered') {
		// console.log('Domain was registered on', firstDomainWhois['Created Date'], 'at', firstDomainWhois.Registrar)
		// console.log('Registration will expire on', firstDomainWhois['Expiry Date'])
		// console.log('Domain uses name servers:', firstDomainWhois['Name Server'])
	} else if (available === 'available') {
		// console.log('This domain is available for registration right now')
	}
    res.status(200).json({ status: available, domain : nama_domain});
};
