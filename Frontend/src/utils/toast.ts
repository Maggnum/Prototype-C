import { toast } from "react-toastify";
import { HttpStatusCode, isAxiosError } from "axios";
import type { LatLngExpression } from "leaflet";

const INVALID_PARAMETER_VALUE_CODE = 2003;

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
                switch (data.response?.data?.detail?.code) {
                  case INVALID_PARAMETER_VALUE_CODE:
                    return "Could not find route, one of your polygons may be too big";
                  default:
                    return "Invalid user input";
                }
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
