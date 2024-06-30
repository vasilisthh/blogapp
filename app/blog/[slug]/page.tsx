import { client, urlFor } from "@/app/lib/sanity";
import { fullBlog } from "@/app/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}']{
      'currentSlug': slug.current,
      title,
      content,
      titleImage
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const fullBlog = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Vasilisthh Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {fullBlog.title}
        </span>
      </h1>

      <Image
        src={urlFor(fullBlog.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-a:text-primary prose-headings:text-3xl border border-gray-300 dark:border-gray-700 rounded-lg p-2">
        <div className="-mt-10">
          <PortableText value={fullBlog.content} />
        </div>
      </div>
    </div>
  );
}
