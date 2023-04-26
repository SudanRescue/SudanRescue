import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Dashboard() {
  const { data, error } = useSWR("/api/recent-posts", fetcher);
  const [activeTab, setActiveTab] = useState("safetyUpdates");

  if (error) {
    return <div>Error: Failed to load data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Khartoum",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };


  function formatDates(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes} ${amOrPm}`;
    return formattedDate;
  }
  

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">المشاركات العامة</h1>
  
      <div className="flex flex-wrap items-center justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("safetyUpdates")}
          className={`px-4 py-2 rounded text-sm ${
            activeTab === "safetyUpdates"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          تحديثات حالة الأمن
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded text-sm ${
            activeTab === "requests"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          حوجة
        </button>
        <button
          onClick={() => setActiveTab("offers")}
          className={`px-4 py-2 rounded text-sm ${
            activeTab === "offers"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          وفرة
        </button>
  
        <button
          onClick={() => setActiveTab("busTrips")}
          className={`px-4 py-2 rounded text-sm ${
            activeTab === "busTrips"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
رحلات السفر        </button>
      </div>
  
      {activeTab === "safetyUpdates" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">تحديثات حالة الأمن </h2>
          {data.safetyUpdates.map((update) => (
            <div key={update.id} className="bg-white p-4 mb-4 rounded shadow">
              <p> الولاية-المكان-العنوان : {update.location}</p>
              <p>الوضع الأمني: {update.status}</p>
              <p>التفاصيل : {update.description}</p>
              <p className="text-gray-600">
                {" "}
                {formatDate(update.createdAt)} :وقت النشر{" "}
              </p>
            </div>
          ))}
        </section>
      )}
  
      {activeTab === "requests" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">حوجة</h2>
          {data.servicePosts
            .filter((post) => post.postType === "request")
            .map((post) => (
              <div key={post.id} className="bg-white p-4 mb-4 rounded shadow">
                <p>التفاصيل/الخدمة : {post.service}</p>
                <p>ولاية-المكان-العنوان: {post.location}</p>
                <p>رقم التلفون : {post.contactNumber}</p>
                <p className="text-gray-600">
                  {" "}
                  {formatDate(post.createdAt)}:وقت النشر
                </p>
              </div>
            ))}
        </section>
      )}
      {activeTab === "offers" && (
      <section>
        <h2 className="text-2xl font-semibold mb-4">وفرة</h2>
        {data.servicePosts
          .filter((post) => post.postType === "offer")
          .map((post) => (
            <div key={post.id} className="bg-white p-4 mb-4 rounded shadow">
              <p>التفاصيل/الخدمة : {post.service}</p>
              <p>ولاية-المكان-العنوان : {post.location}</p>
              <p>رقم التلفون : {post.contactNumber}</p>
              <p> {formatDate(post.createdAt)} :وقت النشر</p>
            </div>
          ))}
      </section>
    )}

    {activeTab === "busTrips" && (
      <section>
        <h2 className="text-2xl font-semibold mb-4">رحلات السفر </h2>
        {data.busTrips.map((trip) => (
          <div key={trip.id} className="bg-white p-6 mb-6 rounded shadow">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <p className="font-semibold">من:</p>
              <p>{trip.origin}</p>
              <p className="font-semibold">إلى:</p>
              <p>{trip.destination}</p>
              <p className="font-semibold">تاريخ ووقت المغادرة:</p>
              <p>{formatDates(new Date(trip.departureDateTime))}</p>
              <p className="font-semibold">عدد المقاعد المتوفرة:</p>
              <p>{trip.seatsAvailable}</p>
              <p className="font-semibold">السعر:</p>
              <p>{trip.price}</p>
              <p className="font-semibold">رقم التواصل:</p>
              <p>{trip.contactNumber}</p>
              <p className="font-semibold">وقت النشر:</p>
              <p>{formatDate(trip.createdAt)}</p>
            </div>
          </div>
        ))}
      </section>
    )}
  </div>
);

     
  
}
export default Dashboard;
