import { QueryProvider } from "./query-provider";
import { ReduxProvider } from "./redux-provider";
import { RouterProvider } from "./route-provider";
import { ThemeProvider } from "./theme-provider";

export const RootProvider = () => {
  return (
    <>
      <ReduxProvider>
        <QueryProvider>
          <ThemeProvider>
            <RouterProvider>
              <div>Root Provider</div>
            </RouterProvider>
          </ThemeProvider>
        </QueryProvider>
      </ReduxProvider>
    </>
  );
};
