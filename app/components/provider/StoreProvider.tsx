'use client';
import { store } from '@/app/redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
    </Provider>
  );
}
