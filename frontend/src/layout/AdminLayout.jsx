import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect } from 'react';

export default function AdminLayout() {
    const { user } = useStateContext();
 

  return (
    <div><Outlet/></div>
  )
}
