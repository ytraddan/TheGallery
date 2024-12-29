import { db } from "~/server/db";

export const dynamic = "force-dynamic";

/* eslint-disable @next/next/no-img-element */
const mockUrls = [
  "https://utfs.io/f/Sf47aEru3JHDCsic8VtVIXgxAWfaoTntewBEZs54b3cqlijp",
  "https://utfs.io/f/Sf47aEru3JHDClpdYrtVIXgxAWfaoTntewBEZs54b3cqlijp",
  "https://utfs.io/f/Sf47aEru3JHDBcrW0Xxx5rXK2YLT84H0yGopAzPOCj1vmUhE",
  "https://utfs.io/f/Sf47aEru3JHDNKeLAOICJutme4yKMo0gnGp9cLrwiNFQfR1B",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={index} className="w-1/6">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
