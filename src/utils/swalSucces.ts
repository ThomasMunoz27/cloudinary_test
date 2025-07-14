import Swal from "sweetalert2";

export const swalSucces = (title: string, msg?:string) => {
    Swal.fire({
  title: title,
  text: msg,
  icon: "success"
});
}