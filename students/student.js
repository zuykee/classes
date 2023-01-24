export default class Student {
    constructor(name, midName, surname, admission, birthDate, faculty){
        this.name = name
        this.midName = midName
        this.surname = surname
        this.admission = admission
        this.birthDate = birthDate
        this.faculty = faculty
        this.now = new Date();
    }
         get fullName() {
            return (this.surname + ' ' +this.name + ' ' + this.midName);
          }  

         studyingOrNot() {
            
            let yearsOfStudying = this.now.getFullYear()-this.admission
            if (yearsOfStudying>=4 && this.now.getMonth()>8) {
                
                return (this.admission+'-'+(Number(this.admission)+4)+'(Закончил)');
            } else if (yearsOfStudying==0) {
                yearsOfStudying++;
                return (this.admission+'-'+(this.admission+4)+'(1 курс)');
            } else {
                
                return (this.admission+'-'+(Number(this.admission)+4)+'('+yearsOfStudying+' курс)');
            };
    
        }

         getAge(string) {
           
            let birthDate = new Date(string);
            
            let age = this.now.getFullYear() - birthDate.getFullYear();
            let m = this.now.getMonth() - birthDate.getMonth();
            let d = this.now.getDay() - birthDate.getDay();
            let birthMonth = (birthDate.getMonth() <=8) ? '0'+ (birthDate.getMonth()+1) : birthDate.getMonth()+1;
            let birthDay = (birthDate.getDate() <=8) ? '0'+ (birthDate.getDate()) : birthDate.getDate();
            if (m < 0 || (m === 0 && this.now.getDate() < birthDate.getDate())) {
                age--;
            }
            if ( age === 0 ) {
                m = 12 + m;
                if (d < 0 || (d === 0 && this.now.getDate() < birthDate.getDate())) {
                    m--;
                }
            }
        
            return birthDay + '.'+ birthMonth + '.'+ birthDate.getFullYear() +'('+ age+' годика)' ;
        }

    }
    


 