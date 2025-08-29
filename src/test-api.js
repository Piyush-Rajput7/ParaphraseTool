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
  console.log('🧪 Starting API Tests...')
  
  // Test API connection
  console.log('\n1. Testing API Connection...')
  try {
    const connectionTest = await testAPIConnection()
    console.log('Connection Test Results:', connectionTest)
  } catch (error) {
    console.error('Connection test failed:', error)
  }
  
  // Test each case
  console.log('\n2. Testing Different Text Types...')
  for (const testCase of testCases) {
    console.log(`\n📝 Testing: ${testCase.name}`)
    console.log(`Input: ${testCase.text.substring(0, 100)}...`)
    
    try {
      // Test validation
      const isValid = validateText(testCase.text)
      console.log(`✅ Validation: ${isValid ? 'PASS' : 'FAIL'}`)
      
      if (!isValid) continue
      
      // Test cleaning
      const cleaned = cleanInputText(testCase.text)
      console.log(`🧹 Cleaned: ${cleaned !== testCase.text ? 'MODIFIED' : 'NO CHANGES'}`)
      
      // Test paraphrasing
      const startTime = Date.now()
      const result = await paraphraseText(testCase.text)
      const duration = Date.now() - startTime
      
      console.log(`⏱️  Duration: ${duration}ms`)
      console.log(`📤 Output: ${result.substring(0, 100)}...`)
      console.log(`✅ Status: SUCCESS`)
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`)
    }
  }
  
  console.log('\n🎉 API Tests Complete!')
}

// Re-export functions from api.js for convenience
export { testAPIConnection, validateText, cleanInputText } from './services/api.js'

// Make test function available globally
if (typeof window !== 'undefined') {
  window.runAPITests = runAPITests
  window.testAPIConnection = testAPIConnection
  console.log('🔧 Test functions available: window.runAPITests(), window.testAPIConnection()')
}