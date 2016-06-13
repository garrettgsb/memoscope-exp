$(document).ready(function(){
  console.log(`Loaded card-new.js`);

var editBox = "<textarea class='edit-mode' rows='6' cols='80'>";
var editModeTag = `<span class="tag is-danger edit-mode"><i class="fa fa-edit"></i>&nbsp Edit Mode</span><p class="edit-mode"><small>Click outside of text box to stop editing</small></p>`;
var renderModeTag = `<span class="tag is-info render-mode"><i class="fa fa-eye"></i>&nbsp Render Mode</span><p class="render-mode"><small>Click text to edit</small></p>`;

function editMode(text) {
  console.log(text)
  $(".card").prepend(editModeTag);
  $("h5").after(editBox);
  $("textarea").text(text);
  $(".render-mode").css('display', 'none');
  $("textarea").focus();
}

  function renderMode(text){
    console.log(text);
    $("span.render-mode").css('display', 'inline');
    $("p.render-mode").css('display', 'block');
    $("h5").text(text).css('display', 'inline-block');
    $(".edit-mode").remove();
  }

$("h5").on('click', function(){
  console.log("clicked!")
  editMode($(this).text());
  return $("textarea").on('blur', function(){
    console.log("blurred!");
    renderMode($("textarea").val());
  });
})

$(".content.editable").prepend(renderModeTag);

});
