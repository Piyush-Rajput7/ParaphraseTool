// API Testing Utility
import { paraphraseText, testAPIConnection, validateText, cleanInputText } from './services/api.js'

// Test cases for edge cases
const testCases = [
  {
    name: 'Normal text',
    text: 'This is a simple sentence that should work perfectly with any paraphrasing API.'
  },
  {
    name: 'Text with special characters',
    text: 'This text has "smart quotes" and \'apostrophes\' and — dashes that might cause issues.'
  },
  {
    name: 'Long text',
    text: 'This is a longer piece of text that contains multiple sentences. It should test how well the API handles longer content. The paraphrasing should maintain the meaning while changing the structure and vocabulary. This is important for testing the robustness of the API service.'
  },
  {
    name: 'Technical text',
    text: 'JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications alongside HTML and CSS.'
  },
  {
    name: 'Text with numbers',
    text: 'The year 2024 has been significant for AI development. Over 1000 new models were released, with performance improvements of 25-30%.'
  }
]

// Main test function
export const runAPITests = async () => {
  const results = []
  
  // Test API connection
  try {
    const connectionTest = await testAPIConnection()
    results.push({ type: 'connection', status: 'success', data: connectionTest })
  } catch (error) {
    results.push({ type: 'connection', status: 'error', error: error.message })
  }
  
  // Test each case
  for (const testCase of testCases) {
    try {
      // Test validation
      const isValid = validateText(testCase.text)
      if (!isValid) {
        results.push({ 
          type: 'test', 
          name: testCase.name, 
          status: 'validation_failed' 
        })
        continue
      }
      
      // Test paraphrasing
      const startTime = Date.now()
      const result = await paraphraseText(testCase.text)
      const duration = Date.now() - startTime
      
      results.push({
        type: 'test',
        name: testCase.name,
        status: 'success',
        duration,
        input: testCase.text.substring(0, 100) + '...',
        output: result.substring(0, 100) + '...'
      })
      
    } catch (error) {
      results.push({
        type: 'test',
        name: testCase.name,
        status: 'error',
        error: error.message
      })
    }
  }
  
  return results
}

// Re-export functions from api.js for convenience
export { testAPIConnection, validateText, cleanInputText } from './services/api.js'

// Make test function available globally in development
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.runAPITests = runAPITests
  window.testAPIConnection = testAPIConnection
}