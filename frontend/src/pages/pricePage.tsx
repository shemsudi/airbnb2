import { useState, useEffect } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { updatePrice } from "../redux/hostActions";
import { RootState, useAppDispatch } from "../redux/store";
import { Helmet } from "react-helmet";

const PricePage = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const [price, setPrice] = useState(host.price || 23);
  const serviceFee = Math.round(price * 0.15);
  const [isShowMore, setIsShowMore] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost && currentHost.price) {
      setPrice(currentHost.price);
    }
  }, []);

  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/visibility`);
  };
  const onNext = async () => {
    dispatch(updatePrice({ uuid: host.uuid!, price: price }));
    navigate(`/became-a-host/${host.uuid}/discount`);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^0-9.]/g, "");
    console.log(numericValue);
    if (numericValue === "") {
      setPrice(0);
    } else {
      setPrice(parseInt(numericValue));
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Set your price- Airbnb</title>
      </Helmet>
      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />
      <div className="grow box-border m-4 flex flex-col items-start justify-start md:items-center md:justify-center">
        <div className="flex flex-col justify-center   md:w-max">
          <h1 className="text-2xl font-semibold">Now, set your price</h1>
          <small className="text-gray-600">You can change it anytime</small>
          <div className="flex flex-col justify-center items-center  md:max-w-[500px] mt-4 py-4">
            <input
              className="text-center text-6xl w-full focus:outline-none font-bold"
              onChange={handlePriceChange}
              type="text"
              value={"$" + price}
            />
            {!isShowMore ? (
              <div className="flex flex-col  items-center mt-2 ">
                <button className="mb-16" onClick={() => setIsShowMore(true)}>
                  Guest prices before taxes $
                  {serviceFee + parseInt(price.toString())}{" "}
                  {<FontAwesomeIcon icon={faChevronDown} />}
                </button>
                <button className="border flex items-center text-sm rounded-full p-2 mb-10 hover:border-black font-sans space-x-2">
                  {" "}
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p> Similar listings $54 -$80</p>{" "}
                </button>
                <Link to={""} className="text-sm underline">
                  {" "}
                  Learn about more pricing
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <div className=" flex flex-col border rounded-lg border-gray-400 p-2 gap-2 ">
                  <div className="flex justify-between gap-16">
                    {" "}
                    <small>Base price</small>
                    <small>${price}</small>
                  </div>
                  <div className="flex gap-16 justify-between pb-2 border-b-2">
                    {" "}
                    <small>Guest service fee</small>
                    <small>${serviceFee}</small>
                  </div>
                  <div className="flex justify-between gap-16">
                    {" "}
                    <small className="font-medium">
                      Guest prices before taxes $
                      {serviceFee + parseInt(price.toString())}
                    </small>
                  </div>
                </div>
                <div className="flex justify-between border rounded-lg  border-gray-400 mt-4 p-2 gap-10 w-full">
                  <small>Guest service fee</small>
                  <small>${price - 1}</small>
                </div>

                <button
                  className="text-sm mt-4  "
                  onClick={() => setIsShowMore(false)}
                >
                  Show less {<FontAwesomeIcon icon={faChevronUp} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterNavigation
        itemSelected={true}
        onBack={onBack}
        onNext={onNext}
        step={3}
        pos={3}
      />
    </div>
  );
};

export default PricePage;
