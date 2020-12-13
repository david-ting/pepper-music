import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { searchFunc } from "../customFunc/fetchData";

export interface Page {
  currentPage: number;
  totalPages: number;
  path: string;
}

const useSearch = (
  searchType: string
): [
  q: string | null,
  results: {
    items: unknown[];
  } | null,
  pageData: Page | null,
  loading: boolean
] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<{ items: unknown[] } | null>(null);
  const location = useLocation();
  const search = location.search;
  const searchObj = new URLSearchParams(search);
  const q = searchObj.get("q");
  const p = searchObj.get("p");
  const { user } = useContext(UserContext);
  const [pageData, setPageData] = useState<Page | null>(null);

  useEffect(() => {
    setLoading(true);
  }, [searchType]);

  useEffect(() => {
    let page: number | null = null;

    if (p !== null) {
      page = parseInt(p);
    }

    if (q !== null && page !== null && !isNaN(page) && user.loggedIn) {
      (async () => {
        try {
          const data = await searchFunc(q, searchType, page);
          setPageData({
            totalPages: Math.min(20, Math.ceil(data.total / 20)),
            currentPage: page,
            path: `/search/${encodeURIComponent(
              searchType
            )}?q=${encodeURIComponent(q)}&p=`,
          });
          setLoading(false);
          setResults(data);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [p, q, searchType, user]);

  return [q, results, pageData, loading];
};

export default useSearch;
