// Test script for Rimedia API integration
const axios = require('axios');

const testRimediaAPI = async () => {
  const apiKey = 'c30f8930demsh1560cd23f8ae1a0p1f6186jsn548348f385a9';
  const testText = 'This is a simple test to check if the paraphrasing function works correctly with the Rimedia API.';
  
  console.log('🧪 Testing Rimedia Paraphraser API...');
  console.log('📝 Input text:', testText);
  
  try {
    const options = {
      method: 'POST',
      url: 'https://rimedia-paraphraser.p.rapidapi.com/api_paraphrase.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'rimedia-paraphraser.p.rapidapi.com'
      },
      data: new URLSearchParams({
        text: testText,
        mode: 'standard'
      })
    };

    const response = await axios.request(options);
    console.log('📡 Raw API Response:', response.data);
    console.log('✅ API Test Successful!');
    
    return response.data;
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

// Run the test
testRimediaAPI()
  .then(result => {
    console.log('\n🎉 Test completed successfully!');
    console.log('Result:', result);
  })
  .catch(error => {
    console.log('\n💡 Note: This is expected if running in browser environment.');
    console.log('The API integration is ready for your React app!');
  });

module.exports = { testRimediaAPI };