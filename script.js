
console.log("hi");
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
    //   console.log(secTag);
    }
}
function loadUI(data){
  data.forEach((val, ind, arr)=>{
    const secQuiz = document.querySelector(".quiz");
     const quizContDiv = document.querySelector(".quizContainer");
 
    //Questions
    const quesDiv = document.createElement('div')
    quesDiv.classList.add("quesContainer");
    const p = document.createElement('p');
    p.classList.add("questions")
    p.innerText = `Q${val.id}.` + val.question;
    quesDiv.append(p);
    
    quizContDiv.append(quesDiv);
   
    //quesDiv.insertAjacentHTML('afterbegin', `<hr />`)
  
    // Options
    val.options.forEach(option => {
      const optItem = optionCont(option, ind );
      quesDiv.append(optItem);
      console.log(quesDiv);
    //   const ansTextLabel = optItem.querySelector('label');
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
    // quizcont.append(divOpt);
    //  
    secQuiz.append(quizContDiv);
 })
}

function optionCont(option, ind){
    const divOpt = document.createElement("div");
    divOpt.classList.add("option");
    divOpt.insertAdjacentHTML('afterbegin', `
      <label for="radBtns${ind}">
      <input type="radio" id="radBtns${ind}" name="Choice_${ind}"></input>
      ${option}
      </label>
    `);
  return divOpt;
}



