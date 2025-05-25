import { Outlet } from "react-router";

export default function Main({ collapsed }) {
  return (
    <div className="flex-1  bg-white overflow-auto rounded-2xl m-2 dark:bg-gray-800 dark:text-white">
   <Outlet/>
    </div>
  );
}
