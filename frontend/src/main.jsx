import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from './Home.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Expenses from './features/Expenses.jsx';


import Debt from './features/Debt.jsx';
import Insights from './features/Insights.jsx';
import Tips from './features/Tips.jsx';
import Transactions from './features/Transactions.jsx';
import Others from './features/Calculators.jsx';
import Progress from './features/Progress.jsx';
import Edit from './Settings/Edit.jsx';
import Calculator from './features/Calculators.jsx';

const rout = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Dashboard',
    element: <Dashboard />,
    children: [
      { path: 'Expenses', element: <Expenses /> },
    
    
      { path: 'Debt', element: <Debt /> },
      { path: 'Insights', element: <Insights /> },
      { path: 'Tips', element: <Tips /> },
      { path: 'Transactions', element: <Transactions /> },
      { path: 'Others', element: <Others /> },
      { path: 'Progress', element: <Progress /> },
          { path: 'Calculators', element: <Calculator /> },
      { path: 'edit', element: null },
    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rout} />
  </StrictMode>
);
