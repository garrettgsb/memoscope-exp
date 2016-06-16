queryParams('SELECT * FROM users WHERE username = 'shark_week';', [], function (err, users) { console.log(users) });

queryParams('SELECT * FROM decks WHERE id = $1',
            [1],
            function(err, myCards){
            if (myCards.rows.length > 0) {
              console.log(myCards.rows[0].id);
              console.log(myCards.rows[0].name);
              }
            else
              { console.log("Derp!"); };
          });
queryParams('SELECT * FROM cards',
            [],
            function(err, myCards){
            console.log(myCards);
          });


function queryParams(params) { do stuff }

var a = "whatever";
queryParams("SELECT * FROM decks WHERE id = $1", [1],
  function(err, result){
    if (result.rows[0]) {
      console.log(`Result is: ${result.rows[0].id}`);
      a = result.rows[0].id
    }
    else {
      console.log("Not found :\\");
      // Create card, and return that buddy's ID.
    }
  })
