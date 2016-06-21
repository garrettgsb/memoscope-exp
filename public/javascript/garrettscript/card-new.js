$(document).ready(function(){
  console.log(`Loaded card-new.js`);

  var editBox = "<textarea class='edit-mode' style="word-break: break-word;", rows='6' cols='80'></textarea>";
  var redLight

  function editMode(text) {
    // TODO: cleanup bad event handlers from other modes (e.g. highlight mode handlers)
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
    // TODO: cleanup bad event handlers from other modes
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
  // TODO: cleanup bad event handlers from other modes
  console.log(`Entering Highlight Mode: ${window.getSelection().toString()}`);
  var selection = window.getSelection();
  var cc_element = $("#card-content");
  var cc_text = cc_element.text();
  var rangeSet = [[0, cc_text.length, null]]; // overwrite old highlight rules, if any
  var answer = [];

  $("#card-content").on('mouseup', function(e) {
    if(e.target == $("#card-content")) {
      console.log(`Mouseup highlighted ${selection}`)
      // console.log(e.target);
      selection = window.getSelection();
    }
  });

  $(".highlight-bar").css("display", "inline");


  //TODO: This OBVIOUSLY needs refactoring.
  $(".highlighter-red").on('mousedown', function(){
    updateHighlight("highlighter-red");
  });

  $(".highlighter-blue").on('mousedown', function(){
    updateHighlight("highlighter-blue");
  });

  $(".highlighter-green").on('mousedown', function(){
    updateHighlight("highlighter-green");
  });

  $(".highlighter-yellow").on('mousedown', function(){
    updateHighlight("highlighter-yellow");
  });

  function updateHighlight(color){
    // assume that we have the variable "selection" from some previous step
    //  (selection is from 'selection = window.getSelection()')
    // (color is from what button was clicked)

    function updateRangeSet(rangeSet, new_left, new_right, new_color){
      console.log("in updateRangeSet, with left and right of: ", new_left, new_right);
      var answer = [];
      var pushedNew = false;
      rangeSet.forEach(function(old_range, idx){
        [old_left, old_right, old_color] = old_range;  // fancy destructuring, might not work in old browsers
        if (old_right < new_left || new_right < old_left){ // no overlap:  OONN or NNOO
          console.log("no overlap, push!");
          answer.push(old_range);
        } else if (new_left < old_left && old_right < new_right) { // old range is enveloped: N O O N
          // do nothing.  thank you, come again.
          console.log("subsummmmmmed");
        } else if (new_left < old_left) { // must be N O N O
          if (!pushedNew){
            answer.push([new_left, new_right, new_color]);
            pushedNew = true;
          }
          answer.push([new_right, old_right, old_color]);
        } else { // must be ONNO or ONON
          if (old_right < new_right){ // must be ONON
            answer.push([old_left, new_left, old_color]);
            if (!pushedNew){
              answer.push([new_left, new_right, new_color]);
              pushedNew = true;
            }
          } else { // at long ast, must be ONNO
            answer.push([old_left, new_left, old_color]);
            if (!pushedNew){
              answer.push([new_left, new_right, new_color]);
              pushedNew = true;
            }
            answer.push([new_right, old_right, old_color]);
          }
        }
      }) // end forEach
      return answer;
    }

    function getTrueOffset(parentish, child_node, child_offset){
      // console.log("in getTrueOffset");
      // console.log(parentish);
      // console.log(child_node);
      if (parentish.childNodes.length == 1 && parentish.childNodes[0] == child_node){
        return child_offset;
      } else {
        var foundIt = false;
        var preceeding = Array.from(parentish.childNodes).reduce(function(previousValue, currentValue, currentIndex){
          // console.log("on chunk " + currentIndex);
          // console.log(currentValue);
          // console.log(child_node.parentNode == currentValue);
          if (foundIt){
            return previousValue;
          } else if (currentValue == child_node.parentNode) {
            foundIt = true;
            return previousValue;
          } else {
            var currLen = $(currentValue).text().length;
            // console.log("currentValue is " + currentValue + ", so adding " + currLen);
            return previousValue + currLen;
          }
        }, 0);
        // console.log("preceeding is " + preceeding);
        return preceeding + child_offset;
      }
    }


    var trueAnchorOffset = getTrueOffset(cc_element[0], selection.anchorNode, selection.anchorOffset);
    var trueFocusOffset = getTrueOffset(cc_element[0], selection.focusNode, selection.focusOffset);
    var left = Math.min(trueAnchorOffset, trueFocusOffset);
    var right = Math.max(trueAnchorOffset, trueFocusOffset);

    rangeSet = updateRangeSet(rangeSet, left, right, color);  // look, our color parameter gets used!
    console.log(JSON.stringify(rangeSet));

    // This is where we render our highlit text.
    cc_element.html(rangeSet.map(function(range){
      var text_fragment = cc_text.substr(range[0], range[1]-range[0]);
      var newclass = range[2] || "";
      return "<span class='chunk " + newclass + "'>" + text_fragment + "</span>";
    }).join(''));

  }
}
// End highlighter

// Highlighter click action
function highlightText(color){

  var fullText = $("#card-content").text();
  // var fullText = window.getSelection().anchorNode.data;
    // Index start/end of selected area
  var start = window.getSelection().anchorOffset;
  var end = window.getSelection().focusOffset;
  var newString = fullText.slice(0,start)
                  + "<span class='"
                  + color
                  + "'>"
                  + fullText.slice(start, end+1)
                  + "</span>"
                  + fullText.slice(end+1);
  $("h5").html(newString);
  console.log(newString);
}

function sendErOff() {
  //TODO: When multiple users are a thing,
  //      include UserId in the JSON.
  var cardContent = $("#card-content").html();
  var deck = $("select").val();
  var returnVal = JSON.stringify({
    content_html: cardContent,
    deck: deck,
    user_id: 1 //TODO: Replace with actual session ID... Or delete, depending on how we implement it.
  });
  $.ajax({
    type: 'post',
    data: returnVal,
    url: '/cards/create',
    contentType: 'application/json',
    dataType: 'json'
  });
  console.log(returnVal);
}




// When the user clicks on an 'editable' area.
// Right now, they can only click the 'edit'
// button to enter this mode. Including the
// card and content area interferes with
// click+drag, so more code would need to be
// written to handle that.
$(".edit-light").on('click', function(){
  console.log("clicked!")
  editMode($("#card-content").text());
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

$("#submit-button").on('click', function(){
  sendErOff();
})


// Writing a new deck in the text box and clicking "add"
// will add it to the list of decks and select it automatically.
// Then it follows the same flow as a regular deck selection
// when submitted.
$("#add-new-deck").on('click', function(){
  if ($("#add-deck-name").val()) {
  console.log(`Clicked with ${$("#add-deck-name")}`);
  var newDeckName = $("#add-deck-name").val();
  console.log(newDeckName);
  $("select").append(`<option>${newDeckName}</option>`);
  $("select").val(newDeckName);
};
})

// Create the highlighter panel, but don't
// render it until the button is clicked.
$(".highlight-bar").css("display", "none")

});
