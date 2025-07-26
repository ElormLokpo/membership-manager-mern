import { ModalProvider } from "./modal-provider";
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
            <ModalProvider>
              <RouterProvider>
                <></>
              </RouterProvider>
            </ModalProvider>
          </ThemeProvider>
        </QueryProvider>
      </ReduxProvider>
    </>
  );
};
