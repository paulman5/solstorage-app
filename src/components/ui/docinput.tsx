import React from "react"
import { FileUp } from "lucide-react"
import { url } from "inspector"
import { uploadProps } from "@/lib/types/types"

export default function Docinput({ setSelectedDocs }: uploadProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FileUp
            className="h-12 w-12 border-0"
            strokeWidth={0.7}
            fill="url(#gradient)"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "rgba(43,82,222,1)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgba(79,195,232,1)", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>{" "}
          </FileUp>
          <p className="mb-2 mt-5 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold mt-10">Click to upload</span> or drag
            and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Only PDF, DOC/X, JPG, ZIP files smaller than 1GB
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(el) =>
            el.target.files?.length &&
            setSelectedDocs(Array.from(el.target.files))
          }
        />
      </label>
    </div>
  )
}
