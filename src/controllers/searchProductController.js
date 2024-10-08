const MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri);

async function searchProduct() {
  try {
    await client.connect();

    const database = client.db("damn_vulnerable_ecommerce");
    const products = database.collection("products");

    // Query for a movie that has the title 'The Room'
    const query = { "productName": "Mr Robot Hoodie" };

    const options = {
      // sort matched documents in descending order by rating
      sort: { "imdb.rating": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };

    // const movie = await movies.findOne(query, options);
    const product = await products.findOne(query);

    // since this method returns the matched document, not a cursor, print it directly
    console.log(product);
  } finally {
    await client.close();
  }
}

module.exports = searchProduct;
