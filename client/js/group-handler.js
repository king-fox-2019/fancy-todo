let groups = []

function fetchGroup(access_token) {
  toast('Loading')
  $.ajax(`${baseUrl}/user/groups`, {
    method: 'GET',
    headers: {
      access_token
    }
  })
    .done(({ data }) => {
      groups = data
      enlistGroups()
      Swal.close()
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON, 5000)
    })
}

function enlistGroups() {
  $('#group-list').empty()
  for (const group of groups) {
    $('#group-list').append(`
      <tr>
        <td>${group.name}</td>
        <td>${group.leader.username}</td>
        <td>${group.members.length}</td>
      </tr>
    `)
  }
}

function onCreateGroup(e) {
  if (e) e.preventDefault()
  $('#btn-group-create').empty().append(`
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Creating...
  `)
  const groupName = $('#group-list-page #group-name')
  if (!groupName.val()) {
    groupName
      .addClass('is-invalid')
      .focusin(() => groupName.removeClass('is-invalid'))
    $('#btn-group-create')
      .empty()
      .append('Create New Group')
    return false
  }
  const access_token = localStorage.getItem('access_token')
  $.ajax(`${baseUrl}/groups`, {
    method: 'POST',
    headers: { access_token },
    data: {
      name: groupName.val()
    }
  })
    .done(({ data }) => {
      toast('New group created', 3000)
      $('#btn-group-create')
        .empty()
        .append('Create New Group')
      groups.push(data)
      enlistGroups()
    })
    .fail(({ responseJSON }) => {
      toast(responseJSON, 5000)
      $('#btn-group-create')
        .empty()
        .append('Create New Group')
    })
    .always(() => {
      groupName.val('')
    })
  return false
}
