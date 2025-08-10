import { useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouteProps,
} from 'react-router-dom';
import { RouterContextType, RouterProps } from './interfaces';

import { Home } from '@/pages/home';
import { Repo } from '@/pages/repo';

export const ContextRouter = createContext<RouterContextType | null>(null);

export function RouterProvider({ children }: RouterProps) {
  const [routeProps, setRouteProps] = useState<RouteProps | null>(null);

  return (
    <Router>
      <ContextRouter.Provider value={{ routeProps, setRouteProps }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/repo/*' element={<Repo />} />
        </Routes>
        {children}
      </ContextRouter.Provider>
    </Router>
  );
}
