import { Dispatch, SetStateAction } from "react"

export interface uploadProps {
  setSelectedDocs: Dispatch<SetStateAction<File[]>>
}
