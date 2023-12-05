import { rmdir } from 'fs';
import { join } from 'path';
export default function deleteFolder(productId: number) {
	rmdir(join(__dirname, '..', '..', 'public', `product-${productId}`), (err) => err && console.log(err));
}
