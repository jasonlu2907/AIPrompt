'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };
  const handleEdit = async () => {};

  const handleDelete = async () => {};

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile'
      data={[]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></Profile>
  );
};

export default MyProfile;
