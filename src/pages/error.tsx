// import { useRouteError, isRouteErrorResponse } from "react-router-dom";

// import type { ReactElement } from "react";

// export const ErrorPage = (): ReactElement => {
//   // you don't need to explicitly set error to `unknown`
//   const error = useRouteError();
//   let errorMessage: string;

//   if (isRouteErrorResponse(error)) {
//     errorMessage = error.error?.message || error.statusText;
//   } else if (error instanceof Error) {
//     errorMessage = error.message;
//   } else if (typeof error === "string") {
//     errorMessage = error;
//   } else {
//     console.error(error);
//     errorMessage = "Unknown error";
//   }

//   return (
//     <div
//       id="error-page"
//       className="flex flex-col gap-8 justify-center items-center h-screen"
//     >
//       <h1 className="text-4xl font-bold">Oops!</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p className="text-slate-400">
//         <i>{errorMessage}</i>
//       </p>
//     </div>
//   );
// };


import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    }
    else if (error.status === 404) {
      // ...
    }

    return (
      <div id="error-page">
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}