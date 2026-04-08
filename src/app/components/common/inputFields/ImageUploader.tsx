import Image from "next/image";
import { useRef, useState } from "react";
import { CloudUploadIcon } from "../allImages/AllImages";

interface ImageUploaderProps {
  onUpload: (images: FileList | null) => void;
  maxImages?: number;
  className?: string;
}

const ImageUploader = ({ onUpload, maxImages = 1, className }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onUpload(event.target.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onUpload(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`border-2 border-dashed p-4 text-center flex flex-col items-center rounded-md cursor-pointer py-5 ${className} ${
        isDragging ? "border-orange-500 bg-orange-100" : "border-orange-400 bg-gray50"
      }`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <Image src={CloudUploadIcon} alt="upload icon" />
      <p className="text-sm text-gray-500">
        Drag & drop files or <span className="text-orange-500">Browse</span>
      </p>
      {/* <p className="text-xs text-gray-400">Max {maxImages} images</p> */}
    </div>
  );
};

export default ImageUploader;
