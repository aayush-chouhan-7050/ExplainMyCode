import { useEffect, useState } from "react";
import { getDebugHistory } from "../api";
import { formatDistanceToNow } from 'date-fns';
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuth } from "../context/AuthContext";

const DebugHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const itemsPerPage = 2;

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getDebugHistory();
        setHistory(data);
        setFiltered(data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const results = history.filter(
      (entry) =>
        (entry.code && entry.code.toLowerCase().includes(lowerQuery)) ||
        (entry.result?.explanation && 
          entry.result.explanation.toLowerCase().includes(lowerQuery)) ||
        (entry.language && entry.language.toLowerCase().includes(lowerQuery))
    );

    const sorted = [...results].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setFiltered(sorted);
    setPage(1);
  }, [searchQuery, history, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedItems = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (!user) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-4">
        Please login to view your debug history.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-2 md:p-6">
      <h4 className="text-2xl md:text-3xl font-bold text-gray-900">
        Debug History
      </h4>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search code, explanation, or language"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <div className="sm:w-40">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {paginatedItems.length > 0 ? (
        <>
          {paginatedItems.map((entry) => (
            <HistoryEntry key={entry._id} entry={entry} />
          ))}
          
          {filtered.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      page === num
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-4">
          {searchQuery ? 'No matching entries found' : 'Your debug history is empty'}
        </div>
      )}
    </div>
  );
};

const HistoryEntry = ({ entry }) => (
  <div className="bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow overflow-x-auto">
    <div className="p-3 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
        <span className="px-2 py-1 text-xs border border-indigo-500 text-indigo-600 rounded-full w-fit">
          {entry.language}
        </span>
        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
        </span>
      </div>
      
      <hr className="my-3 border-gray-200" />
      
      <h6 className="text-sm font-semibold text-gray-900 mb-2">
        Input Code:
      </h6>
      <div className="text-sm overflow-x-auto">
        <SyntaxHighlighter 
          language={entry.language?.toLowerCase() || 'javascript'} 
          style={materialLight}
          customStyle={{
            margin: 0,
            padding: '1em',
            fontSize: 'inherit',
            lineHeight: '1.3',
            borderRadius: '0.375rem'
          }}
        >
          {entry.code}
        </SyntaxHighlighter>
      </div>
      
      <h6 className="text-sm font-semibold text-gray-900 mb-2 mt-4">
        Fixed Code:
      </h6>
      <div className="text-sm overflow-x-auto">
        <SyntaxHighlighter 
          language={entry.language?.toLowerCase() || 'javascript'} 
          style={materialLight}
          customStyle={{
            margin: 0,
            padding: '1em',
            fontSize: 'inherit',
            lineHeight: '1.3',
            borderRadius: '0.375rem'
          }}
        >
          {entry.result?.fixed_code}
        </SyntaxHighlighter>
      </div>
      
      <h6 className="text-sm font-semibold text-gray-900 mb-2 mt-4">
        Explanation:
      </h6>
      <div className="whitespace-pre-wrap font-mono text-sm p-2 md:p-4 bg-gray-50 rounded-md overflow-x-auto">
        {entry.result?.explanation}
      </div>
    </div>
  </div>
);

export default DebugHistory;