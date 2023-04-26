import React from 'react';
import PostForm from '@/components/PostForm';
import Dashboard from '@/components/Dashboard';

function index() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="p-6">
            <h2 className="text-3xl font-semibold text-center mb-4">
              إضافة منشور جديد
            </h2>
            <PostForm />
          </div>
        </div>

        <div className="mt-10">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default index;
