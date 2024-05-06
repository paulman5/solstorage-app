import { Dispatch, SetStateAction } from "react"

export interface uploadProps {
  selectedDocs: File[]
  setSelectedDocs: Dispatch<SetStateAction<File[]>>
}
