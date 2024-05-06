'use client';

import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef } from 'react';

const FrozenRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
};

export default FrozenRoute;
