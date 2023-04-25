import { useState } from "react";

function PostForm() {
  const [postType, setPostType] = useState("safetyUpdate");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [service, setService] = useState("");
  const [servicePostType, setServicePostType] = useState("request");
  const [contactNumber, setContactNumber] = useState("");

  // BusTrip state variables
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDateTime, setDepartureDateTime] = useState("");
  const [price, setPrice] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      location,
    };

    if (postType === "safetyUpdate") {
      data.status = status;
      data.description = description;
    } else if (postType === "servicePost") {
      data.postType = servicePostType;
      data.service = service;
      data.contactNumber = contactNumber;
    } else {
      // BusTrip data
      data.origin = origin;
      data.destination = destination;
      data.departureDateTime = departureDateTime;
      data.price = parseFloat(price);
      data.seatsAvailable = parseInt(seatsAvailable);
      data.contactNumber = contactNumber; // Use the same contactNumber state for BusTrip
    }

    try {
      console.log({ type: postType, data });

      const response = await fetch("/api/makeposts", {
        method: "POST",
        body: JSON.stringify({ type: postType, data }),
      });
      console.log(response);

      if (response.ok) {
        alert("Post submitted successfully!");
      } else {
        alert("Failed to submit the post.");
      }
    } catch (error) {
      alert("An error occurred while submitting the post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          نوع المنشور{" "}
        </label>
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="safetyUpdate"> تحديث حالة الأمن</option>
          <option value="servicePost">نداء </option>
          <option value="busTrip">رحلة سفر</option>{" "}
          {/* Add a new option for BusTrip */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الولاية-المكان-العنوان
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {postType === "safetyUpdate" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوضع الأمني في المنطقة{" "}
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              التفاصيل{" "}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded resize-none"
            />
          </div>
        </>
      )}
      {postType === "servicePost" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع النداء{" "}
            </label>
            <select
              value={servicePostType}
              onChange={(e) => setServicePostType(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="request">حوجة</option>
              <option value="offer">وفرة</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              التفاصيل/الخدمة{" "}
            </label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم التلفون{" "}
            </label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </>
      )}

      {postType === "busTrip" && (
        <>
          {/* Add input fields for BusTrip */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              أصل الرحلة{" "}
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وجهة الرحلة{" "}
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ ووقت المغادرة{" "}
            </label>
            <input
              type="datetime-local"
              value={departureDateTime}
              onChange={(e) => setDepartureDateTime(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              السعر{" "}
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
            عدد المقاعد المتاحة{" "}
            </label>
            <input
              type="number"
              value={seatsAvailable}
              onChange={(e) => setSeatsAvailable(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم التلفون{" "}
            </label>
            <input
              type="tel"
              value={contactNumber} // Use contactNumber instead of busTripContactNumber
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </>
      )}

      {/* ends here after bracket */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        إضافة{" "}
      </button>
    </form>
  );
}

export default PostForm;
