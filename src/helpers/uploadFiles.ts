import fs from 'fs';
import path from 'path';

export default function uploadFiles(files: any[], id: number) {
	if (!fs.existsSync(path.join(__dirname, '..', '..', 'public', `product-${id}`))) {
		fs.mkdir(path.join(__dirname, '..', '..', 'public', `product-${id}`), (err) => {
			if (err) {
				console.error(err);
			}
		});
	}
	for (let i = 0; i < 3; i++) {
		if (files[i]) {
			fs.writeFile(
				path.resolve(__dirname, '..', '..', 'public', `product-${id}`, `image${i + 1}.png`),
				files[i]!.buffer,
				'binary',
				(err) => {
					if (err) {
						console.log(err);
					}
				}
			);
		}
	}
}
