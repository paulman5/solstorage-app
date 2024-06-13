"use client"

import React, { useState } from "react"
import Signedpng from "../../../lib/images/signed.png"
import { Input } from "@/components/ui/input"
import Docinput from "@/components/ui/docinput"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PDFDocument, rgb } from "pdf-lib"

export default function Upload() {
  const [userChoice, setUserChoice] = useState<string | null>()
  const [encrypted, setEncrypted] = useState<boolean>()
  const [nonEncrypted, setNonEncrypted] = useState<boolean>()
  const [uploadVisible, setUploadVisible] = useState<boolean>(false)
  const [selectedDocs, setSelectedDocs] = useState<File[]>([])
  const [signedStatus, setSignedStatus] = useState<boolean>(false)
  const [signedDate, setSignedDate] = useState<string>("")

  function handleStorageChoice(isEncrypted: boolean) {
    setUploadVisible(true)
    setEncrypted(isEncrypted)
    setNonEncrypted(!isEncrypted)
  }

  function singatureTimeStamp() {
    const UTCtimenow = new Date().toISOString()
    setSignedDate(UTCtimenow)
  }
  const handleSign = async () => {
    if (selectedDocs.length === 0) return

    try {
      const file = selectedDocs[0]
      const fileArrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(fileArrayBuffer)

      // Load the image to be embedded in the PDF
      const pngUrl = Signedpng.src // Replace with your signed image path
      const response = await fetch(pngUrl)
      const pngImageBytes = await response.arrayBuffer()
      const pngImage = await pdfDoc.embedPng(pngImageBytes)

      // Iterate through all the pages and draw the image and text on each one
      const pages = pdfDoc.getPages()
      for (const page of pages) {
        const { width, height } = page.getSize()

        const pngDims = pngImage.scale(0.5) // Adjust scale as needed
        page.drawImage(pngImage, {
          x: width - pngDims.width - 10,
          y: height - pngDims.height - 10,
          width: pngDims.width,
          height: pngDims.height,
        })
      }

      const pdfBytes = await pdfDoc.save()
      const newFile = new File([pdfBytes], `signed-${file.name}`, {
        type: file.type,
      })

      setSelectedDocs([newFile])
      if (newFile) {
        singatureTimeStamp()
      }
    } catch (error) {
      console.error("Error signing the document:", error)
    }
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
            <Docinput setSelectedDocs={setSelectedDocs} />
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="flex w-full h-full flex-row">
      <div className="w-8/12">
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
      <div className="flex-col h-full bg-slate-50 w-4/12">
        <div className="flex justify-center text-center mt-5">
          <button
            onClick={() => {
              setSignedStatus(true)
              handleSign()
            }}
            className="flex justify-center text-center mt-5"
          >
            {" "}
            Sign document here{" "}
          </button>
        </div>
        <div className="flex justify-center text-center mt-10">
          {signedStatus ? (
            <div className="bg-green-300 w-52 rounded-md">
              Document has been succesfully signed
            </div>
          ) : (
            <div className="bg-red-400 w-52 rounded-md">
              Document has not yet been signed
            </div>
          )}
        </div>
        <div className="mt-10 ml-8 mr-8 h-14">
          <Tabs defaultValue="account" className="w-full jus">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recipients">Recipients</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="recipients">{}</TabsContent>
            <TabsContent value="history">{signedDate}</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
