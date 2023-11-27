import { ResourceWithOptions } from "adminjs";
import { Product } from "../../models";
import { productResourceOptions } from "./product";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Product,
        options: productResourceOptions
    },
]