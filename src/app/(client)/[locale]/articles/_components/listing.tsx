"use client";

import { ArticleTeaser } from "@/components/documents/article-teasers";
import { TypographyH1 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Listing({ items }: { items: ArticleTeaserType[] }) {
  const [search, setSearch] = useState("");
  const t = useTranslations("ArticlesListingPage");

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <TypographyH1 className="text-center md:text-start">
          {t("title")}
        </TypographyH1>
        <div>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search-placeholder")}
          />
        </div>
      </div>
      <ul className="mx-auto mb-12 mt-9 grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((article) => (
          <li key={article._id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
    </>
  );
}
