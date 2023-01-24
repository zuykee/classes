 export default class Card {
    _open = false
    _success = false

    constructor( container, number, action) {
        let back = document.createElement("div");
        let front = document.createElement("div"); 
        
        this.card = document.createElement('div');
        this.card.classList.add('card-container');
        container.append(this.card); 
        this.card.appendChild(front);
        front.classList.add('card-face', 'card-source');
        front.style.width = this.card.style.width;
        front.style.height = this.card.style.height;
        this.card.appendChild(back);
        back.classList.add('card-cover', 'card-source');
        back.style.width = this.card.style.width;
        back.style.height = this.card.style.height;
        front.textContent = number;
        this.number = number;
        if (front.textContent==0) {
                       this.card.removeChild(back);
                       this.card.style.pointerEvents = "none";
                       front.classList.remove('card-front');
          }

          this.card.addEventListener('click', () => {
            if(this.open == false && this.success == false) {
                this.open = true
                action(this);
            }
          })
                   
    }

    set open(value) {
        this._open = value;
        value ? this.card.classList.add('is-flipped') : this.card.classList.remove('is-flipped')
    }

    get open() {
        return this._open
    }

    set success(value) {
        value ? this.card.classList.add('solved') : this.card.classList.remove('solved')
    }

    get success() {
        return this._success;
    }
}

