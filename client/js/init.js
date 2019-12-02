document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var float = document.querySelectorAll('.fixed-action-btn');
  M.FloatingActionButton.init(float);

  var date = document.querySelectorAll('.datepicker');
  M.Datepicker.init(date);

  var multiple = document.querySelectorAll('select');
  M.FormSelect.init(multiple);

  var time = document.querySelectorAll('.timepicker');
  M.Timepicker.init(time);
});

var tooltip = document.querySelectorAll('.tooltipped');
M.Tooltip.init(tooltip);