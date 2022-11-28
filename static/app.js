const checkboxes = document.querySelectorAll(".check-completed");
for (let i = 0; i < checkboxes.length; i++) {
  const checkbox = checkboxes[i];
  checkbox.onchange = function (e) {
    console.log("event", e);
    const newCompleted = e.target.checked;
    const todoId = e.target.dataset["id"];
    fetch("/todo/" + todoId + "/set-completed", {
      method: "POST",
      body: JSON.stringify({
        completed: newCompleted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function () {
        document.getElementById("errors-todos").className = "hidden";
      })
      .catch(function (err) {
        console.log(err);
        document.getElementById("errors-todos").className = "";
      });
  };
}
const checkboxesList = document.querySelectorAll(".list-completed");
for (let i = 0; i < checkboxesList.length; i++) {
  const checkbox = checkboxesList[i];
  checkbox.onchange = function (e) {
    console.log("event", e);
    const newCompleted = e.target.checked;
    const listId = e.target.dataset["id"];
    fetch("/lists/" + listId + "/set-completed", {
      method: "POST",
      body: JSON.stringify({
        completed: newCompleted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function () {
        document.getElementById("errors-lists").className = "hidden";
      })
      .catch(function (err) {
        console.log(err);
        document.getElementById("errors-lists").className = "";
      });
  };
}
const descInput = document.getElementById("description-todo");
const activeList = document.getElementById("active-list");
document.getElementById("form-todo").onsubmit = function (e) {
  e.preventDefault();
  const desc = descInput.value;
  const actList = activeList.dataset["id"];
  descInput.value = "";
  fetch("/todo/create", {
    method: "POST",
    body: JSON.stringify({
      description: desc,
      active_list: actList,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log("response", jsonResponse);
      li = document.createElement("li");
      li.innerText = desc;
      document.getElementById("todos").appendChild(li);
      document.getElementById("errors-todos").className = "hidden";
    })
    .catch(function (err) {
      console.log(err);
      document.getElementById("errors-todos").className = "";
    });
};
const descInputList = document.getElementById("description-list");
document.getElementById("form-list").onsubmit = function (e) {
  e.preventDefault();
  const name = descInputList.value;
  descInputList.value = "";
  fetch("/list/create", {
    method: "POST",
    body: JSON.stringify({
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log("response", jsonResponse);
      li = document.createElement("li");
      li.innerText = name;
      document.getElementById("lists").appendChild(li);
      document.getElementById("errors-lists").className = "hidden";
    })
    .catch(function (err) {
      console.log(err);
      document.getElementById("errors-lists").className = "";
    });
};
/* document.addEventListener("click", function(evnt){
                      console.log(evnt.target.id);
                      id = evnt.target.id;
                      fetch('/todo/'+ id, {
                              method: 'DELETE'
                          })
                          .then(function() {
                              document.getElementById('errors').className = 'hidden';
                          })
                          .catch(function(err) {
                              console.log(err)
                              document.getElementById('errors').className = '';
                          })
                  }); */
const deleteBtns = document.querySelectorAll(".delete-button");
for (let i = 0; i < deleteBtns.length; i++) {
  const btn = deleteBtns[i];
  btn.onclick = function (e) {
    const todoId = e.target.dataset["id"];
    fetch("/todo/" + todoId + "/delete", {
      method: "DELETE",
    }).then(function (response) {
      e.target.parentNode.remove();
    });
  };
}
const deleteBtnsLst = document.querySelectorAll(".delete-button-list");
for (let i = 0; i < deleteBtnsLst.length; i++) {
  const btn = deleteBtnsLst[i];
  btn.onclick = function (e) {
    const listId = e.target.dataset["id"];
    fetch("/lists/" + listId + "/delete", {
      method: "DELETE",
    }).then(function (response) {
      e.target.parentNode.remove();
    });
  };
}
