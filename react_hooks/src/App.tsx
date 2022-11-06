import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { api } from "./api";
import { Skeleton } from "./Skeleton";

function App() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const size = 20;
  const {
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(
    ["inf", `getData`],
    ({ pageParam = 1 }) => api.getData({ page: pageParam, size }),
    {
      getNextPageParam: (lastPage, pages) => {
        const maxPage = lastPage.total_count / size;
        const nextPage = pages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [data]);
  const flatData = data?.pages.flatMap((page) => page.items);
  if (!flatData?.length || isLoading || !flatData[0]) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <>
      <div className="App">
        {flatData.map((page) => (
          <div key={page.id}>
            <h2>{page.full_name}</h2>
            <p>{page.description}</p>
          </div>
        ))}
      </div>
      {isFetchingNextPage && <Skeleton />}
      <div className="loaderRef" ref={nodeRef}></div>
    </>
  );
}

export default App;
