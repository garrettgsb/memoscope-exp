$(document).ready(function(){
  console.log(`Loaded card-new.js`);

var editBox = "<textarea class='edit-mode' rows='6' cols='80'>";
var redLight

function editMode(text) {
  console.log(text)
  $(".highlight-bar").css("display", "none")
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
    $(".highlight-bar").css("display", "none")
    $(".render-light").addClass('is-primary');
    $(".edit-light").removeClass('is-danger');
    $(".highlight-light").removeClass('is-primary');
    $("h5").text(text).css('display', 'inline-block');
    $(".edit-mode").remove();
  }


// When the user clicks on the "highlighter" button
  function highlightMode(){
    console.log(`Highlight Mode: ${window.getSelection().toString()}`);
    var selection = window.getSelection();
    $(".card").on('mouseup', function(){
      if(window.getSelection().toString().length > 0) {
        selection = window.getSelection();
      }
    })
    $(".highlight-bar").css("display", "inline");
    $(".highlighter-red").on('click', function(){
      console.log(`Red Button: ${selection.toString()}`);
      highlightText($(".highlighter-red"));
    });
    $(".highlighter-blue").on('click', function(){
      console.log(`Blue Button: ${selection.toString()}`);
      highlightText($(".highlighter-blue"));
    })
    $(".highlighter-green").on('click', function(){
      console.log(`Green Button: ${selection.toString()}`);
      highlightText($(".highlighter-green"));
    })
    $(".highlighter-yellow").on('click', function(){
      console.log(`Yellow Button: ${selection.toString()}`);
      highlightText($(".highlighter-yellow"));
    })
  }
// End highlighter

// Highlighter click action
function highlightText(color){
  var fullText = window.getSelection().anchorNode.data;
    // Index start/end of selected area
  var start = window.getSelection().anchorOffset;
  var end = window.getSelection().focusOffset;
  console.log(`One day, this will highlight ${fullText.slice(start, end)} in ${color}`);
}


// When the user clicks on an 'editable' area.
// Right now, they can only click the 'edit'
// button to enter this mode. Including the
// card and content area interferes with
// click+drag, so more code would need to be
// written to handle that.
$(".edit-light").on('click', function(){
  console.log("clicked!")
  editMode($("h5").text());
  return $("textarea").on('blur', function(){
    $(".highlight-bar").css("display", "none")
    renderMode($("textarea").val());
  });
})


// User clicks the 'Highlight' button
$(".highlight-light").on('click', function(){
  console.log("Clicked highlight button");
  highlightMode()
  });


// Create the highlighter panel, but don't
// render it until the button is clicked.
$(".highlight-bar").css("display", "none")

});
