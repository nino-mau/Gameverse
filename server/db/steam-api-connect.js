import axios from 'axios';

import fs from 'fs';

import { load } from 'cheerio';

async function getDetailedTopGames() {
   try {
      // Scrape top 50 app IDs from Steam store
      const { data } = await axios.get('https://store.steampowered.com/search/?filter=topsellers', {
         headers: { Cookie: 'birthtime=0; maturity_age=18' },
      });

      const $ = load(data);
      const appIds = [];

      $('#search_resultsRows > a')
         .slice(0, 50)
         .each((index, element) => {
            const appId = $(element).attr('data-ds-appid')?.split(',')[0];
            if (appId) appIds.push(appId);
         });

      console.log(`Found ${appIds.length} games, fetching details...`);

      const games = [];
      for (const appId of appIds) {
         try {
            // Fetch both game details and reviews in parallel
            const [detailsResponse, reviewsResponse] = await Promise.all([
               axios.get('https://store.steampowered.com/api/appdetails', {
                  params: { appids: appId, l: 'english' },
                  headers: { Cookie: 'birthtime=0' },
               }),
               axios.get(`https://store.steampowered.com/appreviews/${appId}`, {
                  params: {
                     json: 1,
                     language: 'english',
                     num_per_page: 0, // Just get summary
                     filter: 'all',
                     purchase_type: 'all',
                  },
               }),
            ]);

            // Process game details
            const detailsData = detailsResponse.data[appId];
            if (!detailsData?.success) continue;
            const details = detailsData.data;

            // Process reviews
            const reviewsData = reviewsResponse.data;
            const reviewSummary = reviewsData.query_summary || {};

            const gameInfo = {
               appId: appId,
               name: details.name,
               price: details.price_overview?.final_formatted || 'Free',
               description: details.short_description,
               developers: details.developers || [],
               publishers: details.publishers || [],
               genres: details.genres?.map((g) => g.description) || [],
               release_date: details.release_date?.date || 'Coming Soon',
               metacritic_score: details.metacritic?.score || 'N/A',
               headerImg: details.header_image,
               store_url: `https://store.steampowered.com/app/${appId}`,
               steam_review: {
                  score: reviewSummary.review_score || 'N/A', // Percentage positive
                  total: reviewSummary.total_reviews || 'N/A', // Total reviews
                  summary: reviewSummary.review_score_desc || 'No ratings', // "Very Positive"
               },
            };

            games.push(gameInfo);
            console.log(`✅ ${details.name} - ${gameInfo.steam_review.summary}`);

            await new Promise((resolve) => setTimeout(resolve, 1500));
         } catch (error) {
            console.error(`❌ Failed to fetch ${appId}:`, error.message);
         }
      }

      fs.writeFileSync('steam_top_detailed.json', JSON.stringify(games, null, 2));
      console.log(`\n🎉 Saved ${games.length} games with reviews`);
      return games;
   } catch (error) {
      console.error('Main error:', error.message);
   }
}

getDetailedTopGames();
