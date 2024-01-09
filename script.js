$(function () {
  var currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  var currentHour = dayjs().hour();

  // Load saved events from local storage
  function loadEvents() {
      $(".time-block").each(function () {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);
          var storedEvent = localStorage.getItem("event-" + blockHour);

          if (storedEvent) {
              $(this).find("textarea").val(storedEvent);
          }
      });
  }

  loadEvents(); // Load saved events on page load

  $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
          $(this).addClass("past");
      } else if (blockHour === currentHour) {
          $(this).addClass("present");
      } else {
          $(this).addClass("future");
      }
  });

  $(".saveBtn").on("click", function () {
      var blockHour = parseInt($(this).parent().attr("id").split("-")[1]);
      var eventText = $(this).siblings("textarea").val();

      // Save the event to local storage
      localStorage.setItem("event-" + blockHour, eventText);
  });
});