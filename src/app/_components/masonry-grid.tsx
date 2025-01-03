"use client";

import Masonry from "react-masonry-css";

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function MasonryGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex w-auto gap-6"
      columnClassName="masonry-grid_column"
    >
      {children}
    </Masonry>
  );
}
