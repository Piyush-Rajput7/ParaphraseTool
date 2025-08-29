// Quick test for mock API functionality
export const testMockAPI = async () => {
  console.log('🧪 Testing Mock API functionality...')
  
  const testText = "This is a simple test to verify that our paraphrasing tool works correctly with mock responses."
  
  try {
    // Import the paraphrasing function
    const { paraphraseText } = await import('./services/api.js')
    
    console.log('📝 Input:', testText)
    console.log('⏳ Processing...')
    
    const result = await paraphraseText(testText)
    
    console.log('✅ Success!')
    console.log('📤 Output:', result)
    
    return result
  } catch (error) {
    console.error('❌ Test failed:', error)
    throw error
  }
}

// Make it available globally for browser testing
if (typeof window !== 'undefined') {
  window.testMockAPI = testMockAPI
}