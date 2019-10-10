require('dotenv').config()
const persephonySDK = require('@persephony/sdk')

const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const persephony = persephonySDK(accountId, authToken)

getMembers(queueId).then(members => {
  // Use queue members
}).catch(err => {
  // Catch Errors
})

async function getMembers(queueId) {
  // Create array to store all members 
  const members = []
  // Invoke GET method to retrieve initial list of members information
  const first = await persephony.api.queues.members(queueId).getList()
  members.push(...first.queueMembers)
  // Get Uri for next page
  let nextPageUri = first.nextPageUri
  // Retrieve entire members list 
  while (nextPageUri) {
    const nextPage = await persephony.api.queues.members(queueId).getNextPage(nextPageUri)
    members.push(...nextPage.queueMembers)
    nextPageUri = nextPage.nextPageUri
  }
  return members
}