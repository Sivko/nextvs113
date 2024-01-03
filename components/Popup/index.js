import { Context } from "@/app/page-provider";
import { useContext } from "react";

export default function Popup({ children }) {

  const { setModals } = useContext(Context)
  const closeLastModal = (e) => {

    if (e.target.getAttribute("data-close")) {
      setModals(prev => prev.length > 1 ? prev.slice(0, prev.length - 1) : []);
      console.log("closeModal")
    }
  }

  return (<>
    <div data-close="true" className="fixed inset-0 bg-[#00000081] flex items-center justify-center" onClick={closeLastModal}>
      {/* <div className="bg-white"> */}
      {children}
      {/* </div> */}
    </div>
  </>)
}