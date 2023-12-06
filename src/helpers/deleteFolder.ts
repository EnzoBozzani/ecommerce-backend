import { rmSync } from 'fs';
import { join } from 'path';

export default function deleteFolder(productId: number) {
	rmSync(join(__dirname, '..', '..', 'public', `product-${productId}`), { recursive: true, force: true });
}
