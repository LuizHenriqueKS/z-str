interface IZStrSearch {
  string?: string;
  caseSensitive?: boolean;

  patterns?: string[] | string;
  patternsToIgnore?: string[];

  offset?: number | undefined;
};

export default IZStrSearch;
