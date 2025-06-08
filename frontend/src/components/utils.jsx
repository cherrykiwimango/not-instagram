import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(<span style={{ fontFamily: "monospace" }}>{msg}</span>, {
    position: "top-right",
  });
};

export const handleError = (msg) => {
  toast.error(<span style={{ fontFamily: "monospace" }}>{msg}</span>, {
    position: "top-right",
  });
};
