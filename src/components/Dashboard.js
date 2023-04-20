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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Public Dashboard</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("safetyUpdates")}
          className={`px-4 py-2 rounded ${
            activeTab === "safetyUpdates"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          تحديثات حالة الأمان{" "}
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded ${
            activeTab === "requests"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          حوجة
        </button>
        <button
          onClick={() => setActiveTab("offers")}
          className={`px-4 py-2 rounded ${
            activeTab === "offers"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          وفرة
        </button>
      </div>

      {activeTab === "safetyUpdates" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">تحديثات حالة الأمان </h2>
          {data.safetyUpdates.map((update) => (
            <div key={update.id} className="bg-white p-4 mb-4 rounded shadow">
              <p> ولاية-المكان-العنوان : {update.location}</p>
              <p>الوضع الأمني: {update.status}</p>
              <p>التفاصيل : {update.description}</p>
              <p> {new Date(update.createdAt).toLocaleString()}:وقت النشر </p>
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
                <p> {new Date(post.createdAt).toLocaleString()}:وقت النشر</p>
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
                <p> {new Date(post.createdAt).toLocaleString()} :وقت النشر</p>
              </div>
            ))}
        </section>
      )}
    </div>
  );
}
export default Dashboard;