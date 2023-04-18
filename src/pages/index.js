import { useState, useEffect } from "react";
import Head from "next/head";
import Map from "../components/Map";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { supabase } from "../../supabase";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching posts:", error);
    else setPosts(data);
  };

  const handlePinDrop = (pin) => {
    setSelectedPin(pin);
  };

  const handleSubmit = async (e, title, content) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, latitude: selectedPin.lat, longitude: selectedPin.lng }]);
  
    if (error) {
      console.error("Error creating post:", error);
    } else {
      if (data && data.length > 0) {
        setPosts([data[0], ...posts]);
      } else {
        console.error("Error: No data returned after creating post");
        // Alternatively, you can fetch the posts again to get the updated list
        // fetchPosts();
      }
      setSelectedPin(null);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Pin Drop App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-semibold">Pin Drop App</h1>

      <div className="mt-8">
        <div className="w-full h-96">
          <Map onPinDrop={handlePinDrop} />
        </div>
        {selectedPin && <PostForm onSubmit={handleSubmit} />}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Recent Posts</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
