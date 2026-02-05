import React, { useState } from "react";
import useCaptures from "@/hooks/useCaptures";
import useSecureAxios from "@/hooks/useSecureAxios";
import {
  FiTrash2,
  FiDownload,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi"; // Icon-er jonno (npm install react-icons)

export default function Overview() {
  const [captures, refetch, isLoading] = useCaptures();
  const secureAxios = useSecureAxios();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortOrder, setSortOrder] = useState("new");

  // --- Logic Part ---

  // Single Item Select/Deselect Logic
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Select All / Deselect All Logic
  const handleSelectAll = () => {
    if (selectedIds.length === captures.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(captures.map((item) => item._id));
    }
  };

  // Single Download Logic
  const handleDownload = (base64Image, fileName) => {
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = `captured_${fileName || "moment"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Selected Download Logic
  const handleDownloadSelected = () => {
    const selectedItems = captures.filter((item) =>
      selectedIds.includes(item._id),
    );
    selectedItems.forEach((item, index) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = item.image;
        link.download = `captured_${item.userEmail || "moment"}_${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 300);
    });
  };

  const handleDelete = async (ids) => {
    if (!window.confirm(`আপনি কি নিশ্চিত? ${ids.length}টি ছবি মুছে ফেলা হবে!`))
      return;
    try {
      const res = await secureAxios.delete("/admin/delete-captures", {
        data: { ids },
      });
      if (res.data.deletedCount > 0) {
        setSelectedIds([]);
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sortedCaptures = [...captures].sort((a, b) => {
    const parseDateTime = (str) => {
      // Expected format: "YYYY-MM-DD, HH:MM:SS"
      if (!str) return 0;
      const [datePart, timePart] = str.split(",");
      return new Date(`${datePart.trim()} ${timePart?.trim()}`).getTime();
    };

    const timeA = parseDateTime(a.capturedAt);
    const timeB = parseDateTime(b.capturedAt);

    if (sortOrder === "new") {
      return timeB - timeA; // Newest first (by full time)
    } else {
      return timeA - timeB; // Oldest first
    }
  });

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-medium text-gray-500 italic">
          ছবিগুলো সাজানো হচ্ছে...
        </p>
      </div>
    );

  return (
    <div className="p-2 md:p-4 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              📸 Captured <span className="text-pink-500">Moments</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              মোট সংরক্ষিত ছবি: {captures.length}টি
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Select All / Unselect All Button */}
            {captures.length > 0 && (
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-all border border-gray-200"
              >
                <FiCheckCircle className={isLoading ? "animate-spin" : ""} />
                {selectedIds.length === captures.length
                  ? "Unselect All"
                  : "Select All"}
              </button>
            )}

            {/* Download Button */}
            {selectedIds.length > 0 && (
              <button
                onClick={handleDownloadSelected}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-all border border-blue-200"
              >
                <FiDownload className={isLoading ? "animate-spin" : ""} />{" "}
                Download ({selectedIds.length})
              </button>
            )}

            {/* Delete Button */}
            {selectedIds.length > 0 && (
              <button
                onClick={() => handleDelete(selectedIds)}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all border border-rose-200"
              >
                <FiTrash2 /> Delete ({selectedIds.length})
              </button>
            )}

            {/* Refresh Button */}
            <button
              onClick={() => refetch()}
              className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all border border-gray-200"
              title="Refresh Data"
            >
              <FiRefreshCw className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* --- Grid Section --- */}
        {captures.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="text-6xl mb-4 text-gray-200">🏜️</div>
            <p className="text-gray-400 font-medium">
              এখনও কোনো স্মৃতি ধরা পড়েনি!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* Sort Button */}
            <div className="flex justify-end items-end">
              <button
                onClick={() =>
                  setSortOrder((prev) => (prev === "new" ? "old" : "new"))
                }
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-50 text-purple-600 rounded-xl font-bold hover:bg-purple-100 transition-all border border-purple-200"
              >
                {sortOrder === "new" ? "Newest First" : "Oldest First"}
              </button>
            </div>

            {/* Captures Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedCaptures?.map((item) => (
                <div
                  key={item._id}
                  className={`relative group bg-white rounded-[2rem] shadow-sm border-2 transition-all duration-300 overflow-hidden ${
                    selectedIds.includes(item._id)
                      ? "border-pink-500 scale-[0.98]"
                      : "border-white hover:shadow-2xl hover:shadow-pink-100"
                  }`}
                >
                  {/* Checkbox Overlay */}
                  <div
                    onClick={() => handleSelect(item._id)}
                    className={`absolute top-4 left-4 z-20 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                      selectedIds.includes(item._id)
                        ? "bg-pink-500 border-pink-500 text-white"
                        : "bg-black/20 border-white text-transparent"
                    }`}
                  >
                    <FiCheckCircle size={16} />
                  </div>

                  {/* Action Buttons (Hover) */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleDownload(item.image, item.userEmail)}
                      className="p-3 bg-white/90 backdrop-blur-md text-blue-600 rounded-2xl shadow-lg hover:bg-blue-600 hover:text-white transition-all"
                      title="Download Image"
                    >
                      <FiDownload size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete([item._id])}
                      className="p-3 bg-white/90 backdrop-blur-md text-rose-600 rounded-2xl shadow-lg hover:bg-rose-600 hover:text-white transition-all"
                      title="Delete Image"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                      src={item?.image}
                      alt="Capture"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info Card */}
                  <div className="p-5">
                    <h4
                      className="text-sm font-bold text-gray-800 truncate"
                      title={item.userEmail}
                    >
                      {item.userEmail}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        {item.capturedAt.split(",")[0]}
                      </span>
                      <span className="text-[10px] text-pink-400 font-bold">
                        {item.capturedAt.split(",")[1]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
