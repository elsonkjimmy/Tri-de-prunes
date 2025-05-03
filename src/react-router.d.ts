// src/react-router.d.ts
import 'react-router-dom';

declare module 'react-router-dom' {
  export interface RouteProps {
    children?: React.ReactNode;
  }
}