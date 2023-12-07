import validator from 'validator';

export default async function validateAddress(
	addressStreet: string,
	addressCity: string,
	addressState: string,
	addressCountry: string,
	addressPostalCode: string
) {
	const errors = [];
	if (!validator.isLength(addressStreet, { min: 1 })) {
		errors.push('Street.');
	}

	if (!validator.isLength(addressCity, { min: 1 })) {
		errors.push('City.');
	}

	if (!validator.isLength(addressState, { min: 1 })) {
		errors.push('State.');
	}

	if (!validator.isPostalCode(addressPostalCode, 'any')) {
		errors.push('Postal Code.');
	}

	if (!validator.isLength(addressCountry, { min: 1 })) {
		errors.push('Country.');
	}

	if (addressCountry === 'Brazil') {
		try {
			const res = await fetch(`https://viacep.com.br/ws/${addressPostalCode}/json/`);
			const address = await res.json();
		} catch (err) {}
	}

	return errors;
}
