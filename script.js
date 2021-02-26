const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

//fetch post from API
async function fetchPosts() {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("something went wrong");
    }
  } catch (err) {
    console.log(`Error!:${err.message}`);
  }
}

async function showPosts() {
  const posts = await fetchPosts();
  console.log(posts);

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number"> ${post.id}</div>
    <div class="post-info">
      <h1 class="post-title">${post.title}</h1>
      <p class="post-body">${post.body}</p>
    `;
    postsContainer.appendChild(postEl);
  });
}

//show initial posts
showPosts();

const showLoader = () => {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");
  }, 500);

  setTimeout(() => {
    page++;
    showPosts();
  }, 300);
};

//filter posts by input
const filterPosts = (e) => {
  const filterTerm = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  console.log(filterTerm, posts);
};

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  //console.log(scrollHeight, scrollTop, clientHeight);

  if (scrollTop + clientHeight >= scrollHeight - 5) showLoader();
});

filter.addEventListener("input", filterPosts);
