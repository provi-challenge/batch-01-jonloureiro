import { ReactComponent as Logo } from '../logo.svg';

export function Layout({ children, title, subtitle }) {
  return (
    <div className="bg-gray-100">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="mt-12 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
