
// console.log("hi");
document.addEventListener("DOMContentLoaded", function(event) {     
   // copy code here
    const secQuiz = document.querySelector(".quiz");
    const form = document.querySelector("#quiz_form");
    const quizContDiv = document.querySelector(".quizContainer");
    const quesDiv = document.querySelector('.quesContainer');
    const mark = document.querySelector('.scoreCard .marks');
    const outOfMarks = document.querySelector(".scoreCard .out-of-marks");
    const hr = document.querySelector(".hr");
    const btn = document.querySelector('.btn');
    let score = 0;
  
    // Fetch API
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET','https://5d76bf96515d1a0014085cf9.mockapi.io/quiz');
    xhttp.send();
    xhttp.addEventListener('readystatechange', onReadyStateChange);

    function onReadyStateChange(e){
        e.preventDefault();
        if(e.target.readyState === 4 && e.target.status === 200){
          const datum = JSON.parse(e.target.responseText);
          // console.log(datum);
          loadUI(datum);
          
          form.append(quizContDiv);
          form.append(btn);
          secQuiz.append(form);
        
        }
    }

  // App Creation
  function loadUI(data){
    data.forEach((val, ind, arr)=>{ 
      let a = [];
      let r = val.answer;
      a.push(r);
      // console.log(typeof r);
      // answer from json
    /* val.answer.forEach((ans) => {
        console.log(ans);
      }) */
      
      //Questions
      const p = document.createElement('p');
      p.classList.add("questions")
      p.textContent = `Q${val.id}. ${val.question}` ;
      quesDiv.append(p);
      quizContDiv.append(quesDiv);
      let answer = val.answer;
      
      // Options
      val.options.forEach((option, ind) => {
        const optItem = optionCont(option, ind);
        quesDiv.append(optItem);
      });
      
      // Line-Break
      $("hr").addClass("hr")
      $(quesDiv).append($("<hr />"));
      
      // Rendering Options
      function optionCont(option, ind){
        const divOpt = document.createElement("div");
        divOpt.classList.add("options");
        divOpt.classList.add(`option${ind}`);
        // optionSelected(answer,ind)
        // console.log(ind)
        divOpt.insertAdjacentHTML('afterbegin', `
          <label for=${ind} class="optLabel">
          <input type="radio" id=${ind} value=${option} name="check_${val.id}" class="opts"></input>
          ${option}
          </label>`);
        return divOpt;      
      };
    });
    
    // Submit btn functionality
    const btn = document.querySelector(".btn");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const checkedAnswer = optionSelected();
      
        //console.log(data[i].answer);
      // console.log(typeof data[0].answer); -> Number
      // console.log(typeof checkedAnswer[0]); -> String
      // console.log(checkedAnswer); 
      // console.log(typeof checkedAnswer); -> Object
      // console.log(checkedAnswer[0]); 
      
        for(let i=0; i<data.length; i++){
              const checkedAnsNum = Number(checkedAnswer[i]);
          if(checkedAnsNum === data[i].answer){
            score++;
            // console.log(score);
          }
          updateScoreBoard();
          e.target.form.style.display='none';
        };
          /* if(e.target.getAttribute('name').value){
          optionSelected(e.target.getAttribute('name').value)
          }else{} */
      });
    return quizContDiv;
  };
  // User Selected Option
  function optionSelected(){
      let userAns = [];
      const ansInput = document.querySelectorAll(".opts");
        for(const currAnsElem of ansInput){
          if(currAnsElem.checked){
            userAns.push(currAnsElem.id);
          }  
        };  
    return userAns;
  };

  function updateScoreBoard(){
    mark.innerText = score;
  };

});
  
    
  
