import { client } from "@/app/lib/sanity";
import { fullBlog } from "@/app/lib/interface";

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
    <div>
      <h1>
        <span className="block text-base text-center text-primary">
          Vasilisthh Blog
        </span>
        <span></span>
      </h1>
    </div>
  );
}
