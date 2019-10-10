/*! MIT License | github.com/kingalfred/canvas */

/*
 * Replace title
 */
if (document.title === 'Log in to canvas') {
  document.title = 'King Alfred School Canvas';
}

/*
 * Add "Check Homework button"
 */
if (window.location.href.indexOf('courses')) {
  var text = 'Calendar';
  var course = window.location.pathname.split('/')[2];

  $('#section-tabs').append(
    `<li class="section">
      <a class="settings" href="/calendar?include_contexts=course_${course}">
        ${text}
      </a>
    </li>`
  );
}

/*
 * Parent's multiple children
 */
function addChooseChild() {
  
  $.ajax({
    method: 'get',
    url: '/api/v1/users/self/observees?per_page=50',
    dataType: 'json'
  }).then(children => {
    var p = [];
    for (let child of children) {
      p.push(new Promise(function(resolve, reject) {
        $.ajax({
          method: 'get',
          url: '/api/v1/users/' + child.id + '/courses?per_page=50&include[]=term',
          dataType: 'json'
        }).then(courses => {
          var listCourses = [];
          for (let course of courses) {
            if (course.term && (new Date()) > course.term.start_date && (new Date()) < course.term.end_date) {
              listCourses.push('course_' + course.id) 
            }
          }
          resolve({
            name: child.name,
            courses: listCourses
          });
        }).fail(err => {
          reject(err);
        });
      }));
    }
    Promise.all(p).then(res => {
      $('#calendar_header').append(`
        <select id="calendar_children" onchange="location = this.value;">
          <option class="calendar_child">Select Child</option>
          ${
            res.map(
              x => `<option class="calendar_child" value="calendar?include_contexts=${x.courses}">${x.name}</option>`
            )
          }
        </select>
      `)
    })
  }).fail(err => {
    throw err;
  })
  
};

if (window.location.href.indexOf('calendar')) {
  addChooseChild();
}

/*
 * Change favicon of beta environment and test environment
 */
function changeFavicon(img) {
  var favicon = $('link[rel="shortcut icon"]');
  if (!favicon) $('head').append('<link rel="shortcut icon">');
  favicon.attr('type', 'image/png');
  favicon.attr('href', img);
}

if (window.location.hostname.indexOf('beta') > -1) {
  changeFavicon('https://lh3.googleusercontent.com/rMNbuDeVMWPAF-q1cl12qI_F_h22LZ05xxlaR6JFkRFgpwhYkq3olTEtUJ1j_D5sWbxqruSyu1RujuoKehlayQ1sDaD-mOikNn5heMw7td840kWR78aPLIvtM3gZsgLo6dVkqbZlpA=s64-no');
} else if (window.location.hostname.indexOf('test') > -1) {
  changeFavicon('https://lh3.googleusercontent.com/aWCUYVekhFjnQXVbZ0Iace8zR2UN5_VDaf8bGrsSjfte_LAK8tTBSN2ZyaKVYuBM_jXAvPR1pWey4jNw1AwvtZxXx7qRYi6_RMC3DJZ1tbzqova5BCrY1SVrF9gBgz6gc1Xrmw5z1tdbIgsUEqK1WbJfYaGRJUDSV8VLPJymY5Pkbj41zWrxC7fj5AevrFOMj8UgX70aWJEEfFsgPwPAxOFiL4bYjwjSJIOrqVSeM2HFZ1qzb3NO8Pf2ogLBcERXCA1TgEBpRsBVXuyIOa6SeuwuGramdsrubqM5bqdYBpONPWa-QRwEqmJZPaR8gzK6ijwehvIvRjJxOXmhbmxgf8fBz75Uqi__kZWdJakI9c5Pjz0kFoWt6g6Dl_oYZvYrJnJQ5GCXDkVdXn7jVdsRee3fNZB-ANePDRAEtXz0Q_qSfFTQrMZtRZ-Iou8kqd1jqNDDlA8L4hx1QDI35WAkx-uKsPa7wT-FE70kj_MXay2pcCCgi7hlU_6t8Q_aagoF68vQTt51jr_yvg6YRfHMyzaGhnudhpk5BNNhAFSoyIOWW1QyyYuY4OZZf1YK27q6Kjncw4kG_fC0Qr507CGr8rxoA_7UkpXPijM8alJ-9aUqZFnV9pnBaMiHSuKR8hnq4avKF_lQFC7DnEBnTd8VUf7OPCY3lU5D=w200-h202-no');
} else {
  changeFavicon('https://lh3.googleusercontent.com/QQYlob0cecCOd8_IRGKPr81aqEn6E9pe_xW5EnUW7DWSOtHQtOMfkS_Tg6eYKUN97fp7hrWJncvSXofLz-OQOPdUCSJtSPrPmWun5au31DmM3auBKthmUK0gzuj5wxD_LitSHHMJvgm231XKAZ80qPbuH2mUUBqNiRkyD3SBBGo6d8bZVhNBJwNQbC5VIdXcJLAdZ8NqguYw1NK2WKDE2UhtboTwv34hHcEcRTudtUnbnRzxXw3TqQ_dpUVA18zcihVunAfzvgkOKZF7wjPrmezulGhfSR6vtRXFZO22F27BqWexjMvHkSYVtVOGdpH924RPSH52BOi_ww-kipL2YJ4wuYo4k3nTjTfq3mmXeDgyHL8IwI1uGU6y6EDrhjoAvpzwhmbBUIwrc5FInUGMKbsfCXNVkUPQIz-6o3b0hBBB2WowKYJEHBcAoTE7VhBQErA-flnAZxAbUYvBca3i3i9qDB-las5_xrMiTlZqvfdNrpaSJNG7MFhWetX8_NdUUhGZTxMp09SpUC8IZVfO1S66jCOGpJ2XA1xinbz39n-lnDO2UYY7wW1IYZof_nhMXTSYjUD7wKAkTMdROu9fSejkwK-cn-xszZaXJ8TqrP27ik5yC_fCp0JEzidf7x9oT6NFgu6fajexygKVuyFSXL__bH9symFG=w200-h202-no');
}
