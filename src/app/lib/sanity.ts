import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "76u5sdap",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: true,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

