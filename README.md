# slack-status-update-lambda
 The slack-status-update-lambda is a lambda function that helps keep track of who is on honeybadger duty.  This lambda is triggered by a schedule event.  It runs once per week on Sundays.  The function reads the HB duty schedule and finds the last person on duty, and the new person on duty.  The function uses the person's name to find their slack id.  The last person on duty has their slack status_text and status_emoji reset.  The new person on duty has their status_text set to "on honeybadger duty!" and their status_emoji set to ":honeybadger:".  This can be used to update any user profile details based on a schedule, or any other trigger you like.
 
# Setup

`npm install`

# Deploy

## Development

`SLS_DEBUG='*' serverless webpack invoke --function test` to test with serverless locally. You may need to set SLS_DEBUG: `export SLS_DEBUG='*'`

## Staging

1. `serverless deploy --stage staging --verbose`
1. Configure lambda: add any environment variables and values, adjust the timeout if needed (up to 5 minutes), enable a trigger for your function, add a test event (json).

## Production

1. `serverless deploy --stage production --verbose`
1. Configure lambda: add any environment variables and values, adjust the timeout if needed (up to 5 minutes), enable a trigger for your function, add a test event (json).

## Configure
In the web console, make sure you add your environment variables in the input fields below the code.  Set up a trigger for the lambda.  This example uses a schedule event, configured to run once per week on sunday when the schedule changes: `cron(0 0 12 ? * SUN *) `
