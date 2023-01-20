
let post_id = window.location.pathname;
post_id = post_id.slice(6);

const startPostEdit = (event) => {
  event.preventDefault();

  const post = document.getElementById("post");
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const submit = document.createElement("input");
  const tBox = document.createElement("input");
  const cBox = document.createElement("input");
  const tOld = title.innerText;
  const cOld = content.innerText;

  tBox.id = "title";
  tBox.type = "text";
  tBox.value = tOld;
  cBox.id = "content";
  cBox.type = "text";
  cBox.value = cOld;
  submit.id = "update";
  submit.type = "submit";
  submit.value = "update!";

  title.replaceWith(tBox);
  content.replaceWith(cBox);
  post.append(submit);

  document.querySelector("#post").addEventListener("submit", endPostEdit);
};
//this one is a godforsaken mess it's just a bunch of create elements and setting atributes

const endPostEdit = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#title').value.trim()
  const content = document.querySelector('#content').value.trim()

  if(title&&content){
    const response = await fetch(("/api/posts/" + post_id),{
        method: "PUT",
        body: JSON.stringify({title,content}),
        headers: { "Content-Type": "application/json" },
        })
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
        }
    }
};
//put method fetch to update 

const deletePost = async (event)=>{
    event.preventDefault();

    const response = await fetch(("/api/posts/" + post_id),{
        method: "delete",
        })
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }   
};
//simple delete using globals scoped post id

document.getElementById("editP").addEventListener("click", startPostEdit);

document.getElementById("deleteP").addEventListener('click',deletePost);

