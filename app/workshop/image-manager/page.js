"use client"

import { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import path from "path";
import Link from "next/link";
import Image from "next/image";


const ImageManager = ({ dirs }) => {

  const [images, setImages] = useState([])

  async function getImages() {
    const images = await fetch(`/api${window.location.search}`)
    const res = await images.json()
    setImages(res.data)
  }

  useEffect(() => {
    getImages()
  }, [])

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const inputFile = useRef();

  const handleUpload = async () => {
    console.log(inputFile)
    inputFile.current.value = '';
    setSelectedImage('')

    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("image", selectedFile);
      const { data } = await axios.post("/api/image-manager", formData);
      // console.log(data);
      getImages()
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <>
      <div className="max-w-4xl flex gap-4 items-center mx-auto pt-10 pb-10">
        <label>
          <input
            type="file"
            ref={inputFile}
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
              <Image width={300} height={400} className="h-fit" src={selectedImage} alt="" />
            ) : (
              <span className=" text-center">Выберите изображение</span>
            )}
          </div>
        </label>
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{ opacity: uploading ? ".5" : "1" }}
          className="bg-[#3a78ef] p-3 w-32 text-center rounded text-white"
        >
          {uploading ? "Загрузка.." : "Загрузить"}
        </button>
        <div className="mt-20 flex flex-col space-y-3">
          {dirs && dirs.map((item) => (
            <Link key={item} href={"/image-manager/" + item}>
              <a className="text-blue-500 hover:underline">{item}</a>
            </Link>
          ))}
        </div>
      </div>
      <hr />
      <div className="max-w-4xl mt-4 mx-auto flex flex-wrap gap-4">
        {images.map((e, index) => (<div key={index}>
          <Link target="_blank" href={`/image-manager/${e}`}>
            <Image src={`/image-manager/11.jpg`} alt="" width={150} className="h-fit" height={100} />
          </Link>
        </div>))}
      </div>
    </>
  );
};

export default ImageManager;