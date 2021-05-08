$(function(){
  var questionDiv = $("#questions-div");

  var timer;
  
  var game = {
    correct: 0,
    wrong: 0,
    timeLeft: 10,
    countdown: function(){
      game.timeLeft--;

      var seconds = $("#seconds");
      seconds.text(game.timeLeft);

      if(game.timeLeft === 0){
        game.done();
      }
    },
    start: function() {
      timer = setInterval(this.countdown, 1000);
      $("#start-btn").remove();

      var timeDiv = $("<h2>");
      timeDiv.html(`Time remaining: <span id="seconds">10</span>`);
      questionDiv.append(timeDiv);

      for(let i = 0; i < questions.length; i++){
        var question = $("<p>")
        question.text((i+1) + ". " + questions[i].question);
        questionDiv.append(question);

        for(let j = 0; j < questions[i].choices.length; j++){
          var choice = $(`<input>`);
          choice.attr("type", "radio");
          choice.attr("id", `${i}${j}`);
          choice.attr("name", `${i}`);
          choice.attr("value", `${questions[i].choices[j]}`)

          var choiceLabel = $(`<label>`)
          choiceLabel.attr("for", `${i}${j}`)
          choiceLabel.text(`${questions[i].choices[j]}`);
          
          questionDiv.append(choice);
          questionDiv.append(choiceLabel);

        }
      }

      var doneBtn = $("<button>");
      var doneBtnDiv = $("<div>");
      doneBtn.text("Done");
      doneBtn.attr("id","done-btn");
      doneBtnDiv.append(doneBtn);
      questionDiv.append(doneBtnDiv);
    },
    done: function(){
      clearInterval(timer);
      var inputs = questionDiv.children("input:checked");
      for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === questions[i].answer){
          game.correct++;
        } else {
          game.wrong++;
        }
      }
      game.result();
    },
    result: function(){
      questionDiv.remove();
      var gameContainer = $("#game-container");
      var resultDiv = $("<div>");
      var correctScore = $("<h2>");
      var wrongScore = $("<h2>");

      correctScore.text(`Correct Answers: ${game.correct}`);
      wrongScore.text(`Incorrect Answers: ${game.wrong}`);
      resultDiv.append(correctScore);
      resultDiv.append(wrongScore);
      gameContainer.append(resultDiv);
    }
  }

  $(document).on("click","#start-btn",function (){
    game.start();
  });

  $(document).on("click","#done-btn",function (){
    game.done();
  });
});