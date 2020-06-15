import firebase from "../Firebase";
export const addQuestion = (question) => {
  return async (dispatch) => {
    var reference = "";
    var storedQuestion;
    await firebase
      .database()
      .ref("Questions")
      .push(question)
      .then((snapshot) => {
        let s = [];
        firebase
          .database()
          .ref("Questions")
          .child(snapshot.key)
          .once(
            "value",
            function (childSnapshot) {
              storedQuestion = { ...childSnapshot.val(), id: snapshot.key };
              if (question.imageOptions) {
                firebase
                  .database()
                  .ref("Questions/" + snapshot.key + "/options");

                var options = question.options.map(async (q, index) => {
                  var uploadTask = firebase
                    .storage()
                    .ref("Questions/" + snapshot.key + "/options/" + q.id)
                    .put(q.statement);

                  await uploadTask.on(
                    "state_changed",
                    function (snapshot) {},
                    function (error) {},
                    function () {
                      uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(function (downloadURL) {
                          console.log("File available at", downloadURL);
                          firebase
                            .database()
                            .ref(
                              "Questions/" +
                                snapshot.key +
                                "/options/" +
                                (q.id - 1) +
                                "/statement"
                            )
                            .set(downloadURL);
                          console.log(index, downloadURL);
                          s.push({ ...q, statement: downloadURL });
                        });
                    }
                  );
                });

                // firebase
                //   .database()
                //   .ref("Questions/" + snapshot.key + "/options")
                //   .update(s);
              }
              storedQuestion = { ...storedQuestion, options: s };
              console.log(storedQuestion);
              dispatch({ type: "ADD_QUESTION", question: { storedQuestion } });
            },
            function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            }
          );
        reference = firebase.database().ref("Questions").child(snapshot.key);
      });
  };
};

export const fetchQuestions = () => {
  return async (dispatch) => {
    var reference = "";
    var storedQuestion;
    await firebase
      .database()
      .ref("Questions")
      .on(
        "value",
        function (childSnapshot) {
          console.log(childSnapshot.val());
          const resData = childSnapshot.val();
          const loadedData = [];

          for (const key in resData) {
            loadedData.push({
              id: key,
              ...resData[key],
            });
          }
          dispatch({ type: "FETCH_QUESTIONS", questions: loadedData });
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };
};

export const setResults = (user, results) => {
  return async (dispatch,state) => {
    var totals = [];
    for (const key in results) {
      var key1 = Object.keys(results[key])[0];
      var value = results[key][key1];
      console.log(value);
      totals[value] = (totals[value] || 0) + 1;
    }
    // totals now looks something like {Q3:18, Q1:16, Q4:66, Q1:12}
    let percentiles = [];
    for (const key in totals) {
      totals[key] = (100 * totals[key]) / results.length;
      percentiles.push({ key: key, value: totals[key] });
    }
    console.group("perce", percentiles);
    await firebase
      .database()
      .ref("Results")
      .push({ user: user, result: percentiles })
      .then((snapshot) => {
        firebase
          .database()
          .ref("Results")
          .child(snapshot.key)
          .on(
            "value",
            function (childSnapshot) {
              const storedResult = { ...childSnapshot.val(), id: snapshot.key };
              console.log(storedResult.result);

              dispatch({
                type: "ADD_PERCENTILES",
                percentiles: storedResult.result,
              });
              let max, d;
              if (storedResult.result.length) {
                max = storedResult.result?.reduce((max, obj) =>
                  max.value > obj.value ? max : obj
                );
                console.log("max", max);
                firebase
                  .database()
                  .ref("Categories")
                  .orderByChild("name")
                  .equalTo(max.key)
                  .once("value", function (snapshot) {
                    // console.log(snapshot.val().name);
                    // // console.log(snapshot.val()['name'])
                    snapshot.forEach(function (data) {
                      // console.log(data.val())
                      dispatch({
                        type: "SET_PERSONALITY_CATEGORY",
                        category: data.val(),
                      });
                    });
                  });
              }
              fetch("http://localhost:3001/send", {
                method: "POST",
                body: JSON.stringify(state.category),
                headers: {
                  // Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((response) => {
                  if (response.status === "success") {
                    alert("Message Sent.");
                
                  } else if (response.status === "fail") {
                    alert("Message failed to send.");
                  }
                });
            },
            function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            }
          );
        // reference = firebase.database().ref("Questions").child(snapshot.key);
      });
  };
};

export const setUser = (user) => {
  return { type: "SET_USER", user };
};

export const addCategory = (category) => {
  return async (dispatch) => {
    var reference = "";
    var storedCategory;
    await firebase
      .database()
      .ref("Categories")
      .push(category)
      .then((snapshot) => {
        firebase
          .database()
          .ref("Categories")
          .child(snapshot.key)
          .on(
            "value",
            function (childSnapshot) {
              storedCategory = { ...childSnapshot.val(), id: snapshot.key };
              // console.log(storedQuestion);
              dispatch({ type: "ADD_CATEGORY", category: storedCategory });
            },
            function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            }
          );
        // reference = firebase.database().ref("Questions").child(snapshot.key);
      });
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    await firebase
      .database()
      .ref("Categories")
      .on(
        "value",
        function (snapshot) {
          // console.log(snapshot.val());
          const resData = snapshot.val();
          const loadedData = [];

          for (const key in resData) {
            loadedData.push({
              id: key,
              ...resData[key],
            });
          }
          dispatch({ type: "FETCH_CATEGORIES", categories: loadedData });
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };
};
