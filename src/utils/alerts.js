import Swal from "sweetalert2";

export const SwalError = async (
  message = "Error inesperado. Contactar al administrador de la app"
) => {
  return await Swal.fire({
    text: `${message}`,
    icon: "error",
  });
};

export const SwalSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    text: `${message}`,
    position: "center",
    showConfirmButton: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export const SwalToast = async (message, timer = 3000) => {
  return Swal.fire({
    toast: true,
    icon: "success",
    text: `${message}`,
    position: "top-end",
    timer,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export const SwalWaiting = async (message) => {
  return Swal.fire({
    title: "Wait...",
    html: `<strong>${message}</strong>`,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const SwalQuestion = async (questionMessage = "Confirmar??") => {
  const response = await Swal.fire({
    icon: "question",
    text: `${questionMessage}?`,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
  });
  return response.isConfirmed;
};

export const SwalActionConfirmWithText = async (
  valueToCompare,
  text,
  inputLabel
) => {
  const { isConfirmed, value } = await Swal.fire({
    icon: "warning",
    title: "ATENCION!!!",
    text,
    input: "text",
    inputLabel,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe ingresar el valor solicitado!";
      }
      if (value !== valueToCompare) {
        return "Valor incorrecto";
      }
    },
    confirmButtonText: "Aceptar",
  });

  return isConfirmed;
};
