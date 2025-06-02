/*
https://stackoverflow.com/questions/41641138/algolia-generate-invalid-secured-api-keys
I misunderstood the generateSecuredApiKey first parameter that actually was the origin API Key.

So the right code will be

var from_admin_api_key = admin_client.generateSecuredApiKey('ADMIN_KEY', {validUntil: valid_until});
var from_search_api_key = search_client.generateSecuredApiKey('ONLY_SEARCH_KEY', {validUntil: valid_until});
*/

// Melisearch would be a great alternative to Algolia, uses ES6 modiules and plays well with React

// hit this endpoint to test search key:  http://localhost:8000/api/algolia-key
import { algoliasearch } from 'algoliasearch'
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const ALGOLIA_APP_ID = process.env.Application_ID
const ALGOLIA_ADMIN_KEY = process.env.Admin_Key  
const SEARCH_API_KEY = process.env.Search_API_Key

if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY) {
  throw new Error('Missing Algolia credentials in .env')
}

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

router.get('/algolia-key', (req, res) => {
  try {
    console.log('Search API Key from env:', process.env.Search_API_Key)

    const securedApiKey = client.generateSecuredApiKey(SEARCH_API_KEY, {
      filters: '',
      validUntil: Math.floor(Date.now() / 1000) + 3600
    })

    res.json({ key: securedApiKey })
  } catch (error) {
    console.error('Error generating Algolia search key:', error.message)
    res.status(500).json({ error: 'Failed to generate Algolia search key' })
  }
})

export default router