import { useEffect, useState } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AddPhotos from "../modal/addPhotos.tsx";
import PlusIcon from "../components/icons/plusIcon";
import EmptyState from "../components/hostingSteps/emptyState.tsx";
import PhotoGrid from "../components/hostingSteps/photoGrid.tsx";
import { removeImageRedux } from "../redux/hostActions";
import { RootState, useAppDispatch } from "../redux/store";
import { Helmet } from "react-helmet";
const PhotosPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const host = useSelector((state: RootState) => state.host.host);
  const [files, setFiles] = useState<string[]>(host.photos || []);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentHostData = localStorage.getItem("currentHost");
    if (currentHostData) {
      const currentHost = JSON.parse(currentHostData);
      console.log(currentHost);
      if (currentHost.photos) setFiles(currentHost.photos);
    }
  }, []);

  const onNext = async () => {
    navigate(`/became-a-host/${host.uuid}/title`);
  };
  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/amenities`);
  };
  const removeImage = async (index: number) => {
    dispatch(removeImageRedux({ uuid: host.uuid!, index }));

    const newFiles = files.filter((_, i) => i !== index);

    setFiles(newFiles);
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      photos: newFiles,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
  };

  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Add some photos - Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className=" flex-grow mx-6 sm:mx-14 flex justify-center  ">
        <div className="flex  flex-col mx-4 w-full  sm:max-w-[500px] md:min-h-[400px] gap-3 mb-5 max-md:mt-4">
          {files.length > 0 ? (
            <>
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl">
                    {files.length >= 5
                      ? "Ta-da How does this look?"
                      : "Choose at least 5 photos"}
                  </h1>

                  <small className="mb-5">Drag to order</small>
                </div>
                <button onClick={() => setIsOpen(true)}>
                  {" "}
                  <PlusIcon />
                </button>
              </div>
              <PhotoGrid
                setIsOpen={setIsOpen}
                files={files}
                removeImage={removeImage}
                setFiles={setFiles}
              />
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1 max-md:mt-6">
                <h1 className="text-2xl font-semibold">
                  Add some photos of your house
                </h1>
                <small className="text-gray-500">
                  You'll need 5 photos to get started. You can add more or make
                  changes later{" "}
                </small>
              </div>
              <EmptyState onClick={() => setIsOpen(true)} />
            </>
          )}
        </div>
      </div>
      <FooterNavigation
        itemSelected={files.length >= 5}
        step={2}
        pos={2}
        onBack={onBack}
        onNext={onNext}
      />
      {isOpen && (
        <AddPhotos
          files={files}
          setFiles={setFiles}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default PhotosPage;
