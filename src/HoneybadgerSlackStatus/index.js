import schedule from '../../schedule.json'

const request = require("request");

const getSlackId = (name) => {
  switch (name) {
    case 'Debbie': return process.env.DEBBIE_SLACK_ID;
    case 'Dave': return process.env.DAVE_SLACK_ID;
    case 'Ed': return process.env.ED_SLACK_ID;
    case 'Ryan': return process.env.RYAN_SLACK_ID;
    case 'Matt': return process.env.MATT_SLACK_ID;
    case 'Ilya': return process.env.ILYA_SLACK_ID;
    case 'Jeff': return process.env.JEFF_SLACK_ID;
    case 'John': return process.env.JOHN_SLACK_ID;
    case 'Kyle': return process.env.KYLE_SLACK_ID;
    case 'Carol': return process.env.CAROL_SLACK_ID;
  }
}

// 1. Lambda will be setup to run on Sunday's after HB duty resets for the week
class HoneybadgerSlackStatus {
  message = () => {
    let presentName, pastName, person, rightNow, sDate, eDate, pastSlackId, presentSlackId;

    for(var i = 0; i < schedule.length; i++) {
        person = schedule[i];
        rightNow = new Date();
        sDate = new Date(person["startDate"]);
        eDate = new Date(person["endDate"]);

        if (rightNow >= sDate && rightNow <= eDate) {
            presentName = person["name"];
            pastName = schedule[i-1]["name"];
        }
    }
    presentSlackId = getSlackId(presentName)
    pastSlackId = getSlackId(pastName)

    // 2. Check the schedule and see who was on duty last week, reset their status
    let resetStatus = {
      method: 'POST',
      url: 'https://slack.com/api/users.profile.set',
      headers:
       { 'content-type': 'application/x-www-form-urlencoded' },
      form:
       { profile: '{\'status_text\':\'\', \'status_emoji\':\'\'}',
         token: process.env.SLACK_API_TOKEN,
         user: pastSlackId }
    };
    request(resetStatus, (error, response, body) => {
      if (error) throw new Error(error);
      console.log("body: ", body);
    });

    // 3. Update dev on duty status on slack
    let assignHoneybadgerDutyStatus = {
      method: 'POST',
      url: 'https://slack.com/api/users.profile.set',
      headers:
       { 'content-type': 'application/x-www-form-urlencoded' },
      form:
       { profile: '{\'status_text\':\'on honeybadger duty!\', \'status_emoji\':\':honeybadger:\'}',
         token: process.env.SLACK_API_TOKEN,
         user: presentSlackId }
    };

    request(assignHoneybadgerDutyStatus, (error, response, body) => {
      if (error) throw new Error(error);
      console.log("body: ", body);
    });
  }
}

export default HoneybadgerSlackStatus;








