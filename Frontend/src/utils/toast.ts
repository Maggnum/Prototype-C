import { toast } from "react-toastify";
import { HttpStatusCode, isAxiosError } from "axios";
import type { LatLngExpression } from "leaflet";

export const toastRoute = (routePromise: Promise<LatLngExpression[]>) => {
  toast.promise(
    routePromise,
    {
      pending: "Finding route...",
      success: "Route found!",
      error: {
        render({ data }) {
          if (isAxiosError(data)) {
            switch (data.response?.status) {
              case HttpStatusCode.NotFound:
                return "Route not found";
              case HttpStatusCode.BadRequest:
                return "Invalid user input";
              case HttpStatusCode.InternalServerError:
                return "Unexpected server error";
              default:
                return "Routing failed";
            }
          }

          return "Unexpected error";
        },
      },
    },
    { position: "bottom-right" }
  );
};
