async function oi() {
	const validator = require('validator');

	async function validateAddress(addressStreet, addressCity, addressState, addressCountry, addressPostalCode) {
		const errors = [];

		if (!validator.isPostalCode(addressPostalCode, 'any')) {
			errors.push('fiomnfr');
		}

		if (addressCountry === 'Brazil') {
			try {
				const res = await fetch(`https://viacep.com.br/ws/${addressPostalCode}/json/`);
				const address = await res.json();
				if (
					address.logradouro !== addressStreet ||
					address.localidade !== addressCity ||
					address.uf !== addressState
				) {
					errors.push("Postal Code doesn't match");
				}
			} catch (err) {
				errors.push(err);
			}
		}
		return errors;
	}

	const erros = await validateAddress('Rua Doutr Vital Brasil', 'Santos', 'SP', 'Brazil', '11070190');

	console.log(erros);
}

oi();
