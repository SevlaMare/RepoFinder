import { ReactNode } from 'react';

export interface RouterContextType {
  routeProps?: RouteProps | null;
  setRouteProps: (props: RouteProps) => void;
}

export interface RouterProps {
  children?: ReactNode;
}
