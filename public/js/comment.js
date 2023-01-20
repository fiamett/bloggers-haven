const startComEdit = (event) => {
    event.preventDefault();
  
    const id = event.target.classList[1]

    const comment = document.getElementById(id);
    const coms = document.getElementsByClassName("comment "+id)[0];
    const submit = document.createElement("input");
    const comBox = document.createElement("input");
    const comOld = coms.innerText;
    
    comBox.setAttribute("class",("coms "+id));
    comBox.type = "text";
    comBox.value = comOld;
    submit.setAttribute("class",("update " + id));
    submit.type = "submit";
    submit.value = "update!";
  
    coms.replaceWith(comBox);
    comment.append(submit);

    event.target.remove()
  
    document.querySelector('#'+id).addEventListener("submit", endComEdit);
};
//replaces comment with text box and adds submit button based on class with integrated id value had to put com in front of number cuz i cant query select by number
const endComEdit = async (event) => {
  event.preventDefault();

  const id = event.target.id
  
  const comment = document.querySelector('.coms.'+id).value.trim()

  if(comment){
    const response = await fetch(("/api/comments/" + id.slice(3)),{
        method: "PUT",
        body: JSON.stringify({comment}),
        headers: { "Content-Type": "application/json" },
        })
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
        }
    }
};
//put method fetch to update comment based on form id
const deleteCom = async (event)=>{
    event.preventDefault();
    const id = event.target.classList[1]
    console.log(id)
    const response = await fetch(("/api/comments/" + id.slice(3)),{
        method: "delete",
        })
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }   
};
const postCom = async (event) => {
  event.preventDefault();
  // Send a POST request to the API endpoint
  const comment = document.querySelector("#comm").value.trim();

  if (comment) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
      document.querySelector("#comm").value = ""
    } else {
      alert(response.statusText);
    }
  }
};
//post method fetch to post comments

document.querySelector(".commentForm").addEventListener("submit", postCom);

for (let i=0; i<document.getElementsByClassName("editC").length;i++){
    document.getElementsByClassName("editC")[i].addEventListener("click",startComEdit)
    }
    //for each was aparrrently not a function idk why
    
for (let i=0; i<document.getElementsByClassName("deleteC").length;i++){
    document.getElementsByClassName("deleteC")[i].addEventListener("click",deleteCom)
    }
    // for each not working