function getNotifications(event) {
  $('#notifications').empty()
  $('#notifications').show()

  event.preventDefault()
  $.ajax({
    url: `${baseUrl}/users/notifs`,
    method: 'get',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (notifs) {
      let unaddressedNotifs = 0

      notifs.forEach(notif => {
        if (!notif.addressed) {
          let notifItem =
          `
        <div class="alert alert-dark" role="alert"> ${notif.message}
          <div class="notif-actions">
            <a id="${notif.projectId}" href="" class="alert-link" onclick="acceptProjectInvitation(event)"> Accept </a>
            <a id="${notif.projectId}" href="" class="alert-link" onclick="declineProjectInvitation(event)"> Decline </a>
          </div> 
        </div>
          `
          $('#notifications').append(notifItem)
          unaddressedNotifs++
        }
      })

      if (unaddressedNotifs === 0) {
        let notifItem =
          `
        <div class="alert alert-dark" role="alert"> You have <strong> 0 </strong> unaddressed notifications.
        </div>
          `
          $('#notifications').append(notifItem)
      }
    })
    .fail(err => {
      console.log('error when getting notifications', err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function acceptProjectInvitation(event) {
  event.preventDefault()
  $.ajax({
    method: 'get',
    url: baseUrl + '/users/accept-project-invitation/' + event.target.id,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(() => {
      Swal.fire('Success', 'Project invitation accepted!')
      checkToken()
    })
    .fail(err => {
      console.log('error during invitation accept', err.responseText)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function declineProjectInvitation(event) {
  event.preventDefault()
  $.ajax({
    method: 'get',
    url: baseUrl + '/users/decline-project-invitation/' + event.target.id,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(() => {
      Swal.fire('Success', 'Project invitation declined!')
      checkToken()
    })
    .fail(err => {
      console.log('error during invitation accept', err.responseText)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}