import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pricing } from "../../types/types";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type ReservationBoxProps = {
  pricing: Pricing | undefined;
  setShowReserve: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReservationBox: React.FC<ReservationBoxProps> = ({
  pricing,
  setShowReserve,
}) => {
  const reserveRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setShowReserve(true);
          } else {
            setShowReserve(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (reserveRef.current) {
      observer.observe(reserveRef.current);
    }

    return () => {
      if (reserveRef.current) {
        observer.unobserve(reserveRef.current);
      }
    };
  }, []);
  return (
    <div className=" sticky top-28  ">
      <div className="p-5 w-full flex flex-col gap-4  shadow-lg border rounded-lg ">
        <div>
          <span className="font-medium text-xl">$ {pricing?.nightlyRate} </span>
          night{" "}
        </div>
        <div className="flex flex-col border rounded-lg ">
          <div className="flex">
            <button className="flex w-1/2 p-2 flex-col border-l rounded-tl-lg border">
              <span className="text-sm font-medium">CHECK-IN</span>
              <span className="text-sm font-medium"> 12/2/2024</span>
            </button>
            <button className="flex w-1/2 p-2 flex-col">
              <span className="text-sm font-medium">CHECK-OUT</span>
              <span className="text-sm font-medium"> 12/2/2024</span>
            </button>
          </div>
          <button className="flex border border-t p-2 justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Guests</span>
              <span className="text-sm font-roboto">1 guest</span>
            </div>
            <FontAwesomeIcon icon={faStar} />
          </button>
        </div>
        <Link to={"/book/stays"}>
          <button
            ref={reserveRef}
            className="bg-primary rounded-lg text-white font-bold w-full py-3 px-2 text-center"
          >
            Reserve
          </button>
        </Link>

        <div className="w-full text-center">You won't be charged yet</div>
        <div className="flex justify-between px-2">
          <div className="font-normal">${pricing?.nightlyRate} x 3 night</div>
          <div>${pricing?.nightlyRate! * 3}</div>
        </div>
        <div className="flex justify-between px-2">
          <div className="font-normal">Airbnb Service fee </div>
          <div>${Math.round(pricing?.nightlyRate! * 0.15)}</div>
        </div>
        <hr />
        <div className="flex justify-between px-2">
          <div className="font-semibold">Total before taxes </div>
          <div>
            $
            {Math.round(pricing?.nightlyRate! * 0.15) +
              pricing?.nightlyRate! * 3}
          </div>
        </div>
      </div>
      <div className="text-center py-3">
        <button className="underline text-gray-700">Report this listing</button>
      </div>
    </div>
  );
};

export default ReservationBox;