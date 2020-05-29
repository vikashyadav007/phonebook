function addListener(){
    document.querySelectorAll('.collapsible')
    .forEach(button =>{
        button.addEventListener('click',(e)=>{
            const content = button.nextElementSibling;
            e.stopPropagation();
            button.classList.toggle('.active')
            
            if(content.style.display ==='block'){
                content.style.display = 'none';
                button.children[0].style.borderBottom= '1px solid black'
                button.children[0].children[1].classList.remove('fa-caret-up')
             button.children[0].children[1].classList.add('fa-caret-down')
             content.style.backgroundColor = 'white'
             button.children[0].style.backgroundColor = 'white'
            }else{
                content.style.display ='block';
              console.log(button.children[0].children[1].classList[1])
             button.children[0].style.borderBottom= '0px'
             button.children[0].children[1].classList.remove('fa-caret-down')
             button.children[0].children[1].classList.add('fa-caret-up')
             content.style.backgroundColor = '#D1E0E5'
             button.children[0].style.backgroundColor = '#D1E0E5'
            }
        })
    }
    );
}

addListener();

function returnContact(user){
    let something = '';
    something += `<div class="buttonParent">
                <button type="button" class="collapsible">

                    <div class = "single-name-box">
                        <div class="name-field">
                          ${user["name"]}
                        </div>
                        <i class="fa fa-caret-down icon" aria-hidden="true"></i>
                    </div>
                </button>
                <div class="content">
                        <div class= "dob contentItem">${user["dob"]}</div>
                        <div class = " contentItem">
                            <button class = "editButton">Edit</button>
                        </div>
                        <div class = " contentItem">
                            <button class = "removeButton">Remove</button>
                        </div>
                        <div class = "contactBox">
                            <table>
                                <tr>
                                    <td>
                                        <i class="fa fa-phone-square" aria-hidden="true"></i>
                                    <div class="number">${user["number"]}</div>
                                    </td>
                                    <td>
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                    <div class="number">${user["email"]}</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                            
                    </div>
            </div>`
 return something;
    
}

function KeyUp(){
   
    const name = document.querySelector('.input-field').value
    
    const  data = {name}
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    }
    fetch('/',options)
    .then(function(response){
            return response.json();
    }).then(function(text){
        console.log(text['user'].length);  
        let size = text['user'].length;
        // console.log(text['user'][0]['name']);  

        const parentButton = document.querySelectorAll('.buttonParent');
        parentButton.forEach(p=>{
            p.remove()
        })
        const inner = document.querySelector('.contact-list');
        for(let i=0;i<size;i++){
            inner.innerHTML += returnContact(text['user'][i]);
        }
        addListener()
       
    }).catch(function(err){
        console.error(err);
    })
}


