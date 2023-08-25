const cardsHeader = document.querySelector('.cards-header');
const scrollContainer = document.querySelector('.scroll-cards');
const handleScroll = () => {
    if (scrollContainer.scrollTop > 10) {
        cardsHeader.classList.add('floatingNav');
    } else {
        cardsHeader.classList.remove('floatingNav');
    }
};

scrollContainer.addEventListener('scroll', handleScroll);

document.addEventListener("DOMContentLoaded", () => {  
  const toggleBtn = document.querySelectorAll(".compose , .new-mail__toggle , .button--primary");
  toggleBtn.forEach(element => {
    element.addEventListener("click", () => {
      newmail_view();
    });
  });

});


function newmail_view(){
  document.querySelector(".new-mail").classList.toggle("active");
  document.querySelector(".compose").classList.toggle("active");
  document.querySelector(".new-mail__toggle").classList.toggle("active");
}

function name_icon(){
  const userName = document.getElementById("user-name").textContent;
  const firstLetter = userName.charAt(0);
  const userAvatar = document.getElementById("user-avatar");
  userAvatar.textContent = firstLetter.toUpperCase();
}

const cardsContainer = document.getElementById('cards');
const viewState = {
  deleted_view: false,
  saved_view: false,
  sent_view: false,
  inbox_view: false,
};


function fetch_cards(){
    let view = "inbox";
    if (viewState.deleted_view === true){
        view = "trash";
    } 
    else if (viewState.saved_view === true){
        view = "archive";
    }
    else if (viewState.sent_view === true){
        view = "sent";
    }
    fetch('/emails/'+view)
    .then(response => response.json())
    .then(data => {
        cardsContainer.innerHTML = '';
        let count = 0;
        data.forEach(element => {
          
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = element.id;
            let fontweight = "400";
            let text_decoration = "";
            let dotpic = readed;
            if (element.read === false){
                dotpic = unreaded;
                fontweight = "600";
                count += 1;
                text_decoration = "text-decoration:underline";
            }
            document.querySelector('#mail-count').innerHTML = count + " Unread Mails";
            card.innerHTML = `
            <div class="clicky">
            <div class="top-card">
              <img src="${dotpic}" />
              <div class="mail-names">
                ${element.sender}
              </div>

            </div>
            <div class="mail-info" style="font-weight:${fontweight}; ${text_decoration}">
              ${element.subject}
            </div>
            </div>
            <div class="bottom-info">
              <div class="mail-icons">
                
                <div class="star lana" id="delete_mail">
                  <img src=${deleteIconURL} style="height: 24px;" title="Delete This Mail"  />
                </div>
                <div class="star lana" id="save_mail">
                  <img src="${saveIconURL}" style="height: 23px; margin-bottom: 4px;" title="Add to Favourites" />
                </div>

              </div>
              <div class="date">${element.timestamp}</div>
            </div>
            `
            cardsContainer.appendChild(card);
    });
    const clickableElements = document.querySelectorAll('.clicky');
    clickableElements.forEach(element => {
        element.addEventListener('click', () => {
            show_message(element.parentElement.id);

        });
    });
    const dateElements = document.querySelectorAll('.date');
    dateElements.forEach(element => {
        element.addEventListener('click', () => {
            show_message(element.parentElement.parentElement.id);

        });
    });
    
    const delete_mail = document.querySelectorAll('#delete_mail');
    delete_mail.forEach(element => {
        element.addEventListener('click', () => {
            delete_message(element.parentElement.parentElement.parentElement.id);
        });
    }
    )
    const save_mail = document.querySelectorAll('#save_mail');
    save_mail.forEach(element => {
        element.addEventListener('click', () => {
            save_message(element.parentElement.parentElement.parentElement.id);
        });
    })
    const search = document.querySelector('#search');
    
    search.addEventListener('keyup', () => {
        let searchValue = search.value.toLowerCase();
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            let name = card.querySelector('.mail-names').innerHTML.toLowerCase();
            let title = card.querySelector('.mail-info').innerHTML.toLowerCase();
            if (name.includes(searchValue) || title.includes(searchValue)){
                card.style.display = "block";
            }
            else{
                card.style.display = "none";
            }
        });
      })
    })
}



const inboxButton = document.getElementById('inbox_mails');
inboxButton.classList.toggle('active', true);
document.querySelector(`#${inboxButton.id} > .icon-name`).style.color = 'black';
name_icon();
reset_message_view();
fetch_cards();


const message_view_delete = document.querySelector('#message_view_delete');
message_view_delete.addEventListener('click', () => {
    delete_message(document.querySelector('.message-info').id);
    reset_message_view();
});

function delete_message(id){
    fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            deleted: true
        }),
    })
    .then(() => fetch_cards());
}
function save_message(id){
    fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: true
        }),
    })
    .then(() => fetch_cards());
}
function show_message(id){
    fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(data => {
        trigger_message_view(true);
        document.querySelector('#sender_message').style.marginTop = "20px";
        document.querySelector('.message-info').id = `${data.id}`;
        document.querySelector('#sender_name').innerHTML = `${data.sender}`;
        document.querySelector('#sender_email').innerHTML = `${data.sender_mail}`;
        document.querySelector('#sender_date').innerHTML = `${data.timestamp}`;
        document.querySelector('#sender_title').innerHTML = `${data.subject}`;
        document.querySelector('#sender_message').innerHTML = `${data.body}`;

    })
    
    fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: true
        }),
    })
    fetch_cards();
    
  }
    

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  fetch('/logout', {

    method: 'POST',
    body: JSON.stringify({
      logout: true
    }),
  })
  .then(() => {
    window.location.href = "/login";
  });
});

let names = document.querySelectorAll('.icon-name');


function sidebar_reset(){
  names.forEach(element => {
    element.style.color = "grey";
  });
  document.querySelectorAll('.folder-icons').forEach(element => {
    element.classList.toggle("active", false);
  });
  reset_message_view();
}

const mailbox_name = document.querySelector('#mailbox_name');
const deletedButton = document.getElementById('deleted_mails');
const savedButton = document.getElementById('saved_mails');
const sentButton = document.getElementById('sent_mails');

function handleButtonClick(viewName, buttonElement, buttonTitle) {
  return () => {
    for (const view in viewState) {
      viewState[view] = view === viewName;
    }
    fetch_cards();
    sidebar_reset();
    buttonElement.classList.toggle('active', true);
    document.querySelector(`#${buttonElement.id} > .icon-name`).style.color = 'black';
    mailbox_name.innerHTML = buttonTitle;
  };
}

deletedButton.addEventListener('click', handleButtonClick('deleted_view', deletedButton, 'Trash'));
savedButton.addEventListener('click', handleButtonClick('saved_view', savedButton, 'Saved Mails'));
sentButton.addEventListener('click', handleButtonClick('sent_view', sentButton, 'Sent Mails'));
inboxButton.addEventListener('click', handleButtonClick('inbox_view', inboxButton, 'Inbox'));



const send_button = document.getElementById('send_mail');
send_button.addEventListener('click', () => {
  const recipients = document.getElementById('recipients').value;
  const subject = document.getElementById('subject').value;
  const body = document.getElementById('body').value;
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body,
    }),
  })
  .then(response => response.json())
  .then(result => {
    
    if (result.error){
      alert(result.error);
    }
    else{
      document.querySelector(".new-mail").classList.remove("active");
      document.querySelector(".compose").classList.remove("active");
      document.querySelector(".new-mail__toggle").classList.remove("active");
      showNotification();
      
    }
    
  });
});





function trigger_message_view(bool){
  const hrElements = document.querySelectorAll('hr');
  hrElements.forEach(function(hr) {
      hr.style.display = bool?'block':'none';
  });
  document.querySelector('.message-header').style.display = bool?"flex" : "none";
  document.querySelector('#message_icons').style.display = bool?"block" : "none";
  document.querySelector('.message-info').style.display = bool?"flex" : "none";
  document.querySelector('#sender_title').style.display = bool?"block" : "none";
}



const printButton = document.getElementById('printButton');
printButton.addEventListener('click', () => {
  window.print();
});

const refreshButton = document.getElementById('backarrow');
refreshButton.addEventListener('click', () => {
  fetch_cards();
  reset_message_view();
});


const replyButton = document.getElementById('reply');
replyButton.addEventListener('click', () => {
  const sender_name = document.querySelector('#sender_name').innerHTML;
  const sender_email = document.querySelector('#sender_email').innerHTML;
  const sender_date = document.querySelector('#sender_date').innerHTML;
  const sender_title = document.querySelector('#sender_title').innerHTML;
  const sender_message = document.querySelector('#sender_message').innerHTML;
  if (!document.querySelector('.new-mail').classList.contains('active')){
    newmail_view();
  }
  document.querySelector('#recipients').value = sender_email;
  document.querySelector('#subject').value = `Re: ${sender_title}`;
  document.querySelector('#body').value = `On ${sender_date} ${sender_name} wrote: \n ${sender_message}`;
});

const forwardButton = document.getElementById('forward');
forwardButton.addEventListener('click', () => {
  const sender_title = document.querySelector('#sender_title').innerHTML;
  const sender_message = document.querySelector('#sender_message').innerHTML;
  if (!document.querySelector('.new-mail').classList.contains('active')){
  newmail_view();
  }
  document.querySelector('#recipients').value = "";
  document.querySelector('#subject').value = `Fwd: ${sender_title}`;
  document.querySelector('#body').value = sender_message;
});



function reset_message_view(){
  const sender_message = document.querySelector('#sender_message');
  sender_message.innerHTML =   '<div class="body" style="font-family: Cabin Sketch;"><div class="site"><div class="sketch"><div class="bee-sketch red"></div><div class="bee-sketch blue"></div></div><h1>Ooops:<small>Nothing to show</small></h1></div></div>';
  sender_message.style.marginTop = "0px";
  trigger_message_view(false);

}


function showNotification() {
  const notification = document.querySelector('.rectangle');
  notification.style.display = 'flex';
  setTimeout(() => {
      notification.style.display = 'none';
}, 3000);
}


