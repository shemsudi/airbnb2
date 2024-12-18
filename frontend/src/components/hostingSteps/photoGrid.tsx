import { useState } from "react";
import CloseIcon from "../icons/closeIcon";

interface PhotoGridProps {
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  removeImage: (index: number) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  files,
  setFiles,
  removeImage,
  setIsOpen,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number>(-1);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    console.log("Dragging image at index:", index);
  };

  // const drag = (e) => {
  //   e.preventDefault();
  // };
  const allowDrop = (
    e: React.DragEvent<HTMLUListElement | HTMLImageElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    const newFiles = [...files];
    console.log(newFiles);
    const temp = newFiles[draggedIndex];
    newFiles[draggedIndex] = newFiles[index];
    newFiles[index] = temp;

    setFiles(newFiles);
    console.log("Dropped on index:", index);
  };
  return (
    <ul
      onDragOver={(e) => {
        allowDrop(e);
      }}
      className="grid grid-cols-1  sm:grid-cols-2 gap-2"
    >
      {files.map((file, index) => (
        <li
          key={index}
          draggable="true"
          className={`relative  rounded-lg w-full h-40 ${
            index === 0 && "sm:col-span-2 sm:h-60 "
          }  `}
        >
          <img
            src={file}
            draggable="true"
            onDragStart={() => handleDragStart(index)}
            onDrop={() => handleDrop(index)}
            onDragOver={(e) => allowDrop(e)}
            alt="shemsu"
            className={`size-full object-cover rounded-lg shadow-lg`}
          />
          <button
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 bg-white p-1 rounded-full"
          >
            <CloseIcon />
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => setIsOpen(true)}
          className="h-40 rounded-lg border border-dashed border-gray-500 w-full"
        >
          add more
        </button>
      </li>
    </ul>
  );
};
export default PhotoGrid;
