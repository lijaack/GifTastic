$( document ).ready(function() {


var animals = ["dogs", "frogs", "chickens", "cats", "birds", "hippos", "cheetahs", "tigers", "lions"];

renderButtons();


$("#add-animal").on("click", function(){
    event.preventDefault();
    var animalInput = $("#animal-input").val().trim();
    if (animalInput.length != 0){
        animals.push(animalInput)
        renderButtons();
        $("#animal-input").val("")
    }
})

function animalButton(){
    $(".animalButton").on("click", function(){
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=1OVQSHuHES8E7WZ8cw67VG1Y38xBawCS&limit=10";
        $("#animal-gifs").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response.data);
            var gifArray = response.data;
            for (var i = 0; i < gifArray.length; i++){
            
                var rating = gifArray[i].rating;
                var imgActive = gifArray[i].images.fixed_height.url;
                var imgStill = gifArray[i].images.fixed_height_still.url;
                var imgDiv = $("<div class=img-div>");
                var imgHere = $("<img>");
                var pHere = $("<p>");

                pHere.addClass("rating");
                pHere.text("rating: " + rating);
                imgHere.attr("src", imgStill);
                imgHere.addClass("gif")
                imgHere.attr("data-still", imgStill);
                imgHere.attr("data-active", imgActive);
                imgHere.attr("data-status", "still");
                imgDiv.append(pHere);
                imgDiv.append(imgHere);

                $("#animal-gifs").append(imgDiv);

            

            }     
            $(".gif").on("click", function(){
                console.log("hello");
                var status = $(this).attr("data-status");
                var still = $(this).attr("data-still");
                var active = $(this).attr("data-active");
            
                var thisImg = $(this);
                if (status === "still"){
                    thisImg.attr("src", active);
                    thisImg.attr("data-status", "active");
                }   else {
                    thisImg.attr("src", still);
                    thisImg.attr("data-status", "still");
                }
            })      
        })
    })

};

function renderButtons(){
    $("#buttons-view").empty();
    for (var i = 0; i < animals.length; i++){
        var newAnimal = animals[i];
        var newButton = $("<button>");
        newButton.attr("data-name", newAnimal);
        newButton.addClass("animalButton")
        newButton.text(newAnimal);
        $("#buttons-view").append(newButton);
    }
    animalButton();
}



















});
