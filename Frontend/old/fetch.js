async function loadReviewsFetch() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/reviews/');
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const reviews = await response.json();
    reviews.forEach((review) => {
      console.log(review);
    });
    console.log('----------');
  }
  catch (error) {
    console.log('There was an error getting the reviews', error);
  }
}

loadReviewsFetch();

async function loadFreelancersFetch() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/freelancers/');
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const reviews = await response.json();
    reviews.forEach((review) => {
      console.log(review);
    });
    console.log('----------');
  }
  catch (error) {
    console.log('There was an error getting the reviews', error);
  }
}

loadFreelancersFetch();

async function loadUsersFetch() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/');
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const reviews = await response.json();
    reviews.forEach((review) => {
      console.log(review);
    });
    console.log('----------');
  }
  catch (error) {
    console.log('There was an error getting the reviews', error);
  }
}

loadUsersFetch();

async function loadSortAndFilterFetch() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/sort_and_filter_reviews/?date=2024-08-14');
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const reviews = await response.json();
    reviews.forEach((review) => {
      console.log(review);
    });
    console.log('----------');
  }
  catch (error) {
    console.log('There was an error getting the reviews', error);
  }
}

loadSortAndFilterFetch();
