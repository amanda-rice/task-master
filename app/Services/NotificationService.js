
export default class NotificationService {
  static async confirmAction(title = 'Are you sure?', text = "This cannot be undone") {
    try {
      const res = await Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4a6670',
        cancelButtonColor: '#996769',
        confirmButtonText: 'Confirm Delete'
      })
      console.log(res)
      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      console.error(error)
    }
  }

  static toast(title = 'Default Toasty', display = 'success') {
    Swal.fire({
      title: title,
      icon: display,
      position: 'bottom-right',
      timer: 2000,
      toast: true,
      showConfirmButton: false
    })
  }
}