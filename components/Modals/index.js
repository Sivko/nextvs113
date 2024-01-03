"use client";

import { Context } from "@/app/page-provider";
import { useContext, useState } from "react";
import Popup from "../Popup";


export default function Modals() {
  const { modals, setModals } = useContext(Context);
  return (<>
    {modals.map((content, index) => (<div key={index}>
      <Popup>
        {content}
      </Popup>
    </div>))}
  </>)
}