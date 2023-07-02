let nav = 0;// to keep track of which month is being displayed
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];// to keep track of the events

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const BackDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date){
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if(eventForDay){
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  }
  else{
    newEventModal.style.display = 'block';
  }
  BackDrop.style.display = 'block';
}



function load()
{
    const dt = new Date();// to keep track of the date
  if(nav !== 0)
  {
      dt.setMonth(new Date().getMonth() + nav);
  }
    

const day = dt.getDate();// to keep track of the day
const month = dt.getMonth();// to keep track of the month
const year = dt.getFullYear();// to keep track of the year
// o mes começa em 0, por isso é necessário somar 1

const firstDayOfMonth = new Date(year, month, 1);// to keep track of the first day of the month
const daysInMonth = new Date(year, month + 1, 0).getDate();// to keep track how many days we have at the month

const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
});
const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);// to split the string and get the day of the week  


document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('pt-us', { month: 'long' })} ${year}`;

calendar.innerHTML = '';



  for(let i = 1; i <= paddingDays + daysInMonth; i++)
  {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if(i > paddingDays){
        daySquare.innerText = i - paddingDays;

        const eventForDay = events.find(e => e.date === `${month + 1}/${i - paddingDays}/${year}`);

        if (eventForDay){
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          eventDiv.innerText = eventForDay.title;
          daySquare.appendChild(eventDiv);
        }
        

        daySquare.addEventListener('click', () => openModal(`${month + 1}/${i - paddingDays}/${year}`));
    } else
    {
        daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  }
}


function closeModal()
{
  eventTitleInput.classList.remove('error');
   
    deleteEventModal.style.display = 'none';
    newEventModal.style.display = 'none';
    BackDrop.style.display = 'none';
    eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent(){
  if (eventTitleInput.value){
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });
  
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  }
else{
    eventTitleInput.classList.add('error');
}


}

function deleteEvent(){
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons()
{
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

   document.getElementById('saveButton').addEventListener('click', saveEvent);
        document.getElementById('cancelButton').addEventListener('click', closeModal);
    
   document.getElementById('deleteButton').addEventListener('click', deleteEvent);
   document.getElementById('closeButton').addEventListener('click', closeModal);

}

initButtons();
load();