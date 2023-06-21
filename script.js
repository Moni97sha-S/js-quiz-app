
// console.log("hi");
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
      const secQuiz = document.querySelector(".quiz");
      const form = document.querySelector(".quiz_form");
      form.append(quizContDiv)
      secQuiz.append(form);
    }
}

function loadUI(data){
  data.forEach((val, ind, arr)=>{
    
     const quizContDiv = document.querySelector(".quizContainer");
     // console.log(val.id)
    
    //Questions
    const quesDiv = document.createElement('div')
    quesDiv.classList.add("quesContainer");
    const p = document.createElement('p');
    p.classList.add("questions")
    p.textContent = `Q${val.id}. ${val.question}` ;
    quesDiv.append(p);
    quizContDiv.append(quesDiv);
    // console.log(data[0].options[0])
    /*quesDiv.insertAjacentHTML('afterbegin', `<hr />`) */
    // console.log(val.options[0])
  //console.log(data[ind].options[0])
   /* for(let i=0; i<data[ind].id.length;i++){
      for(let j=0; j<options[i].length;j++){
         // console.log(val.options[i]);
        console.log(data[i].options[j])
        $("input").val(data[i].options[j])
      }
    } */
    // Options
    val.options.forEach((option, ind) => {
      const optItem = optionCont(option, ind);
      quesDiv.append(optItem);
     // $('submit').click(function
      // console.log(option)
      // Add id Dynamically
        let myInput=0, myLabel=0;
        $(".opts").each(function(){
          myInput+=1;
          $(this).attr({
            id:myInput
          });
        });
        $(".optLabel").each(function(){
          myLabel+=1;
          $(this).attr("for", myLabel);
        });
      
      let ansTextLabel = document.querySelectorAll('.optLabel');
      // console.log($('.optLabel')[5];
      //  let dataCount = 0;
  
      for(let i=0;i < ansTextLabel.length; i++){
        // console.log(ansTextLabel[5])
        // ansTextLabel[i].setAttribute('onclick', "optionSelected(ansTextLabel)
        ansTextLabel[i].setAttribute('onclick', optionSelected(ansTextLabel));
      }
      var dataCount = 0;
      function optionSelected(ans){
        let userAns = ans.textContent;
        let correctAns = val.answer
        console.log(userAns);
        // console.log(correctAns);
        // return userAns
        if(userAns == correctAns) {
          console.log('answer is correct');
          //ans.classList.add("correct");
        }else{
          console.log('answer is wrong')
          // ans.classList.add("incorrect");
        }
      }
      // console.log(data[dataCount])
      
      // btn.addEventListener('click', () => {})
      
    //   console.log(quesDiv);
    //   
    //   const scoreCardDiv = document.querSelector('.scoreCard')
      
    //   ansTextLabel.addEventListener('click', () => {
    //     let mark = 0;
    //     if(optIndex === val.answer){
    //       mark+=1;
    //     }else{
    //       option == false;
    //     }
    //   });
    });
    

    $(quesDiv).append($("<hr />"));
    
/***********************************************************
    console.log(val.options.length)
    indexes= val.options.length*5
    for(let i=0; i<indexes; i++){
        $('input').attr('id', `${indexes}`)
    }
     */

    function optionCont(option, ind){
      const divOpt = document.createElement("div");
      divOpt.classList.add("option");
      divOpt.insertAdjacentHTML('afterbegin', `
        <label class="optLabel">
        <input type="radio" name="check_${val.id}" class="opts"></input>
        ${option}
        </label>
      `);
      return divOpt;
   }
    
});

  function scoreCounter(mark){
        const scoreTotal = document.querySelector('.marks');
        mark++;
        scoreTotal.textContent = `${mark}/${data.length}`
  };
  return quizContDiv;
};
 




