"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import Docinput from "@/components/ui/docinput"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Upload() {
  const [userChoice, setUserChoice] = useState<string | null>()
  const [encrypted, setEncrypted] = useState<boolean>()
  const [nonEncrypted, setNonEncrypted] = useState<boolean>()
  const [uploadVisible, setUploadVisible] = useState<boolean>(false)
  const [selectedDocs, setSelectedDocs] = useState<File[]>([])
  const [signedStatus, setSignedStatus] = useState<boolean>(true)

  function handleStorageChoice(isEncrypted: boolean) {
    setUploadVisible(true)
    setEncrypted(isEncrypted)
    setNonEncrypted(!isEncrypted)
  }

  return selectedDocs.length === 0 ? (
    <>
      <div className="flex items-center justify-center text-2xl font-semibold">
        <h1>Upload your files permanently</h1>
      </div>

      <div className="flex items-center justify-center mt-24 gap-20">
        <button
          onClick={() => handleStorageChoice(true)}
          className={`${
            encrypted
              ? "bg-zinc-800 text-white "
              : "bg-transparent hover:bg-blue-500"
          } bg-transparent transition-all hover:bg-zinc-800 font-semibold hover:text-white py-5 px-20 border hover:border-transparent rounded`}
        >
          Encrypted
        </button>
        <button
          onClick={() => handleStorageChoice(false)}
          className={`${
            nonEncrypted
              ? "bg-zinc-800 text-white "
              : "bg-transparent hover:bg-blue-500"
          } bg-transparent transition-all hover:bg-zinc-800 font-semibold hover:text-white py-5 px-20 border hover:border-transparent rounded`}
        >
          Non-Encrypted
        </button>
      </div>
      {uploadVisible && (
        <div className=" flex items-center justify-center h-5/6 -mt-20">
          <div className="max-w-screen-xl w-96">
            <Docinput
              selectedDocs={selectedDocs}
              setSelectedDocs={setSelectedDocs}
            />
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="flex w-full flex-row">
      <div className="w-full">
        <DocViewer
          documents={selectedDocs.map((file) => ({
            uri: window.URL.createObjectURL(file),
            fileName: file.name,
          }))}
          config={{
            header: {
              disableHeader: true,
              disableFileName: false,
              retainURLParams: false,
            },
            csvDelimiter: ",", // "," as default,
            pdfZoom: {
              defaultZoom: 0.7, // 1 as default,
              zoomJump: 0.8, // 0.1 as default,
            },
            pdfVerticalScrollByDefault: true, // false as default
          }}
          pluginRenderers={DocViewerRenderers}
        />
      </div>
      <div className="bg-slate-50" style={{ width: 500 }}>
        <div className="flex justify-center text-center mt-10">
          <div className="bg-green-300 w-52 rounded-md">
            {signedStatus
              ? "Document is signed"
              : "Document has not been signed"}
          </div>
        </div>
        <div className="mt-10 ml-8 mr-8 h-14">
          <Tabs defaultValue="account" className="w-[400px] jus">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recipients">Recipients</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="recipients">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="history">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
