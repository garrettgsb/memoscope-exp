$(document).ready(function(){
  console.log(`Loaded card-new.js`);

var editBox = "<textarea class='edit-mode' rows='6' cols='80'>";

function editMode(text) {
  console.log(text)
  $(".edit-light").addClass('is-danger');
  $(".render-light").removeClass('is-primary');
  $(".highlight-light").removeClass('is-primary');
  $("h5").after(editBox);
  $("textarea").text(text);
  $(".render-mode").css('display', 'none');
  $("textarea").focus();
}

  function renderMode(text){
    console.log(text);
    $(".render-light").addClass('is-primary');
    $(".edit-light").removeClass('is-danger');
    $(".highlight-light").removeClass('is-primary');
    $("h5").text(text).css('display', 'inline-block');
    $(".edit-mode").remove();
  }

$(".editable").on('click', function(){
  console.log("clicked!")
  editMode($("h5").text());
  return $("textarea").on('blur', function(){
    console.log("blurred!");
    renderMode($("textarea").val());
  });
})

});
