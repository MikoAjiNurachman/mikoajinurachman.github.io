import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
<p>
      <i>{error?.message   
 || (error as { statusText?: string })?.statusText || 'An unknown error occurred.'}</i> 
      </p>
    </div>
  );
}