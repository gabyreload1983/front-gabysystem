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
    confirmButtonColor: "#ffc107",
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

export const SwalActionInputsRequestProduct = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Pedir Producto",
    html: `
        <div class="mb-3">
          <label class="form-label" for="quantity">Cantidad</label>
          <input id="quantity" type="number" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label" for="customerCode">Codigo de Cliente</label>
          <input id="customerCode" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label" for="observation">Observacion</label>
          <input id="observation" class="form-control">
        </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      return {
        quantity: document.getElementById("quantity").value,
        customerCode: document.getElementById("customerCode").value,
        observation: document.getElementById("observation").value,
      };
    },
  });
  return formValues;
};
