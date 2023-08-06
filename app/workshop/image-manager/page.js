"use client"

import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import path from "path";
import Link from "next/link";
import Image from "next/image";


const ImageManager = ({ dirs }) => {

  const [images, setImages] = useState([])
  useEffect(() => {
    async function getImages() {
      const images = await fetch(`/api${window.location.search}`)
      const res = await images.json()
      setImages(res.data)
    }
    getImages()
  }, [])

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image-manager", formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-20 space-y-6">
      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
          {selectedImage ? (
            <img src={selectedImage} alt="" />
          ) : (
            <span>Select Image</span>
          )}
        </div>
      </label>
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
        className="bg-red-600 p-3 w-32 text-center rounded text-white"
      >
        {uploading ? "Uploading.." : "Upload"}
      </button>
      <div className="mt-20 flex flex-col space-y-3">
        {dirs && dirs.map((item) => (
          <Link key={item} href={"/image-manager/" + item}>
            <a className="text-blue-500 hover:underline">{item}</a>
          </Link>
        ))}
      </div>
      <hr />
      <div>
        {images.map((e, index) => (<div key={index}>
          <Link target="_blank" href={`/image-manager/${e}`}>
            <Image src={`/image-manager/${e}`} alt="" width ={300} height={100} />
          </Link>
        </div>))}
      </div>
    </div>
  );
};

export default ImageManager;