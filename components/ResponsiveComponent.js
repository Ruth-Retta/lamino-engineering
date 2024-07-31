import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ResponsiveComponent = () => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 1224 });
  const isMobile = useMediaQuery({ maxDeviceWidth: 768 });
  const isTablet = useMediaQuery({ minDeviceWidth: 768, maxDeviceWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isRetina = useMediaQuery({ minResolution: '2dppx' });

  React.useEffect(() => {
    if (isMobile) {
      console.log('Mobile view');
    } else if (isTablet) {
      console.log('Tablet view');
    } else if (isDesktopOrLaptop) {
      console.log('Desktop or Laptop view');
    }
  }, [isMobile, isTablet, isDesktopOrLaptop]);

  return (
    <div className={`container ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
    </div>
  );
};

export default ResponsiveComponent;
