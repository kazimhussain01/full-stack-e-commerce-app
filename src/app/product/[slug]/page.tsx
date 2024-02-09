import { client } from "@/app/lib/sanity"
import ImageGallery from "@/app/components/ImageGallery"
import { fullProduct } from "@/interface";

import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import AddToBag from "@/app/components/AddToBag";

async function getData(slug: string) {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
          image,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_idx
      }`;

    const data = await client.fetch(query);

    return data;
}

export default async function ProductPge({
    params,
}: {
    params: { slug: string };
}) {
    const data: fullProduct = await getData(params.slug);


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery images={data.image} />

                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">

                            {/* Category Name */}
                            <span className="mb-0.5 inline-block text-gray-500">
                                {data.categoryName}
                            </span>

                            {/* Product Name */}
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl font-poppins">
                                {data.name}
                            </h2>

                            {/* Star Ratting Button */}
                            <div className="mb-6 flex items-center gap-3 md:mb-10">
                                <Button className="rounded-full gap-x-2">
                                    <span className="text-sm">4.2</span>
                                    <Star className="h-5 w-5" />
                                </Button>

                                <span className="text-sm font-poppins text-gray-500 transition duration-100">
                                    56 Rating
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-poppins font-bold text-gray-800 md:text-2xl">
                                        ${data.price}
                                    </span>
                                    <span className="mb-0.5 text-red-500 line-through">
                                        ${data.price + 30}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500 font-poppins">
                                    Incl. Vat Plus Shipping
                                </span>
                            </div>

                            {/* Shipping Days Add */}
                            <div className="mb-6 flex items-center gap-2 text-gray-500">
                                <Truck className="h-6 w-6" />
                                <span className="text-sm font-poppins">2-4 Day Shipping</span>
                            </div>

                            {/* Add to Bag Button */}
                            <div className="flex gap-2.5">
                                <AddToBag 
                                    currency="USD" 
                                    name={data.name} 
                                    description={data.description}
                                    image={data.image[0]} 
                                    price={data.price} 
                                    key={data._id}
                                    price_id={data.price_id}
                                />
                                <Button variant={"secondary"}>Checkout Now</Button>
                            </div>

                            {/* Description */}
                            <p className="mt-12 text-base text-gray-500 tracking-wide">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}