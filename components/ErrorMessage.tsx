/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

interface ErrorMessageProps {
  error: any;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  // const getStatusMessage = (status: number | undefined) => {
  //   switch (status) {
  //     case 400:
  //       return "Bad Request. Please check your input.";
  //     case 401:
  //       return "Unauthorized. Please log in.";
  //     case 403:
  //       return "Forbidden. You don't have permission to access this.";
  //     case 404:
  //       return "Not Found. The requested resource could not be found.";
  //     case 500:
  //       return "Internal Server Error. Please try again later.";
  //     default:
  //       return "An unexpected error occurred. Please try again.";
  //   }
  // };

  const getErrorMessage = (error: any) => {
    if (error && "data" in error) {
      return error.data.message || error.data.error || "An Error Occurred";
    }
    return "An Error Occurred";
  };

  // const getErrorStatus = (error: any) => {
  //   if (error && "status" in error) {
  //     return error.status;
  //   }
  //   return undefined;
  // };

  // const status = getErrorStatus(error);
  const message = getErrorMessage(error);

  return (
    <div className="text-red-500 flex flex-col items-center justify-center gap-4">
      <div className="w-64">
        <Image
          src="/assets/error.gif"
          alt="Error"
          width={64}
          height={64}
          className="w-full h-full"
        />
      </div>
      <div className="text-center text-white">
        {/* <p className="font-bold text-center text-lg">
          {getStatusMessage(status)}
        </p> */}
        <p className="font-bold text-center text-lg">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
