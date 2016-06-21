
var cc_element = $(".card-content");
var cc_text = cc_element.text();

var pre = cc_text.substr(0, left);
var mid = cc_text.substr(left, right-left);
var post = cc_text.substr(right, tt.length);

// let's write the function that should be called when the highlight color is clicked.
// (assumes we already have cached the selection)
//
// We are going to maintain a list of color ranges, like this:
  [[0, 5, 'blue'], [5, 6, 'red'], [6, 19, null]]
//
// Every time the user clicks a color, we're going to calculate how to update the
// above range, and then we're going to use that to re-render the entire displayed text.
//
// Initially, our range is
  var rangeSet = [[0, cc_text.length, null]]
  // start at index 0
  // end-just-before index=length
  // current class = null

// Three sub-problems:
//  1) identify what got Highlighted
//  2) rewrite our color ranges
//  3) render new HTML





// some variables defined outside this scope:
var cc_element, cc_text, rangeSet;

function updateHighlight(selection, color){
  // assume that we have the variable "selection" from some previous step
  //  (selection is from 'selection = window.getSelection()')
  // (color is from what button was clicked)

  function updateRangeSet(rangeSet, new_left, new_right, new_color){
    var answer = [];
    rangeSet.forEach(function(old_range, idx){
      [old_left, old_right, old_color] = old_range;  // fancy destructuring, might not work in old browsers
      if (old_right < new_left || new_right < old_left){ // no overlap:  OONN or NNOO
        answer.push(old_range);
      } else if (new_left < old_left && old_right < new_right) { // old range is enveloped: N O O N
        // do nothing.  thank you, come again.
      } else if (new_left < old_left && ) { // must be N O N O
        answer.push([new_left, new_right, new_color]);
        answer.push([new_right, old_right, old_color]);
      } else { // must be ONNO or ONON
        if (old_right < new_right){ // must be ONON
          answer.push([old_left, new_left, old_color]);
          answer.push([new_left, new_right, new_color]);
        } else { // at long ast, must be ONNO
          answer.push([old_left, new_left, old_color]);
          answer.push([new_left, new_right, new_color]);
          answer.push([new_right, old_right, old_color]);
        }
      }
    }) // end forEach
    return answer;
  }

  function getTrueOffset(root, child_node, child_offset){
    if (root.childNodes.length == 1 && root.childNodes[0] == child_node){
      return child_offset;
    } else {
      var foundIt = false;
      var preceeding = root.childNodes.reduce(function(previousValue, currentValue){
        if (foundIt){
          return previousValue;
        } else if (currentValue === child_node.parent) {
          foundIt = true;
          return previousValue;
        } else {
          return previousValue + currentValue.text().length;
        }
      }, 0);
      return preceeding + child_offset;
    }
  }


  var trueAnchorOffset = getTrueOffset(cc_element, selection.anchorNode, selection.anchorOffset);
  var trueFocusOffset = getTrueOffset(cc_element, selection.focusNode, selection.focusOffset);
  var left = Math.min(trueAnchorOffset, trueFocusOffset);
  var right = Math.max(trueAnchorOffset, trueFocusOffset);

  rangeSet = updateRangeSet(rangeSet, left, right, color);  // TODO: Garrett, get color from somewhere

  // This is where we render our highlit text.
  cc_element.html(rangeSet.map(function(range){
    var text_fragment = cc_text.substr(range[0], range[1]);
    var newclass = range[2] || "";
    return "<span class='chunk " + newclass + "'>" + text_fragment + "</span>";
  }).join(''));

}
