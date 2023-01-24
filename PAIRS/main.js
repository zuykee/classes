import Card from './card.js'
  
   let form = document.querySelector('.field-size');
    let input = document.querySelector('.input');
    let field = document.querySelector('.field-container');
    let timer = document.querySelector('.timer');
    let cards = [];
    let mainDeck = [];
    let doublesDeck = [];
    let matDeck = [];
    let fieldSize = new Number;
    let comparsion = [];
    

    form.addEventListener('submit',function(e){
        e.preventDefault();
        field.innerHTML = '';
        cards.length = 0;
        mainDeck.length = 0;
        doublesDeck.length = 0;
        matDeck.length = 0;
        let int;
        initiate();
        
        function initiate() {
            clearInterval(int);
            timer.textContent = parseInt(59);
            int = setInterval(countdown,1000); 
          };
          
          function countdown() {
            if (timer.textContent >0) {
              timer.TextContent = timer.textContent--;
            } else {
              clearInterval(int);
              alert('Время вышло!');
              field.innerHTML = '';
            }
          };
          
       
        if(input.value<2 || input.value>10) {
            fieldSize = 4;
        } else{
            fieldSize = parseInt(input.value);
        };
        field.style.gridTemplateColumns = 'repeat(' + fieldSize +', '+ (100/fieldSize)/2+'%)';
        let evenOddCheck = (fieldSize%2 == 0) ? (((fieldSize**2/2))+1) : (Math.ceil(fieldSize**2/2));
       
       for(let i = 1;i<evenOddCheck;i++){
           mainDeck.push(i);
       };
       doublesDeck = mainDeck.slice(0);
       
       if (fieldSize%2 == 0) {
           cards = cards.concat(mainDeck,doublesDeck).sort(() => Math.random() - 0.5);
       } else {

       cards = cards.concat(mainDeck,doublesDeck).sort(() => Math.random() - 0.5);
       cards.splice((cards.length/2),0,0);
       
   }
   for(let card of cards) {
    matDeck.push(new Card(field, card, flip));
    
}
console.log(cards);

function flip(card) {

    if (comparsion.length <1){
                    comparsion.push(card);
                    console.log(comparsion);
                    } else {
                        comparsion.push(card);
                        console.log(comparsion);
                            if (comparsion[0].number == comparsion[1].number) {
                                comparsion.forEach(n => n.success = true);
                                comparsion = [];   
                               
                                if((document.querySelectorAll('.card-container.solved').length == (cards.length) && cards.length%2 !==1) || (document.querySelectorAll('.card-container.solved').length == (cards.length-1) && cards.length%2 ==1)){
                                  let congrats = setTimeout(() =>{
                                  alert('Победа!')},1000
                                  ) ;
                                } 
                                
                            }   else    {
                             
                                    
                                
                         let delay = setTimeout(() => {
                            comparsion.forEach(n => n.open = false);
                            comparsion = [];
                            }, 1000);                       
                               
                           
                                    
                                };  
                                  
                                    
                                    return comparsion;
    
                            };


  
                        }
                          

    });