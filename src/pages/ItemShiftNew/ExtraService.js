import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import cardImg1 from "../../../src/asset/boxes.png";
import cardImg2 from "../../../src/asset/longPush.png";
import cardImg3 from "../../../src/asset/Assemble.png";
import cardImg4 from "../../../src/asset/wraping.png";
import cardImg5 from "../../../src/asset/stairCarry.png";
import toast from "react-hot-toast";
import { bookingApi } from "../../config/URL";

const cardData = [
  { id: 1, name: "Boxes", img: cardImg1 },
  { id: 2, name: "Long Push", img: cardImg2 },
  { id: 3, name: "Assembly / Disassembly", img: cardImg3 },
  { id: 4, name: "Wrapping", img: cardImg4 },
  { id: 5, name: "Stair Carry", img: cardImg5 },
];

const ExtraService = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const [counts, setCounts] = useState(
      cardData.reduce((acc, card) => ({ ...acc, [card.id]: 0 }), {})
    );
    console.log("counts", counts);
    console.log("form", formData);
    const handleIncrement = (id) => {
      setCounts((prevCounts) => ({ ...prevCounts, [id]: prevCounts[id] + 1 }));
    };

    const handleDecrement = (id) => {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: Math.max(prevCounts[id] - 1, 0),
      }));
    };

    useEffect(() => {
        if (formData.extraService) {
          setCounts(formData.extraService);
        }
      }, [formData.extraService]);
      
    const handleService = async() => {
      console.log("object",counts);
      setLoadIndicators(true);
      const payload = {
        userId: formData?.data?.user?.userId,
        type: formData.type,
        // locationDetail: JSON.parse(decodeURIComponent(formData.location)),
        bookingId: formData.bookingId,
        estKm: parseFloat(formData.distance),
        scheduledDate: formData?.data?.booking?.scheduledDate,
        vehicleType: formData?.vehicle?.type,
        actualKm: parseFloat(formData.distance),
        assemblyDisassemblyCharge:counts[3],
        bubbleWrappingCharge:counts[4],
        boxesCharge:counts[1],
        longPushCharge:counts[2]
      };
      try {
        const response = await bookingApi.put(`booking/update`, payload);
        if (response.status === 200) {
          toast.success("Update successfully!");
          setFormData((prv) => ({
            ...prv,
            extraService: counts,
          }));
          handleNext();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.message);
        console.log(error);
      } finally {
        setLoadIndicators(false);
      }
    //   handleNext()
    };
    useImperativeHandle(ref, () => ({
      extraservice: handleService,
    }));

    return (
      <div className="container">
        <div className="additional-services">
          <h5 className="py-5">
            Would you like to add additional services to your booking?
          </h5>
          <div className="service-cards">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5">
              {cardData.map((card) => (
                <div className="col" key={card.id}>
                  <div
                    className="card rounded-4 shadow card-hover"
                    style={{ minHeight: "230px" }}
                  >
                    <img src={card.img} alt={card.name} className="img-fluid" />
                    <div
                      className="card-body rounded-4 m-2"
                      style={{ background: "#ADFF3B80" }}
                    >
                      <div className="count_content rounded-4">
                        <b>{card.name}</b>

                        <div className="count-controls text-center">
                          <button onClick={() => handleDecrement(card.id)}>
                            -
                          </button>
                          <span>{counts[card.id]}</span>
                          <button onClick={() => handleIncrement(card.id)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted py-4">
            Get sturdy, reliable boxes for a safe and organized house move.
          </p>
        </div>
      </div>
    );
  }
);

export default ExtraService;
