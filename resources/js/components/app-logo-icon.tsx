import { ImgHTMLAttributes } from 'react';

interface AppLogoIconProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export default function AppLogoIcon({ className, ...props }: AppLogoIconProps) {
    return <img src="/assets/img/logo.png" alt="IMS Logo" className={className} width={32} height={32} {...props} />;
}
