import { Loader2, CheckCircle } from "lucide-react";

const ImageUploadLoader = ({ progress, done }) => {
  return (
    <div className="w-full max-w-sm mx-auto mt-4 p-4 rounded-xl border bg-white shadow-md">
      <div className="flex items-center gap-3 mb-3">
        {!done ? (
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        ) : (
          <CheckCircle className="w-5 h-5 text-green-600" />
        )}

        <span className="font-semibold text-gray-700">
          {!done ? "Uploading images..." : "Upload completed"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            done ? "bg-green-500" : "bg-blue-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-2 text-right">
        {progress}%
      </p>
    </div>
  );
};

export default ImageUploadLoader;
