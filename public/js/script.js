$(function() {
    console.log("script loaded")

  $('#submitButton').on('click', function(e){
    e.preventDefault()
    var query = $('#bookQuery').val();
    console.log(query)
    $.ajax({
      "url": "https://www.googleapis.com/books/v1/volumes?q="+query,
      "method": "GET",
      "success": function(data){
        console.log(data)
        $('#results').empty();
        renderBookList(data);
      }
    })
  })

$('body').on("click", '.delete', function() {
  idtodelete = $(this).attr('data-id')
  var divtodelete = $(this);

  $.ajax({
    "url":"/books/delete",
    "method":"DELETE",
    "data":{id:idtodelete},
    "success":function(data){
      console.log(divtodelete)
      divtodelete.parent().remove()
    }
  })
})

    // when i click on a book to add to wish list
    // then call the ajax to my own server

    $('body').on("click", '.favorite_button', function() {
      var button = $(this);
      var data = {
        title: $(this).siblings('.title').text(),
        authors: $(this).siblings('.authors').text(),
        image: $(this).siblings('.image').attr('src'),
        email: $('.email').val()
      }
      console.log(data)

      $.ajax({
        url: '/books/create',
        type: 'POST',
        data: data,
        success: function(data){
          console.log('success', data)
          button.text("In Your Favorites")
        },
        error: function(error){
          console.log('success', error)
        }
      }) // ends ajax
    }) // ends click handler


  function renderBookList(data) {
    var resultDiv1 = $('<div class="resultsDiv">');
    resultDiv1.append($('<li class="title">').text(data.items[0].volumeInfo.title));
    resultDiv1.append($('<li class="authors">').text(data.items[0].volumeInfo.authors));
    resultDiv1.append($('<img class="image">').attr("src", data.items[0].volumeInfo.imageLinks.thumbnail));
    resultDiv1.append($('<button class="favorite_button">Add to Favorites</button>'))
    $('#results').append(resultDiv1);

     var resultDiv2 = $('<div class="resultsDiv">');
    resultDiv2.append($('<li class="title">').text(data.items[1].volumeInfo.title));
    resultDiv2.append($('<li class="authors">').text(data.items[1].volumeInfo.authors));
    resultDiv2.append($('<img class="image">').attr("src", data.items[1].volumeInfo.imageLinks.thumbnail));
    resultDiv2.append($('<button class="favorite_button">Add to Favorites</button>'))
    $('#results').append(resultDiv2);

      var resultDiv3 = $('<div class="resultsDiv">');
    resultDiv3.append($('<li class="title">').text(data.items[2].volumeInfo.title));
    resultDiv3.append($('<li class="authors">').text(data.items[2].volumeInfo.authors));
    resultDiv3.append($('<img class="image">').attr("src", data.items[2].volumeInfo.imageLinks.thumbnail));
    resultDiv3.append($('<button class="favorite_button">Add to Favorites</button>'))
    $('#results').append(resultDiv3);
  }


}); // ends doc ready


    // function googleGet(inputValue)

        // success function -> data from google
          // append the stuff to the page


    // when i click the submit button
    // then call the ajax to google books



    // function saveToWishList(bookData)
      // post request to your server
      // '/favBooks'
      // give it the book data


