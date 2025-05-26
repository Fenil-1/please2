// Test script for sheet creation API
import { DEFAULT_TEMPLATE_SHEET_ID } from './lib/sheets';

async function testSheetCreation() {
  try {
    console.log('Testing sheet creation API...');
    console.log(`Using template sheet ID: ${DEFAULT_TEMPLATE_SHEET_ID}`);
    
    const response = await fetch('http://localhost:3000/api/sheets/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        templateId: DEFAULT_TEMPLATE_SHEET_ID
      }),
      credentials: 'include' // Include cookies for authentication
    });
    
    // Get the response as text first
    const responseText = await response.text();
    console.log('API Response text:', responseText);
    
    // Try to parse the response as JSON
    try {
      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);
      
      if (data.sheetId) {
        console.log('✅ Sheet created with ID:', data.sheetId);
        console.log('Sheet URL:', `https://docs.google.com/spreadsheets/d/${data.sheetId}`);
      } else {
        console.error('❌ No sheet ID returned from API');
      }
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
    }
  } catch (err) {
    console.error('Error during test:', err);
  }
}

// Run the test
testSheetCreation(); 