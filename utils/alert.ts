import Swal from "sweetalert2";

let msg;
export const alert = function ({ type = "success", message, timer, cb }) {
  function config(timer = 5000, { type = "success", message, cb }) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    msg = message ?? msg;
    Toast.fire({
      icon: type,
      title: msg,
      didDestroy: cb,
    });

    return Toast;
  }
  return config(timer, { type, message, cb });
};
