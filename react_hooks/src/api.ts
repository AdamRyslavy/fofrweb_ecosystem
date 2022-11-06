type Data = {
  page: number;
  size: number;
};

export const api = {
  async getData({ page, size }: Data) {
    return await (
      await fetch(
        `https://api.github.com/search/repositories?q=topic:reactjs&per_page=${size}&page=${page}`
      )
    ).json();
  },
};
