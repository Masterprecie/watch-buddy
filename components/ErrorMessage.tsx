import Image from "next/image";
import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-red-500  flex flex-col items-center gap-4">
      <div className="w-64">
        <Image
          src="/assets/error.gif"
          alt="Error"
          width={64}
          height={64}
          className="w-full h-full"
        />
      </div>
      <div>
        <p className="font-bold text-center text-lg">
          Oops! Something went wrong.
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
