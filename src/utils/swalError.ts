import Swal from "sweetalert2";

export const swalError = (title: string, msg?:string) => {

    Swal.fire({
  icon: "error",
  title: title,
  text: msg || "",
});

}