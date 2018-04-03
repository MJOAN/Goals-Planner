$(function() {

// CREATE
  $("#creategoal").on("submit", function(event) {
    event.preventDefault();

    var newGoal = {
      goal: $("#creategoal [name=goal]").val().trim()
    };
    console.log("create goal button works", newGoal)

    $.ajax("/goal", {
      type: "POST",
      data: newGoal
    }).then(
      function() {
        console.log("created new goal");
        location.reload();
      }
    );
  });

// UPDATE
  $("#updategoal").on("submit", function(event) {
    event.preventDefault();

    var id = $("[name=id]").val().trim();
    //var id = $(this).data("id");
    console.log("update button works for id: ", id)

    var updatedGoal = {
      goal: $("#updategoal [name=goal]").val().trim()
    };
    
    console.log("update button works", updatedGoal)

    $.ajax("/goals/" + id, {
      type: "PUT",
      data: updatedGoal
    }).then(
      function() {
        console.log("updated id: ", id);
         console.log("updated goal: ", updatedGoal)
        location.reload();
      }
    );
  });

  // DELETE 
  $(".delgoal").on("click", function(event) {
    event.preventDefault();

    console.log("button done clicked")
    var id = $(this).data("id");
    console.log("delete button id: ", id)

    //var id = $(this).data("id"); // ha, all my attempts right here
    //var id = $(".delgoal").data("data-id");
    // var id =  $(".delgoal").attr("data-id"); 
    //var id = this.data; // data-goalid="{{this.id}}
    
    $.ajax("/goals/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id: ", id);
        location.reload();
      }
    );
  });

});